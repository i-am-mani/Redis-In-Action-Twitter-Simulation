import * as React from "react";

export const ConsoleLog: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className="text-light font-dosis text-white capitalize">
      <span className="text-2xl">{">"}</span> {message}
    </p>
  );
};
