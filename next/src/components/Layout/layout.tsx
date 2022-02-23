import { AuthData } from "@/hooks/use-auth";
import { ReactNode, FC } from "react";
import GlobalNav from "./Nav/nav";

export interface Props extends AuthData {
  children: ReactNode;
}

const Layout: FC<Props> = ({
  children,
  loading,
  loggedIn,
  error,
  viewer
}) => {
  return (
    <div>
      <GlobalNav
        viewer={viewer}
        loading={loading}
        loggedIn={loggedIn}
        error={error}
      />
      <div className=''>{children}</div>
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
          background: rgba(0, 0, 0, 0.05);
        }
        input,
        textarea {
          font-size: 16px;
        }
        button {
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .layout {
          padding: 0 2rem;
        }
      `}</style>
    </div>
  );
};

export default Layout;
