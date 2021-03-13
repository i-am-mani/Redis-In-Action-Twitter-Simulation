import * as React from "react";
import { Tweet } from "../models/GlobalTypes";

export const TweetView: React.FC<{
  tweet: Tweet;
  onUpdate: (tweet: Tweet) => void;
  onDelete: () => void;
}> = ({ tweet }) => {
  const {
    isreshare,
    lang,
    likes,
    locationid,
    reach,
    retweetcount,
    text,
    tweetid,
    userid,
    weekday,
  } = tweet;
  return (
    <div className="p-2 shadow-lg rounded-lg">
      <div className="header flex">
        <p className="font-lora font-bold text-wider">{userid}</p>
        <p className="font-lora font-bold text-wider">{tweetid}</p>
      </div>

      <div>{text}</div>

      <div className="flex justify-between">
        <p>Reach: {reach}</p>
        <p>Likes: {likes}</p>
        <p>Retweets: {retweetcount}</p>
      </div>

      <div className="flex space-x-3">
        <button className="primary-btn">Update</button>
        <button className="danger-btn">Delete</button>
      </div>
    </div>
  );
};
