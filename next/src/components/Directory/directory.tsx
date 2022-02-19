import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import cn from "classnames";
import { SVGAttribs } from "@/types/mapped";
import {
  allUsersDocument,
  allUsersQuery,
  allUsersQueryVariables,
  useallUsersLazyQuery
} from "@/graphql/generated/graphql";
import { DeepPartial } from "utility-types";

export type DirectoryProps = {
  people: allUsersQuery["listUsers"];
};

type Enumerable<T> = T extends infer U
  ? U
  : T | (T extends infer U ? U : T)[];

type UnEnumerate<T> = T extends Array<infer U> ? U : T;

const UsersIcon = ({
  ...props
}: SVGAttribs<"className" | "aria-hidden">) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const ChevronRightIcon = ({
  ...props
}: SVGAttribs<"className" | "aria-hidden">) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
        clipRule='evenodd'
      />
    </svg>
  );
};

const SearchIcon = ({
  ...props
}: SVGAttribs<"className" | "aria-hidden">) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
        clipRule='evenodd'
      />
    </svg>
  );
};

export default function Directory({ people }: DirectoryProps) {
  // const [
  //   lazyUsers,
  //   {
  //     variables,
  //     called,
  //     data,
  //     updateQuery,
  //     refetch,
  //     client,
  //     loading,
  //     error,
  //     previousData,
  //     networkStatus,
  //     fetchMore
  //   }
  // ] = useallUsersLazyQuery({ query: allUsersDocument });

  // const allUsersVars: allUsersQueryVariables = {
  //   findManyUsersPaginatedInput: {
  //     pagination: { first: 20 },
  //     orderBy: [
  //       {
  //         _relevance: {
  //           fields: [UserOrderByRelevanceFieldEnum.firstName],
  //           search: "*",
  //           sort: SortOrder.asc
  //         }
  //       }
  //     ],
  //     where: {
  //       role: {
  //         in: [Role.ADMIN, Role.MAINTAINER, Role.SUPERADMIN, Role.USER]
  //       }
  //     }
  //   }
  // };

  // const allusersVariablesRef = useRef(allUsersVars);
  // const [allusersFilterState, setAllUsersFilterState] =
  //   useState<allUsersQueryVariables>();

  // useCallback(() => {

  // }, [])

  // useEffect(() => {

  // }, [])

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(true);

  const filteredPeople =
    query === ""
      ? []
      : people.edges.filter(person => {
          const firstName = person.node.firstName;
          const lastName = person.node.lastName;
          const fullName = firstName?.concat(" ").concat(`${lastName}`);
          return fullName?.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20'
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'>
          <Combobox
            value={people}
            as='div'
            className='mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'
            onChange={person =>
              (window.location.pathname = `${person.edges
                .find(firstName => firstName)
                ?.node.firstName?.toLowerCase()}-${person.edges
                .find(lastName => lastName)
                ?.node.lastName?.toLowerCase()}`)
            }>
            {({ activeOption }) => (
              <>
                <div className='relative'>
                  <SearchIcon
                    className='pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <Combobox.Input
                    className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-0'
                    placeholder='Search...'
                    onChange={event => setQuery(event.target.value)}
                  />
                </div>

                {(query === "" || filteredPeople.length > 0) && (
                  <div className='flex divide-x divide-gray-100'>
                    <div
                      className={cn(
                        "max-h-96 min-w-0 flex-auto overflow-y-auto px-6 py-4",
                        activeOption && "sm:h-96"
                      )}
                      style={{
                        scrollPaddingTop: "1rem",
                        scrollPaddingBottom: "1rem"
                      }}>
                      {query === "" && (
                        <h2 className='mt-2 mb-4 text-xs font-semibold text-gray-500'>
                          Recent searches
                        </h2>
                      )}
                      <Combobox.Options
                        static
                        hold
                        className='-mx-2 text-sm text-gray-700'>
                        {query === "" ? (
                          <Image
                            src={`${
                              people.edges[0]?.node.image ?? "/archer.gif"
                            }`}
                            alt='/archer.gif'
                            width={64}
                            height={64}
                            className='mx-auto h-16 w-16 rounded-full'
                          />
                        ) : (
                          filteredPeople.map(person => (
                            <Combobox.Option
                              key={person.node.id}
                              value={person}
                              className={({ active }) =>
                                cn(
                                  "flex cursor-default select-none items-center rounded-md p-2",
                                  active && "bg-gray-100 text-gray-900"
                                )
                              }>
                              {({ active }) => (
                                <>
                                  <Image
                                    src={
                                      person.node?.image
                                        ? person.node.image
                                        : "/archer.gif"
                                    }
                                    alt={`${person.node.firstName} ${person.node.lastName}`}
                                    className='h-6 w-6 flex-none rounded-full'
                                    width='64'
                                    height='64'
                                  />
                                  <span className='ml-3 flex-auto truncate'>{`${person.node.firstName} ${person.node.lastName}`}</span>
                                  {active && (
                                    <ChevronRightIcon
                                      className='ml-3 h-5 w-5 flex-none text-gray-400'
                                      aria-hidden='true'
                                    />
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </div>

                    {people === activeOption && (
                      <div className='hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex'>
                        <div className='flex-none p-6 text-center'>
                          <Image
                            src={`${
                              activeOption.edges
                                ? activeOption.edges.find(image => image)
                                    ?.node.image
                                : "/archer.gif"
                            }`}
                            width='64'
                            height='64'
                            alt='/archer.gif'
                            className='mx-auto h-16 w-16 rounded-full'
                          />
                          <h2 className='mt-3 font-semibold text-gray-900'>{`${activeOption.edges.map(
                            firstName => {
                              return firstName.node.firstName;
                            }
                          )} ${
                            activeOption.edges.find(lastName => lastName)
                              ?.node.lastName
                          }`}</h2>
                          <p className='text-sm leading-6 text-gray-500'>
                            {
                              activeOption.edges.find(role => role)?.node
                                .role
                            }
                          </p>
                        </div>
                        <div className='flex flex-auto flex-col justify-between p-6'>
                          <dl className='grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700'>
                            <dt className='col-end-1 font-semibold text-gray-900'>
                              Phone
                            </dt>
                            <dd>
                              {
                                activeOption.edges.find(phone => phone)
                                  ?.node.profile?.phoneNumber
                              }
                            </dd>
                            <dt className='col-end-1 font-semibold text-gray-900'>
                              URL
                            </dt>
                            <dd className='truncate'>
                              <a
                                href={`http://localhost:3000/${activeOption.edges
                                  .find(firstName => firstName)
                                  ?.node.firstName?.toLowerCase()}-${activeOption.edges
                                  .find(lastName => lastName)
                                  ?.node.lastName?.toLowerCase()}`}
                                className='text-indigo-600 underline'>
                                {`${
                                  activeOption.edges.find(
                                    firstName => firstName
                                  )?.node.firstName
                                }-${
                                  activeOption.edges.find(
                                    lastName => lastName
                                  )?.node.lastName
                                }`}
                              </a>
                            </dd>
                            <dt className='col-end-1 font-semibold text-gray-900'>
                              Email
                            </dt>
                            <dd className='truncate'>
                              <a
                                href={`mailto:${
                                  activeOption.edges.find(email => email)
                                    ?.node.email
                                }`}
                                className='text-indigo-600 underline'>
                                {
                                  activeOption.edges.find(email => email)
                                    ?.node.email
                                }
                              </a>
                            </dd>
                          </dl>
                          <button
                            type='button'
                            className='focus:outline-none mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                            Send message
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {query !== "" && filteredPeople.length === 0 && (
                  <div className='py-14 px-6 text-center text-sm sm:px-14'>
                    <UsersIcon
                      className='mx-auto h-6 w-6 text-gray-400'
                      aria-hidden='true'
                    />
                    <p className='mt-4 font-semibold text-gray-900'>
                      No people found
                    </p>
                    <p className='mt-2 text-gray-500'>
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
