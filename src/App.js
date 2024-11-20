import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    setPostTitle("");
    setPostContent("");
    setPostImage(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!postTitle || !postContent) {
      alert("Please fill in both the title and content.");
      return;
    }

    if (!postImage) {
      alert("Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPost = {
        id: Date.now(),
        title: postTitle,
        content: postContent,
        image: reader.result,
      };
      setPosts([...posts, newPost]);
      toggleFormVisibility(); // Hide the form after submission
    };

    reader.readAsDataURL(postImage);
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <h1>My Blog</h1>
        <button onClick={toggleFormVisibility}>
          {formVisible ? "Cancel" : "Create New Blog"}
        </button>
      </header>

      {/* Main Section */}
      <main>
        {/* Blog Post Form */}
        {formVisible && (
          <form onSubmit={handleFormSubmit}>
            <h2>Create a New Post</h2>

            <label htmlFor="post-title">Post Title</label>
            <input
              type="text"
              id="post-title"
              placeholder="Enter Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />

            <label htmlFor="post-content">Post Content</label>
            <textarea
              id="post-content"
              placeholder="Enter Content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            />

            <label htmlFor="post-image">Upload Image</label>
            <input
              type="file"
              id="post-image"
              accept="image/*"
              onChange={(e) => setPostImage(e.target.files[0])}
            />

            <button type="submit">Create Post</button>
          </form>
        )}

        {/* Blog Posts Section */}
        <section id="blog-posts">
          {posts.map((post) => (
            <div key={post.id} className="blog-post">
              <img src={post.image} alt="Post" />
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer Section */}
      <footer>
        <p>© 2024 My Blog | All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;
