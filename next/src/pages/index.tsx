import { initializeApollo } from "@/apollo/apollo";
import {
  DeriveUserDetailsFromTokenDocument,
  useDeriveUserDetailsFromTokenMutation
} from "@/graphql/mutations/get-user-from-access-token.graphql";
import { useLoginUserMutation } from "@/graphql/mutations/login-user.graphql";
import { useViewerQuery } from "@/graphql/queries/viewer.graphql";
import { useApolloClient } from "@apollo/client";
import { graphQLResultHasError } from "@apollo/client/utilities";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
let err: string;

export default function SignIn() {
  const client = useApolloClient();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [signIn, { data: loginData }] = useLoginUserMutation({
    variables: { data: { email: email, password: password } }
  });
  const [userPayload, { data: dataDecoded, loading, error, called }] =
    useDeriveUserDetailsFromTokenMutation({
      mutation: DeriveUserDetailsFromTokenDocument
    });
  const [errorMsg, setErrorMsg] = useState<string>(
    new Error(`${err.toString()}`).message
  );
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailElement =
      event.currentTarget?.nodeValue === email
        ? setEmail(event.currentTarget.nodeValue)
        : email;
    const passwordElement =
      event.currentTarget?.nodeValue === password
        ? setPassword(event.currentTarget.nodeValue)
        : password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          data: {
            email: emailElement ? emailElement : email,
            password: passwordElement ? passwordElement : password
          }
        }
      });
      return (await data) != null
        ? userPayload({
            variables: {
              token: data?.login.accessToken ? data.login.accessToken : ""
            }
          }).then(
            userDecoded => userDecoded.data?.userFromAccessTokenDecoded
          )
        : null;
    } catch (error: any) {
      return new Error(`${error} - error in signin Index route`).message;
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p>{errorMsg}</p>}
        <fieldset>
          <input
            name='email'
            type='email'
            autoComplete='email'
            required
            onChange={(e) => e.currentTarget.nodeValue}
            inputMode="email"
            aria-label='Email'
          />
          <input
            name='password'
            type='password'
            autoComplete='password'
            required
            onChange={(e) => e.currentTarget.nodeValue}
            aria-label='Password'
          />
        </fieldset>
        <button type='submit' onLoad={() => "Loading..."}>Sign in</button> or{" "}
        <Link href='/signup'>
          <a>Sign up</a>
        </Link>
      </form>
    </>
  );
}
