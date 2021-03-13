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
  const colors = ["red", "yellow", "green", "pink", "indigo"];
  let i = Math.floor(Math.random() * 1000) % 5;
  return (
    <div className="flex text-dark">
      <div className={`h-full w-2 bg-${colors[i]}-400`}></div>
      <div className="p-2 shadow-lg rounded-lg w-full space-y-4">
        <div className="header flex justify-between">
          <p className="font-lora font-bold text-wider">{userid}</p>
          <p className="font-lora font-bold text-wider">{tweetid}</p>
        </div>

        <div className="break-all">{text}</div>

        <div className="flex justify-between">
          <p className="font-bold">Reach: {reach}</p>
          <p className="font-bold">Likes: {likes}</p>
          <p className="font-bold">Retweets: {retweetcount}</p>
        </div>

        <div className="flex space-x-3">
          <button className="primary-btn">Update</button>
          <button className="danger-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};
