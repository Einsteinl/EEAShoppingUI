import { Role } from "./Role";

export interface getUser {
  id: string;
  username:string;
  password:string;
  email:string;
  phone:string;
  question: string;
  answer: string;
  role : string;
  address:string
}
