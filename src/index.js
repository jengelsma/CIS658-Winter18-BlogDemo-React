import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const AuthorForm = (props) => {
  return (
    <div className="author-form">
      Our Author Form Goes Here.
    </div>
  );
}

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

class Authors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: [],
    };
    this.loadAuthors = this.loadAuthors.bind(this);
  }

  loadAuthors() {
    this.setState({
      authors: [
        {id: 1, fname: "sam", lname: "iam", email: "sam@aol.com"},
        {id: 2, fname: "jane", lname: "doe", email: "jane@aol.com"},
        {id: 3, fname: "fred", lname: "bear", email: "fred@aol.com"},
        {id: 4, fname: "ted", lname: "tooy", email: "ted@aol.com"},
      ]}
    );
  }

  componentDidMount() {
    console.log("Authors just got mounted")
    this.loadAuthors();
  }

  render() {
    return (
      <div className="authors">
        <AuthorForm />
        <AuthorList authors={this.state.authors}/>
      </div>
    );
  }
}

ReactDOM.render(<Authors />, document.getElementById('root'));
registerServiceWorker();
