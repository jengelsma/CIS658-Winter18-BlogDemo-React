import React from 'react';
import { Link } from 'react-router-dom';

const Posts = (props) => {
  return(
    <div className="posts">
      <h1> Posts </h1>
      <Link to={`/authors/${props.match.params.id}/posts/create`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-plus"></i> Create
        </button>
      </Link>
    </div>
  )
}

export default Posts;
