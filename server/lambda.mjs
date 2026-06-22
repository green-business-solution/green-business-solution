import serverless from "serverless-http";
import { app } from "./index.mjs";

export const handler = serverless(app);
