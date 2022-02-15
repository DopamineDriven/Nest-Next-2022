export type PossibleTypesResultData = {
  possibleTypes: {
    EntryCommentUnion: ["CommentConnection", "EntryConnection"];
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
    TypesUnion: ["Entry", "MediaItem", "User"];
  };
};
const result: PossibleTypesResultData = {
  possibleTypes: {
    EntryCommentUnion: ["CommentConnection", "EntryConnection"],
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
    TypesUnion: ["Entry", "MediaItem", "User"]
  }
};
export default result;
