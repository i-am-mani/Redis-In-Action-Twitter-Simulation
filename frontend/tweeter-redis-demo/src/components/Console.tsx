import * as React from "react";
import { ConsoleLog } from "./ConsoleLog";
import { ConsoleContext } from "../context/ConsoleContext";

export const Console: React.FC = () => {
  const { logs, clearLogs } = React.useContext(ConsoleContext);
  console.log(logs);
  return (
    <div className="">
      <p className="inline-flex text-xl font-bold font-lora text-center text-white mb-6">
        <div className="w-4 h-4 rounded-full bg-success animate-ping capitalize" />
        Responses Console
        <span
          className="text-red-200 hover:text-red-500 cursor-pointer text-xs"
          onClick={() => clearLogs()}
        >
          [clear]
        </span>
      </p>
      <div className="h-1 bg-lightGold"></div>
      <div className=" overflow-auto">
        {logs.map((msg) => (
          <ConsoleLog message={msg} />
        ))}
      </div>
    </div>
  );
};
