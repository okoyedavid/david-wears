"use client";

import { useDispatch } from "react-redux";
import { Posts, reactionAdded } from "./postSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
} as const;

type ReactionName = keyof typeof reactionEmoji;

export default function ReactionButtons({ post }: { post: Posts }) {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const typedName = name as ReactionName;

    return (
      <button
        className="bg-transparent"
        key={typedName}
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: typedName }))
        }
      >
        {emoji} {post.reactions[typedName]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
}
