import { useEffect, ReactNode, FC } from "react";
import { useRouter } from "next/router";

import useAuth from "../hooks/use-auth";

const UnAuthContext: FC = ({ children }) => {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  // Navigate authenticated users to the members page.
  useEffect(() => {
    if (!loading && loggedIn) {
      router.push('/profile');
    }
  }, [loggedIn, loading, router]);

  if (!loggedIn) {
    return <>{children}</>;
  }

  return <p>Loading...</p>;
}

export default UnAuthContext;
