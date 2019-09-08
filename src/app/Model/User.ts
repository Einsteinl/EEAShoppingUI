import { Role } from "./Role";

export interface User {
    id: string;
    username:string;
    password:string;
    email:string;
    phone:string;
    question: string;
    answer: string;
    role : string;
}
