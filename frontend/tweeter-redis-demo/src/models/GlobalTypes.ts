export type Tweet = {
  tweetid: string;
  text: string;
  weekday: string;
  isreshare: string;
  lang: string;
  reach: string;
  retweetcount: string;
  likes: string;
  locationid: string;
  userid: string;
};

export type RedisInsertionTime = {
  all_tweets_time: number;
  users_time: number;
  user_tweets: number;
  total_time_taken: number;
};

export type PostgresTime = {
  total_time_taken: number;
};

export type ConsoleContextType = {
  logs: string[];
  addLog: (msg: string) => void;
  addLogs: (msg: string[]) => void;
  clearLogs: () => void;
};

export type Statistics = {
  highest_retweet: number;
  total_retweets: number;
  total_likes: number;
  total_reach: number;  
}