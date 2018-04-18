import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
//const API_BASE = 'http://localhost:3000/';
const API_BASE = "https://still-forest-88986.herokuapp.com/";
const PostItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.title}</td>
      <td className="col-md-3">{props.article}</td>
      <td className="col-md-3 btn-toolbar">
        <Link to={`/authors/${props.author_id}/posts/${props.id}`}>
            <button className="btn btn-success btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

class Posts extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      posts: [],
      author_id: id,
      author: {}
    };

    this.loadPosts = this.loadPosts.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  loadPosts() {
    axios
    .get(`${API_BASE}/authors/${this.state.author_id}/posts`)
    .then(res => {
      this.setState({ posts: res.data });
      console.log(`Data loaded! = ${this.state.posts}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/authors/${this.state.author_id}`)
    .then(res => {
      this.setState({ author: res.data });
      console.log(`Data loaded! = ${this.state.posts}`)
    })
    .catch(err => console.log(err));
  }

  deletePost(id) {
    let filteredArray = this.state.posts.filter(item => item.id !== id)
    this.setState({posts: filteredArray});
    axios
    .delete(`${API_BASE}/authors/${this.state.author_id}/posts/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Posts mounted!')
    this.loadPosts();
  }

  render() {

    const postItems = this.state.posts.map((post)  => {
      return (
        <PostItem
          title={post.title}
          article={post.article}
          author_id = {post.author_id}
          id={post.id}
          key={post.id}
          onDelete={this.deletePost}
        />
      )
    });

    const headerString = (this.state.posts.count === 0)
      ? "Loading..." : `Posts by ${this.state.author.fname} ${this.state.author.lname}`
    return (
      <div className="posts">
        <h1> {headerString} </h1>
        <div className="author-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Title</th>
                <th className="col-md-3">Article</th>
              </tr>
            </thead>
            <tbody>
              {postItems}
            </tbody>
          </table>
          <Link to={`/authors/${this.state.author_id}/posts/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Posts;
