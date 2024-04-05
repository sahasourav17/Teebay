import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { createLogger } from "redux-logger";
import { appEnv } from "../config/variables";

const middlewares = [];
const loggerEnvs = ["dev", "stg"];
if (loggerEnvs.includes(appEnv)) {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });

  middlewares.push(logger);
}
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: appEnv === "dev",
});
