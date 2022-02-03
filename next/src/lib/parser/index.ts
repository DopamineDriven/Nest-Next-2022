import parser, {
  DOMNode,
  HTMLReactParserOptions
} from "html-react-parser";
import { Element, Node } from "domhandler/lib/node";

export const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (
      domNode instanceof Node && domNode.type
        ? domNode.type.replace("img", "Image")
        : domNode.type
    ) {
      return domNode;
    }
    return domNode.cloneNode();
  }
};

export const htmlToReact = (x: string) =>
  parser(x, {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element && domNode.type.includes("img")
          ? domNode.type.replace("img", "Image")
          : domNode.type
      ) {
        return domNode.cloneNode;
      } else {
        return domNode.cloneNode;
      }
    }
  });
