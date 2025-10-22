"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectAllPosts,
  getPostStatus,
  getPostsError,
  fetchPosts,
} from "./postSlice";
import { AddPostForm } from "./AddPostForm";
import { AppDispatch } from "@/app/store/store";
import PostExcerpts from "./postExcerpt";

export default function PostsList() {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading posts please wait...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpts key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
      <AddPostForm />
    </section>
  );
}
