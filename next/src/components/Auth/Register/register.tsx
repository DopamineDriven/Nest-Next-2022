import Image from "next/image";
import { Anchor } from "@/components/UI";
import { TypeScript } from "@/components/Icons";
import Link from "next/link";
import css from "./login.module.css";
import { GitHub, Google } from "@/components/Icons";
// import {
//   UserCreateMutation,
//   UserCreateMutationVariables,
//   useUserCreateMutation,
//   UserCreateMutationOptions,
//   UserCreateDocument
// } from "@/graphql/Mutations/user-create.graphql";
import { useRouter } from "next/router";
import { blurDataURLShimmer } from "@/lib/shimmer";
import { RegisterMutation, RegisterMutationOptions } from "@/graphql/mutations/register.graphql";

export default function Register() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = pathname =>
    router.pathname === pathname;
  return (
    <div className='min-h-screen bg-white flex'>
      <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Link href='/' as='/' scroll={true} passHref={true}>
              <Anchor id='/#' className='focus:outline-none'>
                <TypeScript className={`${css.logo}`} />
              </Anchor>
            </Link>
            <h2 className='mt-6 text-3xl font-extrabold font-interVar text-gray-900'>
              Sign in to your account
            </h2>
          </div>
          <div className='mt-8'>
            <div>
              <div>
                <div className='mt-1 grid grid-cols-2 gap-3'>
                  {/* <div>
                    <Link
                      href='/api/auth/[...nextauth]'
                      as='/api/auth/signin'
                      passHref={true}
                      scroll={true}>
                      <a
                        data-active={isActive("/signup")}
                        onClick={e => {
                          e.preventDefault();
                          signIn();
                        }}
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                        <span className='sr-only'>
                          Sign in with Google
                        </span>
                        <Google />
                      </a>
                    </Link>
                  </div>

                  <div>
                    <Link
                      href='/api/auth/[...nextauth]'
                      as='/api/auth/signin'
                      passHref={true}
                      scroll={true}>
                      <a
                        data-active={isActive("/signup")}
                        onClick={e => {
                          e.preventDefault();
                          signIn();
                        }}
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                        <span className='sr-only'>
                          Sign in with GitHub
                        </span>
                        <GitHub />
                      </a>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <Image
          blurDataURL={blurDataURLShimmer({ w: 1000, h: 850 })}
          placeholder='blur'
          width='1000'
          layout='responsive'
          objectFit='cover'
          height='850'
          quality='85'
          className='absolute inset-0 max-h-[100vh] w-full object-cover'
          src='/Cortina_Blue.jpg'
          alt='Cortina Login'
        />
      </div>
    </div>
  );
}
