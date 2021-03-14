import * as React from "react";
import { InputWithLabel } from "./Inputs";
import { OptionSelector } from "./OptionSelector";
import { Tweet, RedisInsertionTime, PostgresTime } from "../models/GlobalTypes";
import axios from "axios";
import { REMOTE_HOST } from "../App";
import { toast } from "react-toastify";
import { ConsoleContext } from "../context/ConsoleContext";

const getEmptyTweet = (): Tweet => ({
  isreshare: "false",
  lang: "eng",
  likes: "",
  locationid: "",
  reach: "",
  retweetcount: "",
  text: "",
  tweetid: "",
  userid: "",
  weekday: "",
});

const getRedisInsertionTimeLog = (timeConfig: RedisInsertionTime) => {
  const {
    all_tweets_time,
    total_time_taken,
    user_tweets,
    users_time,
  } = timeConfig;

  return [
    `redis | insert all tweets -> ${all_tweets_time}ms`,
    `redis | insert user -> ${users_time}ms`,
    `redis | insert user's tweets -> ${user_tweets}ms`,
    `redis | total time taken -> ${total_time_taken}ms`,
  ];
};

const getPostgresInsertionTimeLogs = (timeConfigs: PostgresTime) => {
  const { total_time_taken } = timeConfigs;
  return [`postgres | insert tweet - ${total_time_taken}ms`];
};

export const AddTweetSection: React.FC = () => {
  const [hide, updateHide] = React.useState(false);
  const [tweet, updateTweet] = React.useState<Tweet>(getEmptyTweet());
  const [startIdx, setStartIdx] = React.useState(0);
  const [endIdx, setEndIdx] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const { addLogs } = React.useContext(ConsoleContext);
  const insertTweet = () => {
    axios
      .post(`${REMOTE_HOST}/insert_tweet`, { ...tweet })
      .then((response: any) => {
        console.log(response);
        try {
          const status = response.data["status"];
          if (status === "success") {
            const pit = response.data["postgres_time"];
            const rit = response.data["redis_time"];
            const plogs = getPostgresInsertionTimeLogs(pit);
            const rlogs = getRedisInsertionTimeLog(rit);
            addLogs([...plogs, ...rlogs]);
            toast("Successfully Uploaded Tweet");
          }
          updateTweet(getEmptyTweet());
        } catch {
          toast.error("Failed to read response");
        }
      })
      .catch((e) => {
        toast.error("Failed to upload tweet");
      });
  };

  const insertTweetsOfRange = async () => {
    try {
      addLogs([`Inserting ${endIdx - startIdx} Tweets`]);
      setIsLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/insert_range`, {
        range_start: startIdx,
        range_end: endIdx,
        cache: true,
      });
      setIsLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const pit = response.data["postgres_time"];
        const rit = response.data["redis_time"];
        const plogs = getPostgresInsertionTimeLogs(pit);
        const rlogs = getRedisInsertionTimeLog(rit);
        addLogs([...plogs, ...rlogs]);
        toast("Successfully Uploaded All Tweets of Given Range");
      }
      updateTweet(getEmptyTweet());
    } catch (e) {
      console.log(e);
      toast.error("Failed To Upload Range");
    }
  };

  return (
    <div className="w-full shadow-lg p-6 rounded-xl text-dark">
      <div className="flex justify-center">
        {isLoading ? <div className="spinner" /> : ""}
        <div className="w-full felx-grow inline-flex">
          <p className="m-auto relative text-2xl text-center font-lora font-bold ">
            Add Tweet
          </p>
        </div>
        <span
          className="font-mono tracking-wide 
        text-blue-500 text-sm cursor-pointer"
          onClick={() => updateHide(!hide)}
        >
          [hide]
        </span>
      </div>
      {hide ? (
        <>
          <div className="grid grid-cols-12 p-4 gap-4">
            <div className="col-span-6">
              <InputWithLabel
                label={"User ID"}
                onChangeCallback={(t) => updateTweet({ ...tweet, userid: t })}
                placeholder="UD-234234"
                value={tweet.userid}
              />
            </div>

            <div className="col-span-6">
              <InputWithLabel
                label={"Weekday"}
                onChangeCallback={(t) => {
                  updateTweet({ ...tweet, weekday: t });
                }}
                placeholder="Monday, Thorsday etc"
                value={tweet.weekday}
              />
            </div>

            <div className="col-span-12">
              <InputWithLabel
                label={"Tweet Text"}
                onChangeCallback={(t) => {
                  updateTweet({ ...tweet, text: t });
                }}
                placeholder="Qui sint excepteur occaecat sunt. Adipisicing non do labore ea. Veniam eu ea veniam dolore magna culpa nulla in ex commodo et est cillum. Reprehenderit dolore qui enim non sit id aliqua duis laborum deserunt. Enim occaecat fugiat et in nisi eu duis adipisicing cupidatat dolor reprehenderit ut reprehenderit enim."
                value={tweet.text}
              />
            </div>

            <div className="col-span-3">
              <OptionSelector
                allOptions={["True", "False"]}
                label="Reshared tweet?"
                onSelected={(t) => {
                  updateTweet({ ...tweet, isreshare: t });
                }}
                value={tweet.isreshare}
              />
            </div>

            <div className="col-span-3">
              <InputWithLabel
                label="Reach"
                onChangeCallback={(t) => {
                  updateTweet({ ...tweet, reach: t });
                }}
                placeholder="Reach of the tweet"
                value={tweet.reach}
              />
            </div>

            <div className="col-span-3">
              <InputWithLabel
                label="Retweets"
                onChangeCallback={(t) => {
                  updateTweet({ ...tweet, retweetcount: t });
                }}
                placeholder="Number of RTs"
                value={tweet.retweetcount}
              />
            </div>

            <div className="col-span-3">
              <InputWithLabel
                label="Likes"
                onChangeCallback={(t) => {
                  updateTweet({ ...tweet, likes: t });
                }}
                placeholder="Number of Likes"
                value={tweet.likes}
              />
            </div>
          </div>

          <div className="flex justify-center buttons">
            <button className="primary-btn" onClick={() => insertTweet()}>
              Add
            </button>
          </div>

          <div className="h-px w-full bg-gray-300 my-6" />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-full">
              <p className="text-2xl text-center font-lora font-bold">
                Insert Range of Tweets
              </p>
            </div>
            <div className="col-span-5">
              <InputWithLabel
                label="Start Index"
                onChangeCallback={(t) => {
                  const tInt = parseInt(t);
                  if (tInt) {
                    setStartIdx(tInt);
                  }
                }}
                placeholder="Select Start Index of Range"
                value={startIdx.toString()}
              />
            </div>
            <div className="col-span-5">
              <InputWithLabel
                label="End Index"
                onChangeCallback={(t) => {
                  const tInt = parseInt(t);
                  if (tInt) {
                    setEndIdx(tInt);
                  }
                }}
                placeholder="Select End Index of Range"
                value={endIdx.toString()}
              />
            </div>
            <div className="place-self-center">
              <button
                type="button"
                className="py-2 px-4  bg-gradient-to-r from-green-400 to-blue-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                onClick={() => insertTweetsOfRange()}
              >
                Insert
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
