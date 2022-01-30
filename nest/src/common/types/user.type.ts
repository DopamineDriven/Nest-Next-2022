import { Account } from "../../account/model/account.model";

export type Provider = "google" | "cognito" | "jwt" | "custom";

export class User extends Account {
  declare id: string;
  declare provider: Provider;
  providerId: string;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
