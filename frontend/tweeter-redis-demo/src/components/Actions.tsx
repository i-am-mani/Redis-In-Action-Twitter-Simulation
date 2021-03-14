import * as React from "react";
import axios from "axios";
import { REMOTE_HOST } from "../App";
import { toast } from "react-toastify";
import { ConsoleContext } from "../context/ConsoleContext";
import { TweetContext } from "../context/TweetsContext";
import { Statistics } from "../models/GlobalTypes";

export const Actions: React.FC = () => {
  const [userid, setUserid] = React.useState("");
  const { addLogs } = React.useContext(ConsoleContext);
  const { setTweets } = React.useContext(TweetContext);
  const [isLoading, setLoading] = React.useState(false);
  const [statistics, setStatistics] = React.useState<Statistics>();

  const fetchAll = async (fromCache: boolean = false) => {
    try {
      addLogs([
        `Fetch Request Initiated - ${fromCache ? "Redis" : "Postgres"}`,
      ]);
      setLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/fetch_all_tweets`, {
        cacheEnabled: fromCache,
      });
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const tweets = response.data["tweets"];
        const log = response.data["logs"];
        addLogs(log);
        setTweets(tweets);
      }
      toast(
        `Retreived all the tweets from ${fromCache ? "Redis" : "Postgres"}`
      );
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch tweets");
    }
  };

  const deleteDatabase = async () => {
    try {
      setLoading(true);
      addLogs([`Postgres | Delete Request Initiated}`]);
      const response = await axios.post(`${REMOTE_HOST}/delete_database`);
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const logs = response.data["logs"];
        addLogs(logs);
        toast("Successfully Deleted Database");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete Database");
    }
  };

  const deleteCache = async () => {
    try {
      addLogs([`Redis | Delete Request Initiated}`]);
      setLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/delete_cache`);
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const logs = response.data["logs"];
        addLogs(logs);
        toast("Successfully Deleted Cache");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete Database");
    }
  };

  const queryUserTweets = async (fromCache: boolean = false) => {
    try {
      addLogs([
        `Fetch Request Initiated - ${fromCache ? "Redis" : "Postgres"}`,
      ]);
      setLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/fetch_userid_tweets`, {
        cacheEnabled: fromCache,
        userid,
      });
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const tweets = response.data["tweets"];
        const log = response.data["logs"];
        addLogs(log);
        setTweets(tweets);
      }
      toast(
        `Retreived all the user tweets from ${fromCache ? "Redis" : "Postgres"}`
      );
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch tweets");
    }
  };

  const computeStatistics = async (fromCache: boolean = false) => {
    try {
      addLogs([
        `Statistics Request Initiated - ${fromCache ? "Redis" : "Postgres"}`,
      ]);
      setLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/compute_statistics`, {
        cacheEnabled: fromCache,
      });
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        const log = response.data["logs"];
        const data = response.data["statistics"];
        setStatistics(data);
        addLogs(log);
      }
      console.log(response);
      toast(`Retreived statistics from ${fromCache ? "Redis" : "Postgres"}`);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch tweets");
    }
  };

  return (
    <div className="my-4 grid grid-cols-12 gap-3 text-dark">
      <div className="bg-blue-200 col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">
          User Tweets
        </p>

        <input
          placeholder="Enter UserId"
          className="standard-input"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />

        <div className="flex justify-between space-x-3">
          <button
            className="primary-btn"
            onClick={() => {
              queryUserTweets(false);
            }}
          >
            Database
          </button>

          <button
            className="primary-btn"
            onClick={() => {
              queryUserTweets(true);
            }}
          >
            Cache
          </button>
        </div>
      </div>

      <div className="bg-red-100 col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">Delete</p>

        <div className=" h-3/5 grid grid-cols-2 gap-3">
          <div
            className="bg-red-400 text-red-50 shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => deleteDatabase()}
          >
            Database
          </div>
          <div
            className="bg-red-400 text-red-50 shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => deleteCache()}
          >
            Cache
          </div>
        </div>
      </div>

      <div className="bg-green-100 col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">
          Fetch All Tweets
        </p>

        <div className="h-3/5 grid grid-cols-2 gap-3">
          <div
            className="bg-green-400 text-green-50 shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => {
              fetchAll();
            }}
          >
            Database
          </div>
          <div
            className="bg-green-400 text-green-50 shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => fetchAll(true)}
          >
            Cache
          </div>
        </div>
      </div>

      <div className="bg-indigo-100 col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">
          Compute Statistics
        </p>

        <div className="h-3/5 grid grid-cols-2 gap-3">
          <div
            className="bg-indigo-400 text-indigo-50 shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => {
              computeStatistics(false);
            }}
          >
            Database
          </div>
          <div
            className="bg-indigo-400 text-indigo-50  shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => computeStatistics(true)}
          >
            Cache
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="col-span-full place-self-center">
          <div className="animate-pulse p-3 font-dosis text-dark">
            Processing . . .
          </div>
        </div>
      ) : (
        ""
      )}

      {statistics ? (
        <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 rounded-lg col-span-full place-self-center shadow p-3">
          <p className="text-lora font-bold tracking-wider text-center">
            Statistics
          </p>
          <div className="flex space-x-4 justify-center">
            <div className="inline-flex flex-col shadow-2xl justify-center items-center p-3 rounded-lg">
              <span className="text-xs  tracking-wider text-gray-400 font-semibold">Highest Retweet</span>
              <span className="text-dark font-bold text-2xl">
                {statistics.highest_retweet}
              </span>
            </div>

            <div className="inline-flex flex-col shadow-2xl justify-center items-center p-3 rounded-lg">
              <span className="text-xs tracking-wider text-gray-400 font-semibold">Total Retweets</span>
              <span className="text-dark font-bold text-2xl">
                {statistics.total_retweets}
              </span>
            </div>

            <div className="inline-flex flex-col shadow-2xl justify-center items-center p-3 rounded-lg">
              <span className="text-xs tracking-wider text-gray-400 font-semibold">Total Likes</span>
              <span className="text-dark font-bold text-2xl">
                {statistics.total_likes}
              </span>
            </div>

            <div className="inline-flex flex-col shadow-2xl justify-center items-center p-3 rounded-lg">
              <span className="text-xs tracking-wider text-gray-400 font-semibold">Total Reach</span>
              <span className="text-dark font-bold text-2xl">
                {statistics.total_reach}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
