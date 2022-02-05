import { ApolloError } from "@apollo/client";
import React, { ReactNode } from "react";
import { Inspector } from "../index";
export interface ErrorInterface {
  error: ApolloError;
}
export default class ApolloErrorComponent
  extends React.Component<{}, {}, ApolloError>
  implements ErrorInterface
{
  constructor(
    public readonly error: ApolloError,
    public readonly props: Readonly<{}> &
      Readonly<{ children?: ReactNode }>
  ) {
    super({ props });
    error = this.error;
  }

  toString(): string {
    return JSON.stringify(
      {
        ...this.error
      },
      null,
      2
    );
  }
  render(
    props: Readonly<{}> & Readonly<{ children?: ReactNode }> = this.props
  ) {
    return (
      <div>
        <>{(props = this.props)}</>
        <Inspector>{this.toString()}</Inspector>
      </div>
    );
  }
}
