import { FormEvent, useEffect, useState } from "react";
import { TypeScript } from "../../Icons";
import {
  usesignInUserMutation,
  ViewerQuery,
  signInUserDocument,
  namedOperations
} from "@/graphql/generated/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApolloError } from "@apollo/client";

export type LoginProps = {
  viewer?: ViewerQuery | null;
};

export default function LoginComponent({ viewer }: LoginProps) {
  const [accessTokenVal, setAccessTokenVal] = useState<string | null>(
    null
  );
  const [signInMutation, { loading, called, error, data, reset, client }] =
    usesignInUserMutation({
      mutation: signInUserDocument,
      refetchQueries: [namedOperations.Query.Viewer]
    });

  const [authDetailedState, setAuthDetailedState] = useState(data?.signin);
  // const viewerContext = data?.signin ? data.signin : viewer?.me;
  // const errorMessage = error?.message ?? "";

  const [emailState, setEmailState] = useState<string | null>(null);
  const [passwordState, setPasswordState] = useState<string | null>(null);

  const [status, setStatus] = useState(data?.signin);
  const router = useRouter();

  useEffect(() => {
    (async function authIIFE() {
      authDetailedState?.auth?.accessToken != null
        ? setTimeout(() => {
            const getLs = window.localStorage.getItem("authorization");
            if (getLs && getLs.length > 0)
              window.sessionStorage.setItem("authorization", getLs);
            setAccessTokenVal(
              getLs || `${authDetailedState?.auth?.accessToken}`
            );
          }, 4000)
        : () => {};
    })();
  }, [authDetailedState, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const variables = new FormData(event.currentTarget);
    const emailElement = event.currentTarget.elements.namedItem("email");
    const passwordElement =
      event.currentTarget.elements.namedItem("password");
    console.log(emailElement ?? "no email element");
    console.log(passwordElement ?? "no pw element");

    const { email, password } = Object.fromEntries(variables);
    console.log(email ?? "");
    console.log(password ?? "");
    setEmailState(email.toString());
    setPasswordState(password.toString());
    return await signInMutation({
      variables: {
        loginInput: {
          email: `${email}` ?? emailState,
          password: `${password}` ?? passwordState
        }
      }
    })
      .then(async data => {
        data.data?.signin != null
          ? data.data.signin.auth?.accessToken
            ? () => [
                setAuthDetailedState(data.data?.signin),
                setAccessTokenVal(
                  data.data?.signin?.auth?.accessToken ?? ""
                )
              ]
            : setAccessTokenVal(null)
          : setAuthDetailedState(undefined);
        return data.data?.signin;
      })
      .finally(() => Promise.resolve({}));
  }

  return (
    <>
      <div className='sm:mx-auto sm:w-full sm:max-w-2xl'>
        <div className='max-w-5xl'>
          <TypeScript className='mx-auto min-w-full w-32 h-18' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <Link href='/register' as='/register' passHref scroll={true}>
            <a className='font-medium text-blue-600 hover:text-blue-500'>
              create a new account
            </a>
          </Link>
        </p>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form
            method='POST'
            onSubmit={handleSubmit}
            className='space-y-6'>
            <fieldset disabled={loading} aria-busy={loading}>
              <div>
                <label
                  htmlFor='email'
                  className='sr-only block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <div className='my-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    onInput={e => {
                      e.preventDefault();
                      return e.currentTarget.value;
                    }}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block sr-only text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='my-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    onInput={e => {
                      e.preventDefault();
                      return e.currentTarget.value;
                    }}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm'
                  />
                </div>
              </div>
              <div className='my-1'>
                <div className='text-sm'>
                  <Link
                    href='/forgot-password'
                    as={"/forgot-password"}
                    passHref
                    scroll={true}>
                    <a className='font-medium text-blue-600 hover:text-blue-500'>
                      {"\n Forgot your password?"}
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <button
                  disabled={loading}
                  type='submit'
                  className='w-2/3 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
