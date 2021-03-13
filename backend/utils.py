import time
from models import Tweet


def elapsed_time(func):
    """
        Return the output of the function and execution time in milliseconds
    """
    start = time.perf_counter()
    output = func()
    end = time.perf_counter()
    return (output, round((end-start) * 1000, 6))


def get_tweet_object_from_dict(row):
    return Tweet(row["tweetid"], row["weekday"], row["isreshare"],
                 row['lang'], row['text'], row['reach'], row['retweetcount'], row['likes'], row['locationid'], row['userid'])
