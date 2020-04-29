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
import tokenService from '../../utils/tokenService';
//import  './weavy-6.2.0+weavy.3f73d1d39.js';
const $ = require('jquery');
const Weavy = window.Weavy;



// import socket from '../../socket';




class App extends Component {

  
  constructor() {
     super();
    this.state =  {
      // Initialize user if there's a token, otherwise null
      user: userService.getUser(),
      message: null,
      conversations: [],
    };
  }
  

  async componentDidMount ()  {
    // socket.registerApp(this);
    const user = await userService.getUser();
  
    if(user) {
    console.log(tokenService.getToken());
    this.setState({ 
      user: user, 
      weavy: new Weavy({
        jwt: tokenService.getToken(),
        spaces: [
            {
              key: "main",
              container: ".weavy-widget",
              toggled: true,
              apps: [
                 { type: "messenger", key: "main-messenger", },
                 { type: "notifications", key: "main-notifications", },
                 { type: "posts", key: "main-hub", name: "Hub", },
              ]
            }
          ]
      }),
    });

    this.state.weavy.on("badge", function (e, data) {
      var messenger = $(".weavy-messenger-btn");
      var notifications = $(".weavy-notifications-btn");
      data.conversations > 0 ? messenger.append(`<div class="badge">${data.conversations}</div>`) : messenger.find(".badge").remove();
      data.notifications > 0 ? notifications.append(`<div class="badge">${data.notifications}</div>`) : notifications.find(".badge").remove();
    });

  // what happens when a certain app opens
    this.state.weavy.on("open", function (e, open) {
      console.log('woooooo')
      if (open.space.options.key === "main") {
          $(".widget-drawer").addClass("widget-drawer-in");
          $(".weavy-title").text(open.app.name);     
      }
      $(".weavy-app-header").text(open.app.name);
    });
  // what happens when a certain app closes
    this.state.weavy.on("close", function (e, close) {
      console.log(close.space.options.key, "close- key")
      if (close.space.options.key === "main") {
          $(".widget-drawer").removeClass("widget-drawer-in");    
      }
    });

    this.state.weavy.on("message-inserted.weavy.rtmweavy", function (e, message) {
    });
    
      if(user.conversations){
        this.state.user.conversations.map(convo=> this.getConversationById(convo).then(res => this.state.conversations.push(res)))
      }
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

  
  getConversationById = async id => {
    let conversation = await userService.getConversationById(id);
    return conversation
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
       handleLogout={this.handleLogout}
       weavy={this.state.weavy}
       />
       
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
           <Route exact path='/inbox' render={({ history }) =>
            <div className="body">
           <h1>Coming Soon</h1>
           </div>
          // <Inbox
          //   history={history}
          //   user={this.state.user}
          //   getUserById={this.getUserById}
          //   conversations={this.state.conversations}
          //   />
        }/>
          

       <footer />
      </Switch>
    </div>

  );
}
}

export default App;
