from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import redis

app = Flask(__name__)
app.config.from_pyfile('config.py')
redis_instance = redis.Redis(host='localhost', port=6379)
db = SQLAlchemy(app)

# to prevent circular import
from models import *

@app.route('/test')
def test():
    new_tweet = Tweet(2323,"Sunday", 'yes', 'eng', 'hello world', 3434, 234,23,222)
    db.session.add(new_tweet)
    print(db.session.commit())
    print(Tweet.query.all())
    return "Added New Test Record"

@app.route('/redis_test')
def getAll():
    redis_instance.set("Ping", "Pong")
    print(redis_instance.get("Ping"))
    return "Added to redis"

if __name__ == '__main__':
    app.run(debug=True)