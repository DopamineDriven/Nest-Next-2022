export type PossibleTypesResultData = {
  possibleTypes: {
    Node: [
      "Account",
      "Category",
      "Comment",
      "Connection",
      "Entry",
      "MediaItem",
      "Profile",
      "Session",
      "User",
      "ViewerDetailed"
    ];
    NodeUnion: [
      "CommentConnection",
      "EntryConnection",
      "MediaItemConnection",
      "ProfileConnection",
      "SessionConnection",
      "UserConnection"
    ];
    TypesUnion: ["Entry", "MediaItem", "User"];
  };
};
const result: PossibleTypesResultData = {
  possibleTypes: {
    Node: [
      "Account",
      "Category",
      "Comment",
      "Connection",
      "Entry",
      "MediaItem",
      "Profile",
      "Session",
      "User",
      "ViewerDetailed"
    ],
    NodeUnion: [
      "CommentConnection",
      "EntryConnection",
      "MediaItemConnection",
      "ProfileConnection",
      "SessionConnection",
      "UserConnection"
    ],
    TypesUnion: ["Entry", "MediaItem", "User"]
  }
};
export default result;
