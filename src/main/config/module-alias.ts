import { addAlias } from "module-alias";
import path from "path";

addAlias("@", path.resolve(process.env.TS_NODE_ENV === undefined ? "dist": "src"));