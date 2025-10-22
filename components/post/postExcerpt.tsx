import PostAuthor from "./PostAuthor";
import TimeAgo from "./timeAgo";
import ReactionButtons from "./reactionButtons";
import { Posts } from "./postSlice";

type PostExcerptsProps = { post: Posts };

export default function PostExcerpts({ post }: PostExcerptsProps) {
  return (
    <article className="p-4 border max-w-5xl border-foreground">
      <h3 className="text-3xl">{post.title}</h3>
      <p className="text-lg">{post.body}</p>
      <div className="postCredit grid-cols-1 grid gap-3">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
}
