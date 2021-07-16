import { useHistory, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useFetch from "./useFetch";

const UpdateBlog = () => {
    
    const { id } = useParams();

    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
      fetch('http://localhost:8000/blogs/' + id)
        .then( res => {
          //console.log(res);
          return res.json();
        })
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
          setAuthor(data.author);
        })
    }, [])
    const history = useHistory();

    const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };
    fetch('http://localhost:8000/blogs/'+ id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }).then(() => {
      // history.go(-1);
      history.push('/');
    })
  }

return (
    <div className="update">
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <input 
          type="text" 
          required 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button>Update Blog</button>
      </form>
    </div>
  );
}
 
export default UpdateBlog;