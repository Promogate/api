import axios from "axios";
import { TS_NODE_ENV } from "./variables";

export const pgateClient = axios.create({
  baseURL: TS_NODE_ENV === "development" ? "http://localhost:3001" : "https://pgate.app/"
});
