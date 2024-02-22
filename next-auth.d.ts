import { HexString, MaybeHexString } from "aptos";
import { DefaultUser } from "next-auth";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  type Address = {
    hexString: HexString;
  };

  interface User extends Omit<DefaultUser, "id"> {
    email: string;
    country: string;
    gender: string;
    surname?: string;
    address: string;
    picture?: string;
    number: string;
    city: string;
    name:string;
    bio?:string;
    age?:string;
  }
}
