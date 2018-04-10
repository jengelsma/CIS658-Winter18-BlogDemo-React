import React from 'react';
import AuthorForm from './author_form';
import AuthorList from './author_list';

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

export default Authors;
