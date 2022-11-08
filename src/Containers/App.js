import React, { Component, Fragment } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";
import '../StyleComponents/App.css';


class App extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      searchfield: "",
    }
  };

componentDidMount() {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(users => {this.setState({ users: users })})
  .catch(err => {
    console.error(err);
  });
}

onSearchChange = (event) => {
  this.setState({ searchfield: event.target.value })
}

  render () {
    const { users, searchfield } = this.state;
    // Destructuring for save lines of code.
    const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(searchfield.toLowerCase())
    });
    if (!users.length) {
      return <h1 className="f2">Loading</h1>;
    }
    return (
      <Fragment>
        <header>
          <h1 className="f2">Kitty Friends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
        </header>
        <main>
          <section>
            <Scroll>
              <ErrorBoundry>
                <CardList robots={ filteredUsers }/>
              </ErrorBoundry>
            </Scroll>
          </section>
        </main>
        <footer>
          <small>Made By VerDanT</small>
        </footer>
      </Fragment>
    );
  }
}

export default App;