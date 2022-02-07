import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Anchor } from "@/components/UI";
import Link from "next/link";
import { TypeScript } from "@/components/Icons";
import css from "./login.module.css";
import {
  GitHub,
  Google,
  Mail as MailIcon,
  LockClosedIcon
} from "@/components/Icons";
import { LoginUserMutationOptions } from "@/graphql/mutations/login-user.graphql";
import {
  useLoginUserMutation,
  LoginUserMutationVariables,
  LoginUserDocument,
  LoginUserMutation,
  TokenPartialFragment,
  LoginUserMutationResult
} from "@/graphql/mutations/login-user.graphql";
import { useRouter } from "next/router";
import { blurDataURLShimmer } from "@/lib/shimmer";
import auth from "../../../../public/Cortina_Blue.jpg";
import cn from "classnames";
import {
  ViewerQuery,
  ViewerQueryVariables,
  ViewerDocument,
  useViewerLazyQuery
} from "@/graphql/queries/viewer.graphql";
import { ViewerPartialFragment } from "@/graphql/fragments/viewer-partial.graphql";
import useSWR from "swr";
import { authFetcher } from "@/lib/network/fetchers";
export type LoginProps = {
  accessToken?: string;
  className?: string;
  email: string | null;
  password: string | null;
};

export default function Login({
  accessToken,
  className,
  email: emailState,
  password: passwordState
}: LoginProps) {
  const [login, { data, error, loading }] = useLoginUserMutation({
    mutation: LoginUserDocument
  });

  const errorMessage = error?.message ?? "";

  const [status, setStatus] = useState(data?.login);
  const [password, setPassword] = useState(passwordState);
  const [accessTokenVal, setAccessTokenVal] = useState<string | undefined>(
    accessToken
  );
  const [email, setEmail] = useState(emailState);
  const res = useSWR<LoginUserMutationResult>(
    `/api/auth/login?email=${email}&password=${password}`,
    authFetcher
  );
  console.log(JSON.stringify(res, null, 2));

  const router = useRouter();

  useEffect(() => {
    setAccessTokenVal(res.data?.data?.login.accessToken ? res.data.data.login.accessToken : undefined)
    if (accessToken != null && accessTokenVal != null && accessToken.length > 0) {
      return setAccessTokenVal(accessToken)
    }
    (function isLoggedIn() {
      return res.data?.data?.login.accessToken != null
        ? res.data.data.login.accessToken && router.replace("/profile", {
          auth: `Bearer ${accessToken}`
        }): console.log(
            `Your session has ended or expired. Please Sign In.`
          )
    })();
  }, [status, router, setAccessTokenVal, accessToken, accessTokenVal, res.data?.data?.login.accessToken]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const variables = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(variables);
    setStatus(res.data?.data?.login ? res.data.data.login : undefined);
    setEmail(email as string);
    setPassword(password as string);
    login({
      variables: {
        data: { email: `${email}`, password: `${password}` }
      }
    })
      .then(dataa => {
        setStatus(dataa.data?.login);
        return dataa;
      })
      .catch(error => {
        console.error(error);
      });
    // }).then(data => {
    //   if (data.data = (res.data?.data)) {
    //     return ((res.data?.data?.login.accessToken != null && accessToken != null) ? setStatus(() => res.data?.data?.login) : null)
    //   }
    //   if (status != null) {
    //     return accessToken === status.accessToken ? (status.accessToken = accessToken) : undefined;
    //   }
    //   return data.data
    // }).then((val => {
    //   console.log(val);
    //   return val
    // }))
  }

  const isActive: (pathname: string) => boolean = pathname =>
    router.pathname === pathname;
  return (
    <div className={cn("min-h-screen object-cover flex", className ?? "")}>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Link href='/' as='/' scroll={true} passHref={true}>
              <Anchor id='/#' className='focus:outline-none'>
                <TypeScript className={css.logo} />
              </Anchor>
            </Link>
            <h2 className='leading-[2.875rem] text-[1.525rem] tracking-[0.0225rem] text-left font-light font-sans text-stone-300'>
              Sign in to your account
            </h2>
          </div>
          <div className=''>
            <form
              method='POST'
              onClick={e => {
                e.preventDefault();
                () => handleSubmit;
              }}
              className='space-y-6'>
              <fieldset disabled={loading} aria-busy={loading}>
                <div>
                  <label htmlFor='email' className='sr-only'>
                    Email
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <MailIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='focus:ring-indigo-50focus:ring-inset-2 appearance-none focus:border-indigo-50 placeholder:text-sm placeholder:text-black/30 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                      placeholder='crm@cortinahealth.com'
                    />
                  </div>
                  <label htmlFor='password' className='sr-only'>
                    Password
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <LockClosedIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='focus:ring-indigo-50focus:ring-inset-2 appearance-none focus:border-indigo-50 placeholder:text-sm placeholder:text-black/30  block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                      placeholder='8 characters minimum'
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <div className='mt-1 grid grid-cols-2 gap-3'>
                      {errorMessage !== "" ? (
                        <>
                          <p>{errorMessage}</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <button
                        disabled={loading}
                        type='submit'
                        className='w-2/3 mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                        {loading ? "Signing in..." : "Sign in"}
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <Image
          blurDataURL={blurDataURLShimmer({ w: 1000, h: 850 })}
          placeholder='blur'
          // width='1000'
          layout='fill'
          objectFit='cover'
          // height='850'
          quality='85'
          className='absolute inset-0 max-h-[100vh] w-full object-cover'
          src={auth.src ?? "/Cortina_Blue.jpg"}
          alt='Cortina Login'
        />
      </div>
    </div>
  );
}
