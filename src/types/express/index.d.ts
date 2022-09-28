import { UserInfo } from "../custom";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: UserInfo;
    }
  }
}