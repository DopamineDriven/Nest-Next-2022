import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Dashboard,
  Clock,
  XIcon,
  BellIcon,
  Search as SearchIcon
} from "@/components/Icons";
import { TypeScript } from "@/components/Icons";
import {Analytics} from "@/components/Icons";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

const {
  ArchiveIcon,
  CalendarIcon,
  ChatAltIcon,
  CheckCircleIcon,
  HomeIcon,
  LockOpenIcon,
  MenuAlt2Icon,
  PencilIcon,
  TagIcon,
  UserCircleIconOutline,
  UserCircleIconSolid,
  ViewListIcon
} = Dashboard;

const navigation = [
  { name: "All Issues", href: "#", icon: HomeIcon, current: true },
  { name: "My Issues", href: "#", icon: ViewListIcon, current: false },
  {
    name: "Assigned",
    href: "#",
    icon: UserCircleIconOutline,
    current: false
  },
  { name: "Closed", href: "#", icon: ArchiveIcon, current: false },
  { name: "Recent", href: "#", icon: Clock, current: false }
];
const projects = [
  { id: 1, name: "Teledermatology App", href: "#" },
  { id: 2, name: "Headless WP CMS", href: "#" },
  { id: 3, name: "Nextjs CRM Frontend", href: "#" },
  { id: 4, name: "Nestjs CRM Backend", href: "#" }
];
const activity = [
  {
    id: 1,
    type: "comment",
    person: { name: "Dylan Fashbaugh", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
    date: "6d ago"
  },
  {
    id: 2,
    type: "assignment",
    person: { name: "Chase Roossin", href: "#" },
    assigned: { name: "Amanda Kays ", href: "#" },
    date: "2d ago"
  },
  {
    id: 3,
    type: "tags",
    person: { name: "Chase Roossin ", href: "#" },
    tags: [
      { name: "Bug", href: "#", color: "bg-rose-500" },
      { name: "Accessibility", href: "#", color: "bg-indigo-500" }
    ],
    date: "6h ago"
  },
  {
    id: 4,
    type: "comment",
    person: { name: "Jonathan Yancey", href: "#" },
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.",
    date: "2h ago"
  }
];

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='min-h-full flex font-sans max-w-[2870px] mx-auto'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'>
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}>
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <TypeScript />
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <nav className='px-2'>
                    <div className='space-y-1'>
                      {navigation.map((item, i) => (
                        <Link
                          key={(++i) ** 2.5 / i++}
                          href={item.href}
                          as={item.href}
                          scroll={true}
                          passHref={true}>
                          <a
                            id={"#" + item.href}
                            className={cn(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            aria-current={
                              item.current ? "page" : undefined
                            }>
                            <item.icon
                              className={cn(
                                item.current
                                  ? "text-gray-300"
                                  : "text-gray-400 group-hover:text-gray-300",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden='true'
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                    <div className='mt-10'>
                      <p className='px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                        Projects
                      </p>
                      <div className='mt-2 space-y-1'>
                        {projects.map((project, j) => (
                          <Link
                            key={(++j) ** 1.5 / j++}
                            href={project.href}
                            as={project.href}
                            scroll={true}
                            passHref={true}>
                            <a
                              id={"#" + project.href}
                              className='flex items-center text-gray-300 hover:bg-gray-700  hover:text-white px-2 py-2 text-base font-medium rounded-md'>
                              <span className='truncate'>
                                {project.name}
                              </span>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
                <div className='flex-shrink-0 flex bg-gray-700 p-4'>
                  <a href='#' className='flex-shrink-0 group block'>
                    <div className='flex items-center'>
                      <div>
                        <Image
                          className='inline-block h-10 w-10 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <p className='text-base font-medium text-white'>
                          Tom Cook
                        </p>
                        <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300'>
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:w-64 lg:fixed lg:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex-1 flex flex-col min-h-0'>
            <div className='flex items-center h-16 flex-shrink-0 px-4 bg-gray-900'>
              <Link href='/' as='/' passHref={true} scroll={true}>
                <a
                  id='/#'
                  className='hover:bg-gray-700/10 hover:text-white hover:rounded-full duration-200 transition-colors'>
                  <TypeScript
                    className='hover:scale-[0.985] ease-linear transform-gpu duration-200 '
                    width='125'
                  />
                </a>
              </Link>
            </div>
            <div className='flex-1 flex flex-col overflow-y-auto bg-gray-800'>
              <nav className='flex-1 px-2 py-4'>
                <div className='space-y-1'>
                  {navigation.map((item, k) => (
                    <Link
                      key={(++k) ** 1.5 / k++}
                      href={item.href}
                      as={item.href}
                      scroll={true}
                      passHref={true}>
                      <a
                        id={"#" + item.href}
                        className={cn(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}>
                        <item.icon
                          className={cn(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className='mt-10'>
                  <p className='px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                    Projects
                  </p>
                  <div className='mt-2 space-y-1'>
                    {projects.map(project => (
                      <Link
                        href={project.href}
                        key={project.id}
                        passHref={true}>
                        <a
                          id={"#" + project.href}
                          className='group flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700'>
                          <span className='truncate'>{project.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className='lg:pl-64 flex flex-col w-0 flex-1'>
          <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden'
              onClick={() => setSidebarOpen(true)}>
              <span className='sr-only'>Open sidebar</span>
              <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 px-4 flex justify-between'>
              <div className='flex-1 flex'>
                <form
                  className='w-full flex lg:ml-0'
                  action='#'
                  method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                      <SearchIcon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <input
                      id='search-field'
                      className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                      placeholder='Search'
                      type='search'
                      name='search'
                    />
                  </div>
                </form>
              </div>
              <div className='ml-4 flex items-center lg:ml-6'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                  Create
                </button>
              </div>
            </div>
          </div>

          <main className='flex-1'>
            <div className='py-8 xl:py-10'>
              <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3'>
                <div className='xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200'>
                  <div>
                    <div>
                      <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
                        <div>
                          <h1 className='text-2xl font-bold text-gray-900'>
                            Upload Case Image Error
                          </h1>
                          <p className='mt-2 text-sm text-gray-500'>
                            #400 opened by{" "}
                            <a
                              href='#'
                              className='font-medium text-gray-900'>
                              Chase Roossin
                            </a>{" "}
                            in{" "}
                            <a
                              href='#'
                              className='font-medium text-gray-900'>
                              Developer Portal
                            </a>
                          </p>
                        </div>
                        <div className='mt-4 flex space-x-3 md:mt-0'>
                          <button
                            type='button'
                            className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                            <PencilIcon
                              className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span>Edit</span>
                          </button>
                          <button
                            type='button'
                            className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                            <BellIcon
                              className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span>Subscribe</span>
                          </button>
                        </div>
                      </div>
                      <aside className='mt-8 xl:hidden'>
                        <h2 className='sr-only'>Details</h2>
                        <div className='space-y-5'>
                          <div className='flex items-center space-x-2'>
                            <LockOpenIcon
                              className='h-5 w-5 text-green-500'
                              aria-hidden='true'
                            />
                            <span className='text-green-700 text-sm font-medium'>
                              Open Issue
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <ChatAltIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span className='text-gray-900 text-sm font-medium'>
                              4 comments
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <CalendarIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                            <span className='text-gray-900 text-sm font-medium'>
                              Created on{" "}
                              <time dateTime='2021-12-20'>
                                Dec 20, 2021
                              </time>
                            </span>
                          </div>
                        </div>
                        <div className='mt-6 border-t border-b border-gray-200 py-6 space-y-8'>
                          <div>
                            <h2 className='text-sm font-medium text-gray-500'>
                              Assignees
                            </h2>
                            <ul role='list' className='mt-3 space-y-3'>
                              <li className='flex justify-start'>
                                <a
                                  href='#'
                                  className='flex items-center space-x-3'>
                                  <div className='flex-shrink-0'>
                                    <Image
                                      className='h-5 w-5 rounded-full'
                                      layout='responsive'
                                      width='256'
                                      height='256'
                                      quality='100'
                                      src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                      alt=''
                                      objectFit='cover'
                                    />
                                  </div>
                                  <div className='text-sm font-medium text-gray-900'>
                                    Amanda Kays
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h2 className='text-sm font-medium text-gray-500'>
                              Tags
                            </h2>
                            <ul role='list' className='mt-2 leading-8'>
                              <li className='inline'>
                                <a
                                  href='#'
                                  className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'>
                                  <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                    <span
                                      className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                    Bug
                                  </div>
                                </a>{" "}
                              </li>
                              <li className='inline'>
                                <a
                                  href='#'
                                  className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'>
                                  <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                    <span
                                      className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                      aria-hidden='true'
                                    />
                                  </div>
                                  <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                    Accessibility
                                  </div>
                                </a>{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </aside>
                      <div className='py-3 xl:pt-6 xl:pb-0'>
                        <h2 className='sr-only'>Description</h2>
                        <div className='prose max-w-none'>
                          <p>
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Expedita, hic? Commodi cumque
                            similique id tempora molestiae deserunt at
                            suscipit, dolor voluptatem, numquam, harum
                            consequatur laboriosam voluptas tempore aut
                            voluptatum alias?
                          </p>
                          <ul role='list'>
                            <li>
                              Tempor ultrices proin nunc fames nunc ut
                              auctor vitae sed. Eget massa parturient
                              vulputate fermentum id facilisis nam
                              pharetra. Aliquet leo tellus.
                            </li>
                            <li>
                              Turpis ac nunc adipiscing adipiscing metus
                              tincidunt senectus tellus.
                            </li>
                            <li>
                              Semper interdum porta sit tincidunt. Dui
                              suspendisse scelerisque amet metus eget sed.
                              Ut tellus in sed dignissim.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section
                    aria-labelledby='activity-title'
                    className='mt-8 xl:mt-10'>
                    <div>
                      <div className='divide-y divide-gray-200'>
                        <div className='pb-4'>
                          <h2
                            id='activity-title'
                            className='text-lg font-medium text-gray-900'>
                            Activity
                          </h2>
                        </div>
                        <div className='pt-6'>
                          {/* Activity feed*/}
                          <div className='flow-root'>
                            <ul role='list' className='-mb-8'>
                              {activity.map((item, itemIdx) => (
                                <li key={item.id}>
                                  <div className='relative pb-8'>
                                    {itemIdx !== activity.length - 1 ? (
                                      <span
                                        className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                                        aria-hidden='true'
                                      />
                                    ) : null}
                                    <div className='relative flex items-start space-x-3'>
                                      {item.type === "comment" ? (
                                        <>
                                          <div className='relative'>
                                            <Image
                                              className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'
                                              layout='responsive'
                                              width='256'
                                              height='256'
                                              quality='100'
                                              src={
                                                item.imageUrl
                                                  ? item.imageUrl
                                                  : "/cortina-logo.png"
                                              }
                                              alt='alt'
                                              objectFit='cover'
                                            />
                                            <span className='absolute -bottom-5 left-2 bg-white rounded-tl px-0.5 py-px '>
                                              <ChatAltIcon
                                                className='h-5 w-5 text-gray-400'
                                                aria-hidden='true'
                                              />
                                            </span>
                                          </div>
                                          <div className='min-w-0 flex-1'>
                                            <div className='ml-5'>
                                              <div className='text-sm'>
                                                <Link
                                                  href={item.person.href}
                                                  passHref={true}
                                                  scroll={true}
                                                  as={item.person.href}>
                                                  <a
                                                    id={
                                                      "#" +
                                                      item.person.href
                                                    }
                                                    className='font-medium text-gray-900'>
                                                    {item.person.name}
                                                  </a>
                                                </Link>
                                              </div>
                                              <p className='mt-0.5 text-sm text-gray-500'>
                                                Commented {item.date}
                                              </p>
                                            </div>
                                            <div className='mt-2 text-sm text-gray-700 ml-5'>
                                              <p>{item.comment}</p>
                                            </div>
                                          </div>
                                        </>
                                      ) : item.type === "assignment" ? (
                                        <>
                                          <div>
                                            <div className='relative px-1'>
                                              <div className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                                                <UserCircleIconSolid
                                                  className='h-5 w-5 text-gray-500'
                                                  aria-hidden='true'
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className='min-w-0 flex-1 py-1.5'>
                                            <div className='text-sm text-gray-500'>
                                              <Link
                                                href={item.person.href}
                                                passHref={true}
                                                scroll={true}
                                                as={item.person.href}>
                                                <a
                                                  id={
                                                    "#" + item.person.href
                                                  }
                                                  className='font-medium text-gray-900'>
                                                  {item.person.name}
                                                </a>
                                              </Link>{" "}
                                              assigned{" "}
                                              <Link
                                                href={`${item.assigned?.href}`}
                                                passHref={true}
                                                scroll={true}
                                                as={`${item.assigned?.href}`}>
                                                <a
                                                  id={
                                                    "#" +
                                                    item.assigned?.href
                                                  }
                                                  className='font-medium text-gray-900'>
                                                  {item?.assigned?.name}
                                                </a>
                                              </Link>
                                              <span className='whitespace-nowrap'>
                                                {item.date}
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div>
                                            <div className='relative px-1'>
                                              <div className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                                                <TagIcon
                                                  className='h-5 w-5 text-gray-500'
                                                  aria-hidden='true'
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className='min-w-0 flex-1 py-0'>
                                            <div className='text-sm leading-8 text-gray-500'>
                                              <span className='mr-0.5'>
                                                <Link
                                                  href={item.person.href}
                                                  passHref={true}
                                                  scroll={true}
                                                  as={item.person.href}>
                                                  <a
                                                    id={
                                                      "#" +
                                                      item.person.href
                                                    }
                                                    className='font-medium text-gray-900'>
                                                    {item.person.name}
                                                  </a>
                                                </Link>
                                                added tags
                                              </span>{" "}
                                              <span className='mr-0.5'>
                                                {item?.tags?.map(tag => (
                                                  <Fragment key={tag.name}>
                                                    <Link
                                                      href={tag.href}
                                                      passHref={true}
                                                      scroll={true}
                                                      as={tag.href}>
                                                      <a
                                                        id={"#" + tag.href}
                                                        className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm'>
                                                        <span className='absolute flex-shrink-0 flex items-center justify-center'>
                                                          <span
                                                            className={cn(
                                                              tag.color,
                                                              "h-1.5 w-1.5 rounded-full"
                                                            )}
                                                            aria-hidden='true'
                                                          />
                                                        </span>
                                                        <span className='ml-3.5 font-medium text-gray-900'>
                                                          {tag.name}
                                                        </span>
                                                      </a>
                                                    </Link>{" "}
                                                  </Fragment>
                                                ))}
                                              </span>
                                              <span className='whitespace-nowrap'>
                                                {item.date}
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className='mt-6'>
                            <div className='flex space-x-3'>
                              <div className='flex-shrink-0'>
                                <div className='relative'>
                                  <Image
                                    className='h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'
                                    layout='responsive'
                                    width='256'
                                    height='256'
                                    quality='100'
                                    src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                    alt='alt-safafdasf'
                                    objectFit='cover'
                                  />
                                  <span className='absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px'>
                                    <ChatAltIcon
                                      className='h-5 w-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className='min-w-0 flex-1'>
                                <form action='#'>
                                  <div>
                                    <label
                                      htmlFor='comment'
                                      className='sr-only'>
                                      Comment
                                    </label>
                                    <textarea
                                      id='comment'
                                      name='comment'
                                      rows={3}
                                      className='shadow-sm block w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm border border-gray-300 rounded-md'
                                      placeholder='Leave a comment'
                                      defaultValue={""}
                                    />
                                  </div>
                                  <div className='mt-6 flex items-center justify-end space-x-4'>
                                    <button
                                      type='button'
                                      className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                                      <CheckCircleIcon
                                        className='-ml-1 mr-2 h-5 w-5 text-green-500'
                                        aria-hidden='true'
                                      />
                                      <span>Close issue</span>
                                    </button>
                                    <button
                                      type='submit'
                                      className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'>
                                      Comment
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <aside className='hidden xl:block xl:pl-8'>
                  <h2 className='sr-only'>Details</h2>
                  <div className='space-y-5'>
                    <div className='flex items-center space-x-2'>
                      <LockOpenIcon
                        className='h-5 w-5 text-green-500'
                        aria-hidden='true'
                      />
                      <span className='text-green-700 text-sm font-medium'>
                        Open Issue
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <ChatAltIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='text-gray-900 text-sm font-medium'>
                        4 comments
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <CalendarIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span className='text-gray-900 text-sm font-medium'>
                        Created on{" "}
                        <time dateTime='2021-12-20'>Dec 20, 2021</time>
                      </span>
                    </div>
                  </div>
                  <div className='mt-6 border-t border-gray-200 py-6 space-y-8'>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500'>
                        Assignees
                      </h2>
                      <ul role='list' className='mt-3 space-y-3'>
                        <li className='flex justify-start'>
                          <a
                            href='#'
                            className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                              <Image
                                className='h-5 w-5 rounded-full'
                                layout='responsive'
                                width='256'
                                height='256'
                                quality='100'
                                src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                alt='alt-safafdasf'
                                objectFit='cover'
                              />
                            </div>
                            <div className='text-sm font-medium text-gray-900'>
                              Amanda Kays
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500'>
                        Tags
                      </h2>
                      <ul role='list' className='mt-2 leading-8'>
                        <li className='inline'>
                          <a
                            href='#'
                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'>
                            <div className='absolute flex-shrink-0 flex items-center justify-center'>
                              <span
                                className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                aria-hidden='true'
                              />
                            </div>
                            <div className='ml-3.5 text-sm font-medium text-gray-900'>
                              Bug
                            </div>
                          </a>{" "}
                        </li>
                        <li className='inline'>
                          <a
                            href='#'
                            className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'>
                            <div className='absolute flex-shrink-0 flex items-center justify-center'>
                              <span
                                className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                aria-hidden='true'
                              />
                            </div>
                            <div className='ml-3.5 text-sm font-medium text-gray-900'>
                              Accessibility
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
