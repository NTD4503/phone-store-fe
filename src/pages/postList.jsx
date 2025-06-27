import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { togglePublished, addPost } from "../redux/post/postSlice";
import { useState } from "react";
import PostCard from "../components/postCard";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.listPost);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDetailId, setShowDetailId] = useState(null);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    dispatch(addPost({ title, content }));
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? "Đóng form" : "New Post"}
      </button>

      {showForm && (
        <form onSubmit={handleAddPost}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung"
          />
          <button type="submit">Thêm</button>
        </form>
      )}

      <ul>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggle={() => dispatch(togglePublished(post.id))}
            onShowDetail={() =>
              setShowDetailId((prevId) => (prevId === post.id ? null : post.id))
            }
            showDetail={showDetailId === post.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
