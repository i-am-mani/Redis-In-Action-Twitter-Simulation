## Redis In Action: Twitter Dashboard Simulation

![homepage](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/home.png)

#### Table Of Content
- [Redis In Action: Twitter Dashboard Simulation](#redis-in-action-twitter-dashboard-simulation)
    - [Table Of Content](#table-of-content)
  - [Introduction:](#introduction)
  - [Features:](#features)
    - [Creation:](#creation)
    - [Read:](#read)
    - [Update:](#update)
    - [Delete:](#delete)
    - [Console:](#console)
    - [References](#references)


### Introduction:
The Project consists of a Tweeter Dashboard Simulation, that is responsible for simulating real world operation. Redis is used as the In-Memory Database, alongside an RDBMS, Postgres. Postgres acts like a primary central database, assuring ACID properties, while REDIS plays the role of storing output of queries. In this way, Redis DB acts like a cache system. 

The project also uses a real world Tweets dataset, having 100,000 tweets, this dataset is used to simulate High Read/Write operations.

The Frontend is built using React with Typescript, while Flask (Python) is used in the backend, using official databases supported libraries.

### Features:
All the database operations for Redis/Postgres are tracked in milliseconds and displayed on the console visible on the front-end.

#### Creation:
+ A Largedataset consisting of 100K Tweets is used as the primary source for adding tweets to the database. This dataset is available in CSV file. 

+ Frontend provides both the options to insert CSV tweets by accepting a range of ROWS and an individual tweets with all required parameters.

+ In one batch all 100k tweets can be inserted, however this operation is time consuming, consuming about 10-15 mins. This is not due to the database but IO overhead caused by reading from CSV, converting to Python Object then inserting to DB/Cache.

![](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/insert-range.jpeg)
  
+ (Response)
<img src="https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/insert-range-response.jpeg" alt="Insertion Response" height="400">

+ Inserting a single tweet is trivially fast
![single tweet insertion](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/insert-single-tweet.jpeg)

+ (Response)
<img src="https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/single-tweet-response.jpeg" alt="Insertion Response" height="400">

#### Read:
+ User is provided the option to fetch All Tweets or Specific User’s Tweets (By User-Id).
+ A Choice for source is provided to the user. Either Postgres or Redis. Selecting Postgres would invoke Postgres to retrieve tweets from its db. While, selecting Redis would return from cache, which is always faster than fetching from DB, by almost 80% is some cases.
+ Along with tweets, it is possible to compute statistics about the data present on the RDBMS, which is an expensive operation, the result is stored in Redis.
+ Statistics shows are: Retweet Count, Most Retweets, Total Reach, Total Number of Likes.
![Fetcha All Tweets](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/fetch_all.jpeg)

+ (Statistics)
![View Statistics](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/statistics.jpeg)

#### Update:
+ All Tweets are editable. Only the Tweet content can be updated.
+ The update is triggered over the Postgres DB and does not affect the cache.
![Update Tweet](https://github.com/llGOKUll/Redis-In-Action-Twitter-Simulation/blob/master/static/update-tweet.jpeg)

#### Delete:
+ Tweets can be deleted, individually.
+ Deleted Tweets are reflected on the Primary database, Postgres. However they’re still present in the cache
+ Database drop is also supported, in this all the tweets are deleted from both, Postgres and Redis. Along with all the additional keys in redis.
+ This would reset the state of the application

#### Console:
+ Displays the Logs of the operations.
+ It includes time consumed for database read/write operations. 
+ It is available for both the redis and postgres.
+ This provides a neat measure to benchmark the Databases by performance and speed

---

#### References

[Redis Documentation]((https://redis.io/documentation))
[Redis-Py - Python Redis Client](https://github.com/andymccurdy/redis-py)
[Postgres Documentation](https://www.postgresql.org/docs/)
[SQL Alchemy Tutorial - Python Central](https://www.pythoncentral.io/sqlalchemy-orm-examples/)
[SQL Alchemy](https://docs.sqlalchemy.org/en/13/)
[Flask](https://flask.palletsprojects.com/en/1.1.x/)
[Flask - SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
