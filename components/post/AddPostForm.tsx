"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postAdded } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";
import { AppDispatch } from "@/app/store/store";

const AddPostForm = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<undefined | number>(undefined);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(Number(e.target.value));

  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    userId !== undefined &&
    addRequestStatus === "idle";

  const onSavePostClicked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("failed to save the posts", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePostClicked} className="space-y-4 max-w-4xl">
        <div className="grid">
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div>
          <label htmlFor="postAuthor">Author:</label>
          <select id="postAuthor" value={userId} onChange={onAuthorChange}>
            <option value=""></option>
            {usersOptions}
          </select>
        </div>
        <div className="grid">
          <label htmlFor="postContent">Content:</label>
          <textarea
            className="border border-foreground"
            id="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <button disabled={!canSave} type="submit">
          Save Post
        </button>
      </form>
    </section>
  );
};

export { AddPostForm };
