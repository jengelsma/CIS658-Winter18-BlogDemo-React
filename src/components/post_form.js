import React from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/';

class PostForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      title: "",
      article: "",
      author_id: id,
      post_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // load the post if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/authors/${this.state.author_id}/posts/${this.state.post_id}`)
      .then(res => {
        console.log("post fetched")
        this.setState({
          title: res.data.title,
          article: res.data.article
        })
      })
      .catch(err => console.log(err));
    }
  }

  addPost(newPost) {
    axios
    .post(`${API_BASE}/authors/${newPost.author_id}/posts`, newPost)
    .then(res => {
      //this.props.history.replace(`/authors/${this.state.author_id}/posts`);
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updatePost(post) {
    axios
    .put(`${API_BASE}/authors/${post.author_id}/posts/${post.post_id}`, post)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    const post = {
      title: this.state.title,
      article: this.state.article,
      author_id: this.state.author_id,
      post_id: this.state.post_id
    }
    if (this.state.createMode) {
      this.addPost(post);
    } else {
      this.updatePost(post);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    console.log("canceled pressed.")
    this.props.history.goBack();
    event.preventDefault();
  }

  render()  {
   return (
     <div>
       <h1>
         {this.state.createMode ? "Create Post" : "Edit Post"}
       </h1>
       <div className="author-form">
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label>Title</label>
             <input type="text" className="form-control" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="article">Article</label>
             <textarea className="form-control" name="article" id="article" value={this.state.article} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create" : "Save"}</button>
             <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

}

export default PostForm;
