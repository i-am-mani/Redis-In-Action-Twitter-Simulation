import * as React from "react";
import { Tweet } from "../models/GlobalTypes";

export const TweetView: React.FC<{
  tweet: Tweet;
  onUpdate: (tweet: Tweet) => void;
  onDelete: () => void;
}> = ({ tweet, onUpdate, onDelete }) => {
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
  const [isUpdateMode, setUpdateMode] = React.useState(false);
  const [tweetContent, setTweetContent] = React.useState(text);

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

        {isUpdateMode ? (
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            className="standard-input"
            maxLength={255}
            rows={4}
          />
        ) : (
          <div className="break-all">{tweetContent}</div>
        )}

        <div className="flex justify-between">
          <p className="font-bold">Reach: {reach}</p>
          <p className="font-bold">Likes: {likes}</p>
          <p className="font-bold">Retweets: {retweetcount}</p>
        </div>

        <div className="flex space-x-3">
          <button
            className="primary-btn"
            onClick={() => {
              if (isUpdateMode) {
                onUpdate({ ...tweet, text: tweetContent });
                setUpdateMode(!isUpdateMode);
              } else {
                setUpdateMode(!isUpdateMode);
              }
            }}
          >
            {isUpdateMode ? "Confirm" : "Update"}
          </button>
          <button className="danger-btn" onClick={() => onDelete()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
