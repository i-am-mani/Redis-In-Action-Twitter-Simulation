import React from "react";
import "./App.css";
import { AddTweetSection } from "./components/AddTweetSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConsoleContextProvider } from "./context/ConsoleContext";
import { Console } from "./components/Console";
import { TweetContextProvider } from "./context/TweetsContext";
import { Actions } from "./components/Actions";
import { DisplayTweets } from "./components/DisplayTweets";

export const REMOTE_HOST = "http://127.0.0.1:5000";

function App() {
  return (
    <TweetContextProvider>
      <ConsoleContextProvider>
        <div className="h-full">
          <ToastContainer />
          <div className="fixed h-full w-3/12 shadow-3xl p-6 z-20 overflow-auto bg-dark ">
            <Console />
          </div>

          <main className="ml-7/12 p-6">
            <header>
              <AddTweetSection />
              <Actions />
            </header>
            <DisplayTweets />
          </main>
        </div>
      </ConsoleContextProvider>
    </TweetContextProvider>
  );
}

export default App;
