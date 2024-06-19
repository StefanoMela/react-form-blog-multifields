import { useState } from "react";
import "/src/app.css";

export default function App() {
  const tagList = ["html", "css", "javascript", "react", "php", "vue"];

  const [posts, setPosts] = useState([]);

  const defaultFormData = {
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleField = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setPosts((data) => [...data, formData]);
    setFormData(defaultFormData);
  };

  const removePost = (indexToRemove) => {
    setPosts((postsArray) => postsArray.filter((_, i) => i !== indexToRemove));
  };

  const updatePost = (indexToUpdate, updatedPost) => {
    setPosts((postsArray) => {
      const newPostsArray = [...postsArray];
      newPostsArray[indexToUpdate] = updatedPost;
      return newPostsArray;
    });
  };

  return (
    <>
      <section className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label htmlFor="title" className="title">
              Titolo Post
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleField("title", e.target.value)}
              required
            />
          </div>
          <div className="form-element content">
            <label htmlFor="content">Contenuto</label>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              value={formData.content}
              onChange={(e) => handleField("content", e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-element image">
            <label htmlFor="image">Immagine</label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image}
              onChange={(e) => handleField("image", e.target.value)}
            />
          </div>
          <div className="form-element category">
            <label htmlFor="category">Categoria</label>
            <select
              name="category"
              htmlFor="category"
              id="category"
              value={formData.category}
              onChange={(e) => handleField("category", e.target.value)}
            >
              <option value="news">News</option>
              <option value="sport">Sport</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="form-element tags">
            <label htmlFor="tags">Tags</label>
            {tagList.map((tag, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`tag-${index}`}
                  name="tags"
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={(e) => {
                    const newTags = formData.tags.includes(tag)
                      ? formData.tags.filter((t) => t !== tag)
                      : [...formData.tags, tag];
                    handleField("tags", newTags);
                  }}
                />
                <label htmlFor={`tag-${index}`}>{tag}</label>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="title-container">
          {posts.length > 0 && (
            <>
              <h2>I Post sono:</h2>
              <section className="list">
                {posts.map((post, index) => (
                  <article key={`post${index}`} className="title-item">
                    <span>Titolo:</span>
                    <h2>{post.title}</h2>
                    <span>Contenuto:</span>
                    <p>{post.content}</p>
                    <span>Tags:</span>
                    {post.tags.map((tag, index) => (
                      <p key={index}>{tag}</p>
                    ))}
                    <span>Immagine:</span>
                    <img src={post.image} alt={post.title} />
                    <br />
                    <span>Categoria:</span>
                    <p>{post.category}</p>
                    <button
                      onClick={() => removePost(index)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
