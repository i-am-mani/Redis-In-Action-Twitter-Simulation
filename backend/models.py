from sqlalchemy.dialects.postgresql import VARCHAR, INTEGER
from flask_sqlalchemy import SQLAlchemy
from app import db


class Tweet(db.Model):
    __tablename__ = 'Tweets'

    id = db.Column(INTEGER, primary_key=True, )
    tweetid = db.Column(VARCHAR)
    weekday = db.Column(VARCHAR)
    isreshare = db.Column(VARCHAR)
    lang = db.Column(VARCHAR)
    text = db.Column(VARCHAR)
    reach = db.Column(VARCHAR)
    retweetcount = db.Column(VARCHAR)
    likes = db.Column(VARCHAR)
    locationid = db.Column(VARCHAR)
    userid = db.Column(VARCHAR)

    def __init__(self, tweetid, weekday, isreshare, lang, text, reach, retweetcount, likes, locationid, userid):
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
        self.userid = userid

    def to_dict(self):
        return {
            "id": self.id,
            "tweetid": self.tweetid,
            "weekday": self.weekday,
            "isreshare": self.isreshare,
            "lang": self.lang,
            "text": self.text,
            "reach": self.reach,
            "retweetcount": self.retweetcount,
            "likes": self.likes,
            "locationid": self.locationid,
            "userid": self.userid
        }

    def __repr__(self):
        return f'id={self.id} self.text={self.text}'