import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from "next";
import {
  AllUsersQuery,
  AllUsersLazyQueryHookResult,
  AllUsersQueryVariables,
  AllUsersQueryResult,
  useAllUsersQuery,
  AllUsersDocument
} from "@/graphql/queries/users-paginated.graphql";
import auth from "../../public/Cortina_Blue.png";
import { NextPage } from "next";
import Image from "next/image";
import { initializeApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  checkFetcher,
  FetchResult,
  NormalizedCacheObject,
  serializeFetchParameter
} from "@apollo/client";
import { Inspector } from "@/components/UI";
import { Role, SortOrder, UserOrderByWithRelationAndSearchRelevanceInput, UserStatus, Viewer } from "../.cache/__types__";
import {
  ViewerQuery,
  useViewerLazyQuery,
  useViewerQuery,
  ViewerQueryVariables,
  ViewerDocument
} from "@/graphql/queries/viewer.graphql";
import { Login } from "@/components/Auth";
import { extractWords } from "@/utils/helpers";
import useSWR from "swr";

import { parse } from "cookie";
import { getCookies, getCookie } from "cookies-next";
import { ViewerPartialFragment } from "@/graphql/fragments/viewer-partial.graphql";
type TmpCookieObject = {
  [key: string]: string;
};
type IndexProps = {
  apolloCache: NormalizedCacheObject;
  userFromToken: ViewerQuery | null;  // cookie: TmpCookieObject
};

/**
 *
 * export type ManyUsersPaginatedArgs = {
  emailFilter: StringFilter;
  firstNameFilter: StringNullableFilter;
  lastNameFilter: StringNullableFilter;
  orderByRelevance: Array<UserOrderByWithRelationAndSearchRelevanceInput>;
  paginationArgs: PaginationArgsInput;
  roles: EnumRoleNullableFilter;
  userStatus: EnumUserStatusNullableFilter;
};
 */

function Home<T extends typeof getServerSideProps>({
  userFromToken}: InferGetServerSidePropsType<T>) {
  const { data } = useAllUsersQuery({
    query: AllUsersDocument,
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      // first: 15,
      // role: Role.Superadmin,
      // orderBy: {
      //   direction: SortOrder.Asc
      // },
      // filterEmailSubstring: "cortinahealth"
    } as AllUsersQueryVariables
  });
  //bg-[#133350]
  const crm = getCookie("crm-auth");
  const cookies = getCookies();

  const { data: viewer } = useViewerQuery({
    query: ViewerDocument,
    variables: {}
  });
  parse("crm-auth");
  return (
    <div className='font-sans text-3xl bg-gradient-to-tl from-[#133050] via-[#133350] to-black text-black font-bold min-w-full text-center  tracking-wide fit'>
      <Login viewer={viewer} />
      <Inspector>{JSON.stringify(viewer ?? "", null, 2)}</Inspector>
    </div>
  );
}

const getServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IndexProps>> => {
  const apollo = initializeApollo({ initialState: {}, ctx: ctx.query });
  const cookie = getCookie("crm-auth", { req: ctx.req, res: ctx.res });
  console.log(cookie ?? "");
  const bearer = ctx.req.headers.authorization;
  const extractToken = extractWords((bearer as string) ?? " ");
  console.log(extractToken ?? "");
  await apollo.query<ViewerQuery, ViewerQueryVariables>({
    query: ViewerDocument
    // variables: {
    //   accessToken: cookie as string
    // }
  });
  await apollo.query<AllUsersQuery, AllUsersQueryVariables>({
    query: AllUsersDocument,
    fetchPolicy: "cache-first",
    variables: {
      lastNameFilter: {
        mode: QueryMode.default
      },
      emailFilter: {
        mode: QueryMode.default
      },
      firstNameFilter: {
        mode: QueryMode.default
      },
      roles:{ in: [Role.Superadmin, Role.Admin, Role.Maintainer, Role.User]
      },
      userStatus: {in: [UserStatus.Online, UserStatus.Offline, UserStatus.Deactivated]},
      paginationArgs: {first: 15},
      orderByRelevance: [{
        firstName: "asc",
        entries: { _count: "desc" }
      },
        {
          _relevance:
          {
            fields: ["firstName"],
            search: "",
            sort: SortOrder.Asc }
        }
      ],
      filterEmailSubstring: "cortinahealth"
    }
  });

  return {
    props: {
      apolloCache: apollo.cache.extract(true),
      userFromToken: apollo.cache.readQuery<ViewerQuery, ViewerQueryVariables>({
        optimistic: true,
        query: ViewerDocument,
        variables: {
          accessToken: cookie as string
        },
        returnPartialData: true
      })
    }
  };
};

export default Home;
// ) : !called ? (
//   lazylazy({
//     variables: { first: 10, orderBy: { role: SortOrder.Asc } },
//   }).then((data) => {
//     return <Inspector>{data.data}</Inspector>;
//   })
// ) : loading ? (
//   <div>loading...</div>
// ) : (
//   <div>{error}</div>
// class ApolloHandler {
//   constructor(
//     private apollo: ApolloClient<NormalizedCacheObject> = initializeApollo({
//       initialState: {},
//       ctx,
//     })
//   ) {}
// }
