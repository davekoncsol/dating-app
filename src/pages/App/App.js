import React, {Component} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import Body from '../../components/Body/Body'
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import userService from '../../utils/userService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser()
    };
  }



  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  getUserById = async id => {
   let profileUser = await userService.getUserBy(id);
   this.setState({profileUser})

  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }


render() {
    return (
    <div className="App">
      <header className="App-header">
       <NavBar 
       user={this.state.user}
       handleLogout={this.handleLogout}/>
      </header>
      <Switch>
        <Route exact path='/' render={() =>
          <Body />

        }/>
        <Route exact path="/profile/:id" render={(props) =>
        <ProfilePage 
        {...props}
        user={this.state.user}
        getUserById={this.getUserById}
        profileUser={this.state.profileUser}
        />
        
      }/>
        <Route exact path='/signup' render={({ history }) =>
          <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
            />
        }/>
      <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>

       <footer />
      </Switch>
    </div>

  );
}
}

export default App;
