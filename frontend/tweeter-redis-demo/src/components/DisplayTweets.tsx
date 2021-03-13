import * as React from "react";
import { TweetContext } from "../context/TweetsContext";
import { TweetView } from "./Tweet";

export const DisplayTweets: React.FC = () => {
  const { tweets } = React.useContext(TweetContext);
  console.log(tweets);
  return (
    <div className="grid grid-cols-1 gap-4">
      {tweets.map((tweet) => (
        <TweetView tweet={tweet} onDelete={() => {}} onUpdate={() => {}} />
      ))}
    </div>
  );
};
