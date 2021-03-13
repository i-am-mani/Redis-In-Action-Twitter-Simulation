import * as React from "react";
import { Tweet } from "../models/GlobalTypes";
import axios from "axios";
import { REMOTE_HOST } from "../App";
import { toast } from "react-toastify";

export type TweetContextType = {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
  updateTweet: (tweet: Tweet) => void;
  deleteTweet: (tweet: Tweet) => void;
};

export const TweetContext = React.createContext({} as TweetContextType);

export const TweetContextProvider: React.FC = ({ children }) => {
  const [tweets, setTweets] = React.useState<Tweet[]>([]);

  const updateTweet = (tweet: Tweet) => {
    try {
      axios.post(`${REMOTE_HOST}/update_tweet`, tweet);
      toast.success("Tweet Updated");
    } catch {
      toast.error("Failed To Update Tweet");
    }
  };

  const deleteTweet = (tweet: Tweet) => {
    try {
      axios.post(`${REMOTE_HOST}/delete_tweet`, tweet);
      toast.success("Tweet Updated");
    } catch {
      toast.error("Failed To Update Tweet");
    }
  };

  return (
    <TweetContext.Provider
      value={{ tweets, setTweets, updateTweet, deleteTweet }}
    >
      {children}
    </TweetContext.Provider>
  );
};
