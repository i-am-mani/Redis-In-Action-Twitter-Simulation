from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import redis
import json
import csv
from collections import Counter
from utils import *

app = Flask(__name__)
cors = CORS(app)
app.config.from_pyfile('config.py')
app.config['CORS_HEADERS'] = 'Content-Type'
redis_instance = redis.Redis(host='localhost', port=6379)
db = SQLAlchemy(app)

# to prevent circular import
from models import *

def add_row_to_database(row, enableRedisCache):
    postgres_insertion_time = {"total_time_taken": 0}
    redis_insertion_time = {"total_time_taken": 0, "all_tweets_time": 0, "users_time": 0, "user_tweets":0}
    userid = row['userid']
    tweet_object = Tweet(row["tweetid"], row["weekday"], row["isreshare"], row['lang'], 
                    row['text'], row['reach'], row['retweetcount'], row['likes'],row['locationid'], userid)

    (output, time) = elapsed_time(lambda :db.session.add(tweet_object))
    postgres_insertion_time["total_time_taken"] += time

    if(enableRedisCache):
        tweetJsonString = json.dumps(row)
        (output2, time2) = elapsed_time(lambda :redis_instance.lpush('all_tweets', tweetJsonString))
        redis_insertion_time["all_tweets_time"] += time2

        (output3, time3) = elapsed_time(lambda :redis_instance.lpush(f'user:{userid}:tweets', tweetJsonString))
        redis_insertion_time["user_tweets"] += time3

        (output4, time4) = elapsed_time(lambda :redis_instance.sadd('users', userid))
        redis_insertion_time["users_time"] += time4

        redis_insertion_time["total_time_taken"] = round(time2 + time3 + time4, 6)

    db.session.commit()
    return (postgres_insertion_time, redis_insertion_time)



@app.route('/insert_tweet', methods=['POST'])
def insert_tweet():
    """ 
        Inserts Raw Tweet.

        Note: does not validate tweet content. Validation must be done at client end.
    """
    row = request.get_json()    
    tweet_object = get_tweet_object_from_dict(row)
    (postgres_time, redis_time) = add_row_to_database(row, True)
    return jsonify({"status": "success", "postgres_time": postgres_time, "redis_time": redis_time})

@app.route('/insert_range', methods=['POST'])
def insertRowsOfRange():
    """
        Inserts tweets of given range. With optional storage to redis cache after insertion to postgres database
        
        If end range is greater then existing rows, then it inserts all of the rows.
    """
    range_request = request.get_json()
    start = range_request['range_start']
    end = range_request['range_end']
    enableRedisCache = range_request['cache']
    input_file = open('./datasource/tweet.csv')
    all_rows = csv.DictReader(input_file, delimiter=',')    
    idx = 0
    postgres_insertion_time = {"total_time_taken": 0}
    redis_insertion_time = {"total_time_taken": 0, "all_tweets_time": 0, "users_time": 0, "user_tweets":0}
    rows = []
    for row in all_rows:
        if(idx > end):
            break
        elif(idx >= start and idx <= end): 
            (postgres_time, redis_time) = add_row_to_database(row, enableRedisCache)
            postgres_insertion_time["total_time_taken"] += postgres_time["total_time_taken"]
            redis_insertion_time["total_time_taken"] += redis_time["total_time_taken"]
            redis_insertion_time["all_tweets_time"] += redis_time["all_tweets_time"]
            redis_insertion_time["users_time"] += redis_time["users_time"]
            redis_insertion_time["user_tweets"] += redis_time["user_tweets"]
        idx += 1
    input_file.close()
    postgres_insertion_time["total_time_taken"] += round(postgres_time["total_time_taken"], 6)
    return jsonify({'status': 'success', 'message': f"Number of rows Inserted = {idx}", 
    "postgres_time": postgres_insertion_time, "redis_time": redis_time})

# ------------------- Read Queries ---------------------

@app.route('/fetch_all_tweets', methods=["POST"])
def fetch_all_tweets():       
    """ 
        Fetch all Tweets, return only first 100 tweets.

        The data source is determined by presence of 'cacheEnabled' property in POST Request.
    """ 
    is_cache_first = request.get_json()['cacheEnabled']
    tweets = []    
    log = []
    all_tweets = []    
    execution_time = 0
    if(is_cache_first):
        all_tweets = []
        (result, execution_time) = elapsed_time(lambda :redis_instance.lrange('all_tweets', 0, -1))
        print('from cache')
        counter = 0
        for r in result:
            dictionary_result = json.loads(r)
            all_tweets.append(get_tweet_object_from_dict(dictionary_result))
            counter += 1
            if(counter > 10):
                break
    else: 
        (all_tweets, execution_time) = elapsed_time(lambda :Tweet.query.all())
        print('from postgres')
    idx = 0
    for tweet in all_tweets:        
        tweets.append(tweet.to_dict())
        if(idx > 10):
            break
        idx += 1
    log.append(f"Operation Completed in {execution_time} ms")
    return {"status": 'success', "tweets": tweets, "logs": log}


@app.route('/fetch_all_uids', methods=["POST"])
def fetch_all_uids():
    """ 
        Fetch and return all 'userid's
        
        The data source is determined by presence of 'cacheEnabled' property in POST Request.
    """ 
    is_cache_first = request.get_json()['cacheEnabled']
    userIds = []    
    log = []
    all_userIds = []    
    execution_time = 0
    if(is_cache_first):
        all_userIds = []
        (result, execution_time) = elapsed_time(lambda :redis_instance.smembers('users'))
        all_userids = [str(r, 'utf-8') for r in result]
    else: 
        (result, execution_time) = elapsed_time(lambda :Tweet.query.with_entities(Tweet.userid).all())
        all_userids = [r[0] for r in result]
    db = "Postgres" if not is_cache_first else "Redis"
    log.append(f"Succesfully Fetched All Users From {db} {execution_time}")
    return {"status": 'success', "tweets": userIds, "log": log}


@app.route('/delete_cache', methods=['POST'])
def clear_cache():
    try:
        redis_instance.delete('all_tweets')
        return jsonify({"status": 'success'})
    except Exception:
        return jsonify({"status": 'Failed', "reason": Exception})

@app.route('/delete_database', methods=['POST'])
def clear_database():
    try:
        Tweet.query.delete()
        redis_instance.delete('all_tweets')
        db.session.commit()
        return jsonify({"status": 'success'})
    except Exception:
        return jsonify({"status": 'Failed', "reason": Exception})



if __name__ == '__main__':
    app.run(debug=True)