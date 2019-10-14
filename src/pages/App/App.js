import React, {Component} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import Home from '../../components/Home/Home'
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import userService from '../../utils/userService';
import AllProfilesPage from '../AllProfilesPage/AllProfilesPage';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
// import socket from '../../socket';

class App extends Component {
  constructor() {
     super();
    this.state =  {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser(),
      message: null,
      
    };
  }

  async componentDidMount ()  {
    // socket.registerApp(this);
    const user = await userService.getUser();
    if(user) {
    this.setState({ user: user }); 
    }
   }

  handleDeleteProfile = async id => {
    await userService.deleteOne(id);
    this.setState(state => ({
      
      user: null
    }), () => this.props.history.push('/'));
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  

  
  handleSignupOrLogin = () => {
    
    this.setState({user: userService.getUser()});
  }

  handleMessage = async messageData => {
    const message = await userService.newMessage(messageData)
    this.setState(
      { message: message},
      () => this.props.history.push(`/`)
    )

  }

  handleUpdateProfile = async updatedProfileData => {
   const updatedProfile= await userService.update(updatedProfileData);
    
    this.setState(
      {user: updatedProfile},
      () => this.props.history.push(`/profile/${this.state.user._id}`)
    );
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
      <div className="App-header">
       <NavBar 
       user={this.state.user}
       handleLogout={this.handleLogout}/>
      </div>
      <Switch>
        <Route exact path='/' render={() =>
          <Home />

        }/>
        <Route exact path="/profile/:id" render={(props) =>
        <ProfilePage 
        {...props}
        user={this.state.user}
        getUserById={this.getUserById}
        handleMessage={this.handleMessage}
        
        
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
      <Route exact path='/edit-profile' render={({ history, location }) => 
            <EditProfilePage
              history={history}
              user={this.state.user}
              handleUpdateProfile={this.handleUpdateProfile}
              location={location}
              handleDeleteProfile={this.handleDeleteProfile}
              
            />
          }/>
          

       <footer />
      </Switch>
    </div>

  );
}
}

export default App;
