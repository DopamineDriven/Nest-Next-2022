import {
  useViewerQuery,
  Viewer,
  ViewerQuery
} from "@/graphql/generated/graphql";
import { ApolloError } from "@apollo/client";
import { Context, createContext, ReactNode, useContext } from "react";

export interface ViewerState {
  authDetailed: ViewerQuery;
}

export interface AuthData {
  loggedIn: boolean;
  loading: boolean;
  error?: ApolloError;
  viewer?: ViewerState;
}

export const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  error: undefined,
  loading: false,
  viewer: undefined
};

const AuthContext = createContext<AuthData>(
  DEFAULT_STATE
) as Context<AuthData>;

export interface AuthProviderProps {
  children: ReactNode;
  authData?: AuthData | null;
}

export function AuthProvider({ children, authData }: AuthProviderProps) {
  const { data, loading, error } = useViewerQuery({ query: Viewer });
  const viewerDetailed = data?.me;
  const loggedIn = Boolean(viewerDetailed);
  const value = {
    loggedIn,
    viewerDetailed,
    loading,
    error
  } as AuthData;

  const valueEqualsData = value === authData ? authData : value;
  return (
    <AuthContext.Provider value={valueEqualsData}>
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () =>
  useContext<AuthData>(AuthContext as Context<AuthData>);

export default useAuth;
