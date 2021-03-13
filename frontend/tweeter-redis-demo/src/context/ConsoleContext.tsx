import * as React from "react";
import { ConsoleContextType } from "../models/GlobalTypes";

export const ConsoleContext = React.createContext({} as ConsoleContextType);

export const ConsoleContextProvider: React.FC = ({ children }) => {
  const [logs, setLogs] = React.useState<string[]>(["Web App Initialised"]);

  const addNewLog = (message: string) => {
    setLogs([message, ...logs]);
  };

  const addNewLogs = (messages: string[]) => {
    setLogs(["----------------------",...messages, ...logs]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <ConsoleContext.Provider
      value={{
        logs: logs,
        addLog: addNewLog,
        addLogs: addNewLogs,
        clearLogs: clearLogs,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};
