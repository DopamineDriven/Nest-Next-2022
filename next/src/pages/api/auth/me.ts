import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import { ViewerQuery, ViewerQueryVariables, ViewerDocument } from "@/graphql/queries/viewer.graphql";
