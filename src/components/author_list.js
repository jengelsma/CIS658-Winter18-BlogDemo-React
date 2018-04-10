import React from 'react';

const AuthorListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-3">{props.fname}</td>
      <td className="col-md-3">{props.lname}</td>
      <td className="col-md-3">{props.email}</td>
      <td className="col-md-3 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

const AuthorList = (props) => {
  const authorItems = props.authors.map((author)  => {
    return (
      <AuthorListItem
        fname={author.fname}
        lname={author.lname}
        email={author.email}
        id={author.id}
        key={author.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="author-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Email</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authorItems}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorList;
