import React, {Component} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import Body from '../../components/Body/Body'
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import userService from '../../utils/userService';
import AllProfilesPage from '../AllProfilesPage/AllProfilesPage';

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

  
  
  
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  getUserById = async id => {
   let profileUser = await userService.getUserBy(id);
   return profileUser

  }

  getAllUsers = async () => {
    let profiles = await userService.getAllUsers();
    return profiles
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
        
        />
      }/>
        <Route exact path="/allprofiles" render={(props) =>
        <AllProfilesPage 
        {...props}
        user={this.state.user}
        getAllUsers={this.getAllUsers}
        
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
