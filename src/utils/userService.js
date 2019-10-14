import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function deleteOne(id){
  return fetch(`${BASE_URL}${id}`, {
    method: 'DELETE'
  }).then(res => res.json());

}


function getUser() {
  return tokenService.getUserFromToken();
}

function getAllUsers(){
  return fetch(BASE_URL)
  .then(res => res.json());
}

function getUserBy(id){
  return fetch(`${BASE_URL}${id}`).then(res => res.json());

}

function update(user) {
  return fetch(`${BASE_URL}${user._id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user)
  }).then(res => res.json());
}

function update2(user,two) {
  return fetch(`${BASE_URL}${user}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(two)
  }).then(res => res.json());
}

function newMessage(message) {
  return fetch(`/api/conversations/message`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(message)
  }).then(res => res.json())
  .then(res => {
   
    let body = {conversations: [res._id] }
    update2(res.sender, body)
   

    
    console.log(res)
  })
  
   
}

// function message(message) {
//   return fetch(`/api/conversations/${message._id}`, {
//     method: 'PUT',
//     headers: {'content-type': 'application/json'},
//     body: JSON.stringify(message)
//   })
  
//   .then(res => 
//     res.json()
//     );

// }


function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getUserBy,
  getAllUsers,
  update,
  deleteOne,
 
  newMessage
};