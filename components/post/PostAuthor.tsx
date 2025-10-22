"use client";
import { useSelector, UseSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

export default function PostAuthor({ userId }: postAuthorProps) {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "unknown author"}</span>;
}

type postAuthorProps = { userId: number };
