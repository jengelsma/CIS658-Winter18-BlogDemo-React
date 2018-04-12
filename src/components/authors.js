import React from 'react';
import AuthorForm from './author_form';
import AuthorList from './author_list';
import axios from 'axios';
const API_BASE = "http://localhost:3000/";

class Authors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      formMode: "new",
      author: {lname:"", fname:"", email:""}
    };
    this.loadAuthors = this.loadAuthors.bind(this);
    this.removeAuthor = this.removeAuthor.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
  }

  // loadAuthors() {
  //   this.setState({
  //     authors: [
  //       {id: 1, fname: "sam", lname: "iam", email: "sam@aol.com"},
  //       {id: 2, fname: "jane", lname: "doe", email: "jane@aol.com"},
  //       {id: 3, fname: "fred", lname: "bear", email: "fred@aol.com"},
  //       {id: 4, fname: "ted", lname: "tooy", email: "ted@aol.com"},
  //     ]}
  //   );
  // }

  updateForm(mode, authorVals) {
    this.setState({
      author: Object.assign({}, authorVals),
      formMode: mode,
    });
  }

  clearForm()
  {
    console.log("clear form");
    this.updateForm("new",{fname:"",lname:"",email:""});
  }

  formSubmitted(author) {
    if(this.state.formMode === "new") {
      this.addAuthor(author);
    } else {
      this.updateAuthor(author);
    }
    this.clearForm();
  }

  loadAuthors() {
    axios
    .get(`${API_BASE}/authors`)
    .then(res => {
      this.setState({ authors: res.data });
      console.log(`Data loaded! = ${this.state.authors}`)
    })
    .catch(err => console.log(err));
  }

  addAuthor(newAuthor) {
    axios
    .post(`${API_BASE}/authors`, newAuthor)
    .then(res => {
      res.data.key = res.data.id;
      this.setState({ authors: [...this.state.authors, res.data] });
    })
    .catch(err => console.log(err));
  }

  updateAuthor(author) {
    axios
    .put(`${API_BASE}/authors/${author.id}`, author)
    .then(res => {
      this.loadAuthors();
    })
    .catch(err => console.log(err));
  }

  removeAuthor(id) {
    let filteredArray = this.state.authors.filter(item => item.id !== id)
    this.setState({authors: filteredArray});
    axios
    .delete(`${API_BASE}/authors/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log("Authors just got mounted")
    this.loadAuthors();
  }

  render() {
    return (
      <div className="authors">
        <AuthorForm
          onSubmit={(author) => this.formSubmitted(author)}
          onCancel={(mode,author) => this.updateForm(mode,author)}
          formMode={this.state.formMode}
          author={this.state.author}
        />
        <AuthorList
          authors={this.state.authors}
          onDelete={(id) => this.removeAuthor(id)}
          onEdit={(mode,author) => this.updateForm(mode,author)}
        />
      </div>
    );
  }
}

export default Authors;
