import { AuthDetailed, Viewer } from "@/cache/__types__";
import { CookieValueTypes } from "cookies-next/lib/types";
import { Inspector } from "@/components/UI";
import { ViewerQuery } from "@/graphql/queries/viewer.graphql";
import { NormalizedCacheObject } from "@apollo/client";
import {
  LoginUserDocument,
  useLoginUserMutation
} from "@/graphql/mutations/login-user.graphql";
import { useRouter } from "next/router";
import cn from "classnames";
import { TypeScript } from "@/components/Icons";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { UnwrapInputProps } from "@/types/mapped";
import {
  DeriveUserDetailsFromTokenDocument,
  useDeriveUserDetailsFromTokenMutation
} from "@/graphql/mutations/get-user-from-access-token.graphql";

const ReusableInput = ({
  ...props
}: UnwrapInputProps<
  | "onInput"
  | "type"
  | "required"
  | "onChange"
  | "name"
  | "className"
  | "id"
  | "alt"
  | "aria-label"
  | "autoComplete"
  | "formTarget"
  | "aria-current"
  | "ref"
  | "onKeyUp"
  | "maxLength"
  | "minLength"
  | "value"
>) => <input {...props} />;
type IndexProps = {
  viewerServer: ViewerQuery;
  parseAuthHeaderFromNest: string;
  normalizedCacheObject: NormalizedCacheObject;
  cookiesCalled: CookieValueTypes;
};

export default function Index() {
  const router = useRouter();
  const [accessTokenVal, setAccessTokenVal] = useState<string | null>(
    null
  );

  const [authDetailedState, setAuthDetailedState] =
    useState<AuthDetailed | null>(null);
  const [
    lazyLogin,
    {
      data: loginData,
      called: loginCalled,
      error: loginError,
      loading: logingLoading,
      client: loginClient,
      reset: loginReset
    }
  ] = useLoginUserMutation({
    mutation: LoginUserDocument
  });

  const [lazyDerivation, { data: dataDerivation }] =
    useDeriveUserDetailsFromTokenMutation({
      mutation: DeriveUserDetailsFromTokenDocument
    });

  useEffect(() => {
    (async function watchSWR() {
      accessTokenVal != null
        ? await lazyDerivation({ variables: { token: accessTokenVal } })
        : () => {};
    })();
  }, [accessTokenVal, lazyDerivation]);

  const [emailState, setEmailState] = useState<string | null>(null);
  const [passwordState, setPasswordState] = useState<string | null>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const variables = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(variables);
    console.log(email ?? "");
    console.log(password ?? "");
    setEmailState(email.toString());
    setPasswordState(password.toString());
    const lazyLogger = () =>
      lazyLogin({
        variables: {
          data: {
            email: `${email}` ?? emailState,
            password: `${password}` ?? passwordState
          }
        }
      })
        .then(data => {
          data.data?.login.accessToken != null
            ? setAccessTokenVal(data.data.login.accessToken)
            : setAccessTokenVal(null);
          return lazyDerivation({
            variables: { token: data.data?.login.accessToken as string }
          }).then(data => {
            return data.data
              ?.userFromAccessTokenDecoded as unknown as AuthDetailed;
          });
        })
        .then(promiseLikeAuthDetailed => {
          return promiseLikeAuthDetailed as unknown as AuthDetailed;
        });
    return lazyLogger()
      .then(data => {
        setAuthDetailedState(data);
        return data;
      })
      .finally((): void => {});
  }

  return (
    <>
      <div className={cn("sm:mx-auto sm:w-full sm:max-w-2xl")}>
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
          {authDetailedState !== null ? (
            <Inspector className="!container !min-w-fit">
              {JSON.stringify(authDetailedState, null, 2)}
            </Inspector>
          ) : (
            <form
              method='POST'
              onSubmit={e => {
                e.preventDefault();
                return handleSubmit(e);
              }}
              className='space-y-6'>
              <fieldset disabled={logingLoading} aria-busy={logingLoading}>
                <div>
                  <label
                    htmlFor='email'
                    className='sr-only block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <div className='my-1'>
                    <ReusableInput
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
                    <ReusableInput
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
                {/* {!login ? (
                <p className='error-message'>
                  Invalid username. Please try again.
                </p>
              ) : (
                <span className='sr-only'>{"username valid"}</span>
              )}
              {!isPasswordValid ? (
                <p className='error-message'>
                  Invalid password. Please try again.
                </p>
              ) : (
                <span className='sr-only'>{"password valid"}</span>
              )} */}
                <div>
                  <button
                    disabled={logingLoading}
                    type='submit'
                    className='w-2/3 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                    {logingLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
// const { data, error, isValidating, mutate } = SWR.default(() =>
//   accessTokenVal != null
//     ? [
//         `http://localhost:3000/auth/token/${accessTokenVal}`.trim(),
//         { viewerFetcher }
//       ]
//     : [null, { viewerFetcher }]
// ) as SWR.SWRResponse<AuthDetailed, any>;

// const [swrState, setSwrState] = useState(data);
// export const getServerSideProps = async (
//   ctx: GetServerSidePropsContext<ParsedUrlQuery>
// ): Promise<GetServerSidePropsResult<IndexProps>> => {
//   const apolloClient = initializeApollo({}, ctx);
//   await apolloClient
//     .query<ViewerQuery, ViewerQueryVariables>({
//       query: ViewerDocument,
//       variables: {},
//       partialRefetch: true
//     })
//     .then(data => data.data);
//   const parseAuthHeaderFromNest =
//     ctx.req.headers["authorization"]?.split(/([ ])/)[0] ?? "";
//   const cookies = (): CookieValueTypes =>
//     getCookie("nest-to-next-2022", {
//       req: ctx.req,
//       res: ctx.res,
//       encode: (value: string) => encodeURIComponent(value),
//       maxAge:
//         new Date(Date.now()).getMilliseconds() + 30 * 24 * 60 * 60 * 1000,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       httpOnly: false,
//       sameSite: "none"
//     });
//   const apolloCache = apolloClient.cache.extract;
//   const cookiesCalled = cookies();
//   return {
//     props: {
//       viewerServer: await apolloClient
//         .query<ViewerQuery, ViewerQueryVariables>({
//           query: ViewerDocument,
//           variables: {},
//           partialRefetch: true
//         })
//         .then(data => data.data),
//       cookiesCalled,
//       normalizedCacheObject: apolloCache(true),
//       parseAuthHeaderFromNest: parseAuthHeaderFromNest
//     }
//   };
// };
