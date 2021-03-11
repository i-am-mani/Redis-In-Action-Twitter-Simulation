from sqlalchemy.dialects.postgresql import VARCHAR, INTEGER
from flask_sqlalchemy import SQLAlchemy
from app import db


class Tweet(db.Model):
    __tablename__ = 'Tweets'

    id = db.Column(INTEGER, primary_key=True)
    tweetid = db.Column(INTEGER)
    weekday = db.Column(VARCHAR)
    isreshare = db.Column(VARCHAR)
    lang = db.Column(VARCHAR)
    text = db.Column(VARCHAR)
    reach = db.Column(INTEGER)
    retweetcount = db.Column(INTEGER)
    likes = db.Column(INTEGER)
    locationid = db.Column(INTEGER)

    def __init__(self, tweetid, weekday, isreshare, lang, text, reach, retweetcount, likes, locationid):
        # self.id = id
        self.tweetid = tweetid
        self.weekday = weekday
        self.isreshare = isreshare
        self.lang = lang
        self.text = text
        self.reach = reach
        self.retweetcount = retweetcount
        self.likes= likes
        self.locationid = locationid


    def __repr__(self):
        return f'id={self.id} self.text={self.text}'