import * as React from "react";
import axios from "axios";
import { REMOTE_HOST } from "../App";
import { toast } from "react-toastify";
import { ConsoleContext } from "../context/ConsoleContext";
import { TweetContext } from "../context/TweetsContext";

export const Actions: React.FC = () => {
  const [userid, setUserid] = React.useState("");
  const { addLogs } = React.useContext(ConsoleContext);
  const { setTweets } = React.useContext(TweetContext);
  const [isLoading, setLoading] = React.useState(false);

  const fetchUseridTweets = () => {};

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
      addLogs([`Postgres | Fetch Request Initiated}`]);
      const response = await axios.post(`${REMOTE_HOST}/delete_database`);
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        toast("Successfully Delete Database");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete Database");
    }
  };

  const deleteCache = async () => {
    try {
      addLogs([`Redis | Fetch Request Initiated}`]);
      setLoading(true);
      const response = await axios.post(`${REMOTE_HOST}/delete_cache`);
      setLoading(false);
      console.log(response);
      const status = response.data["status"];
      if (status === "success") {
        toast("Successfully Delete Database");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to delete Database");
    }
  };

  return (
    <div className="my-4 grid grid-cols-12 gap-3 text-dark">
      <div className="col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">
          User Tweets
        </p>

        <input
          placeholder="Enter UserId"
          className="standard-input"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />

        <button className="primary-btn" onClick={() => {}}>
          Search
        </button>
      </div>

      <div className="col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">Delete</p>

        <div className="h-3/5 grid grid-cols-2 gap-3">
          <div
            className="shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => deleteDatabase()}
          >
            Database
          </div>
          <div
            className="shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => deleteCache()}
          >
            Cache
          </div>
        </div>
      </div>

      <div className="col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide text-center">
          Fetch All Tweets
        </p>

        <div className="h-3/5 grid grid-cols-2 gap-3">
          <div
            className="shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => {
              fetchAll();
            }}
          >
            Database
          </div>
          <div
            className="shadow-md rounded-md flex justify-center items-center text-center p-2 cursor-pointer transform transition-all hover:scale-110"
            onClick={() => fetchAll(true)}
          >
            Cache
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center col-span-3 p-3 shadow-lg space-y-3 rounded-lg">
        <p className="font-bold font-lora tracking-wide cursor-pointer">
          Compute States
        </p>
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
    </div>
  );
};
