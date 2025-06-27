const PostCard = ({ post, onToggle, onShowDetail, showDetail }) => {
  return (
    <li className="border p-4 my-2">
      <h3>
        {post.title} {showDetail && <span>{post.content}</span>}
      </h3>
      <button onClick={onShowDetail} className="bg-cyan-400 px-2 rounded ml-2">
        Hiển thị nội dung
      </button>
      <button onClick={onToggle} className="ml-2 bg-yellow-400 px-2 rounded">
        {post.isPublished ? "Công khai" : "Riêng tư"}
      </button>
    </li>
  );
};

export default PostCard;
