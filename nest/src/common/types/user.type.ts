import { Account } from "../../account/model/account.model";

export type Provider = "google" | "cognito" | "jwt" | "custom";

export class User extends Account {
  providerId: string;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
