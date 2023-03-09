import React, { useState, useCallback } from "react";
import { Config } from "./Config";

export const App = () => {
  const [apiKey, setApiKey] = useState("");

  const onApiKeyChange = useCallback(nextApiKey => {
    setApiKey(nextApiKey);
  }, []);

  return (
    <div className="container">
      <br />
      <Config onApiKeyChange={onApiKeyChange} />
      <hr />
    </div>
  );
};
