import * as React from "react";
import { TweetContext } from "../context/TweetsContext";
import { TweetView } from "./Tweet";

export const DisplayTweets: React.FC = () => {
  const { tweets, updateTweet, deleteTweet } = React.useContext(TweetContext);
  console.log(tweets);
  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      {tweets.map((tweet) => (
        <TweetView
          tweet={tweet}
          onDelete={() => {
            deleteTweet(tweet);
          }}
          onUpdate={() => {
            updateTweet(tweet);
          }}
          key={tweet.tweetid}
        />
      ))}
    </div>
  );
};
