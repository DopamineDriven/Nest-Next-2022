import { useContext, createContext, FC } from "react";
import { ApolloError } from "@apollo/client";
import { AuthPartialFragment } from "@/graphql/fragments/auth-partial.graphql";
import { UserPartialFragment } from "@/graphql/fragments/user-partial.graphql";
import {} from "@/graphql/mutations/login-user.graphql";

export interface AuthData {
  loggedIn: boolean;
  user?: NonNullable<UserPartialFragment> | null;
  loading: boolean;
  error?: ApolloError;
  accessToken?: AuthPartialFragment["accessToken"];
  refreshToken?: AuthPartialFragment["refreshToken"];
}

const DEFAULT_STATE: AuthData = {
  loading: false,
  accessToken: undefined,
  refreshToken: undefined,
  loggedIn: false,
  error: undefined,
  user: undefined
};

const AuthContext = createContext(DEFAULT_STATE);

// export const AuthProvider: FC<AuthData> = ({ children, ...props }) => {

// }
