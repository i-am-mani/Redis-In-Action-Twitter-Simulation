import React from "react";
import "./App.css";
import { AddTweetSection } from "./components/AddTweetSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConsoleContextProvider } from "./context/ConsoleContext";
import { Console } from "./components/Console";
import { TweetContextProvider } from "./context/TweetsContext";

export const REMOTE_HOST = "http://127.0.0.1:5000";

function App() {
  return (
    <TweetContextProvider>
      <ConsoleContextProvider>
        <div>
          <ToastContainer />
          <div className="fixed h-full w-3/12 shadow-xl p-6 z-20 overflow-auto">
            <Console />
          </div>

          <main className="ml-7/12 p-6">
            <header>
              <AddTweetSection />

              <div className="my-4 grid grid-cols-12 gap-2 text-dark">
                <div className="col-span-3 p-3 shadow-lg space-y-3">
                  <p className="font-bold font-lora tracking-wide text-center">
                    User Tweets
                  </p>

                  <input
                    placeholder="Enter UserId"
                    className="standard-input"
                  />

                  <button className="primary-btn">Search</button>
                </div>

                <div className="col-span-3 p-3 shadow-lg space-y-3">
                  <p className="font-bold font-lora tracking-wide text-center">
                    Delete
                  </p>

                  <div className="h-3/5 grid grid-cols-2 gap-3">
                    <div className="shadow-md rounded-md text-center p-2 cursor-pointer">
                      Database
                    </div>
                    <div className="shadow-md rounded-md text-center p-2 cursor-pointer">
                      Cache
                    </div>
                  </div>
                </div>

                <div className="col-span-3 p-3 shadow-lg space-y-3">
                  <p className="font-bold font-lora tracking-wide text-center">
                    Fetch All Tweets
                  </p>

                  <div className="h-3/5 grid grid-cols-2 gap-3">
                    <div className="shadow-md rounded-md text-center p-2 cursor-pointer">
                      Database
                    </div>
                    <div className="shadow-md rounded-md text-center p-2 cursor-pointer">
                      Cache
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center col-span-3 p-3 shadow-lg space-y-3">
                  <p className="font-bold font-lora tracking-wide cursor-pointer">
                    Compute States
                  </p>
                </div>
              </div>
            </header>
          </main>
        </div>
      </ConsoleContextProvider>
    </TweetContextProvider>
  );
}

export default App;
