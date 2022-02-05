import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { ViewerQuery } from "@/graphql/queries/viewer.graphql";
// import { Mail, Phone } from "../../Icons";
// import {
//   EntryByIdDocument,
//   EntryByIdQuery
// } from "@/graphql/Queries/entry-by-id.graphql";

import Image from "next/image";
import { blurDataURLShimmer } from "@/lib/shimmer";
import { Mail, Phone } from "@/components/Icons";

export type ProfileHeadingProps = {
  // viewer: UserByEmailQuery["viewer"];
  viewer?: ViewerQuery | null;
  className?: string;
};

const ProfileHeading: FC<ProfileHeadingProps> = ({ children, viewer }) => {
  return (

    <div className='font-sans'>
      <div className='relative'>
        <Image
          quality={90}
          placeholder='blur'
          objectFit='cover'
          width={1950}
          height={256}
          className='h-32 w-full min-w-fit object-cover lg:h-48'
          blurDataURL={blurDataURLShimmer({ w: 1200, h: 256 })}
          alt={`${viewer?.me.auth?.user?.firstName}'s cover image`}
          src='https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80'
        />
      </div>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
          <div className='z-100 sm:h-32 rounded-full sm:w-32'>
            {viewer?.me?.auth?.user?.image ? (
              <Image
                priority={true}
                className=' z-100 rounded-full  ring-white'
                src={viewer.me.auth.user.image}
                layout='responsive'
                objectFit={"cover"}
                width={128}
                blurDataURL={blurDataURLShimmer({ w: 128, h: 128 })}
                placeholder='blur'
                height={128}
                alt='User Profile Photo'
              />
            ) : (
              <Image
                className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                src={`/cortina-icon.png`}
                layout='responsive'
                objectFit={"cover"}
                width={96}
                blurDataURL={blurDataURLShimmer({ w: 96, h: 96 })}
                placeholder='blur'
                height={96}
                alt='Session Provider Account Photo'
              />
            )}
          </div>
          <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
            <div className='sm:hidden md:block mt-6 min-w-0 flex-1'>
              <h1 className='text-2xl font-bold text-gray-900 truncate'>
                {viewer?.me.auth?.user?.firstName ? viewer?.me.auth.user.firstName : "Name Null"}
              </h1>
            </div>
            <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
              <button
                type='button'
                className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'>
                <Mail className='-ml-1 mr-2 h-5 w-5 text-gray-400' />
                <span>Message</span>
              </button>
              <button
                type='button'
                className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'>
                <Phone className='-ml-1 mr-2 h-5 w-5 text-gray-400' />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className='hidden sm:block md:hidden mt-6 min-w-0 flex-1'>
          <h1 className='text-2xl font-bold text-white truncate'>
            {viewer?.me.auth?.user?.firstName ? viewer.me.auth.user.firstName : "Name Null"}
            <span className='lowercase text-2xl font-bold text-white'>
              {viewer?.me.auth?.user?.role}
            </span>
          </h1>
        </div>
      </div>
      {children ?? <></>}
    </div>
  );
};

export default ProfileHeading;
