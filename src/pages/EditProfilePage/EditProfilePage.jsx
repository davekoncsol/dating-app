import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import UploadPhotos from '../../components/UploadPhotos/UploadPhotos'
import axios from 'axios';

class EditProfilePage extends Component {
  state = {
    invalidForm: false,
    formData: this.props.user,
    file: null
  };


  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    axios.post(`/test-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data.Location)
    }).catch(error => {
      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }



  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdateProfile(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

 

  render() {
   console.log(this.state.formData) 
    return (
      <>
      <div>
        <h1>Edit Profile</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Name (required)</label>
            <input
              className="form-control"
              name="name"
              value={this.state.formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>About(required)</label>
            <input
              className="form-control"
              name="aboutMe"
              value={this.state.formData.aboutMe}
              onChange={this.handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              name="age"
              value={this.state.formData.email}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-xs"
            disabled={this.state.invalidForm}
          >
            SAVE Profile
          </button>&nbsp;&nbsp;
        
          <Link to='/'>CANCEL</Link>
        </form>
        </div>
        <div>
        <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='submit'>Send</button>
      </form>
      </div>
      </>
    );
  }
}

export default EditProfilePage;