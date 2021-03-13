import * as React from "react";
import { Tweet } from "../models/GlobalTypes";

export type TweetContextType = {
  tweets: Tweet[];
  setTweets: (tweets: Tweet[]) => void;
};

export const TweetContext = React.createContext({} as TweetContextType);

export const TweetContextProvider: React.FC = ({ children }) => {
  const [tweets, setTweets] = React.useState<Tweet[]>([]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
};
