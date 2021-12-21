import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input,CustomInput,Dropdown, DropdownToggle, DropdownMenu,DropdownItem,Container, ListGroup, ListGroupItem } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {

  state = {
    navigate: false,
    isLoading: false,
    type: "",
    file: "",
  };

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
      isLoading: false,
    });
  };

  onSaveHandler = () => {
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/addImage", {
        type: this.state.type,
        file: this.state.file,
      })
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false });
        if (response.data.status === "success") {
         
        }
        if (response.data.status === "failed") {
         
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };


  render() {
    const isLoading = this.state.isLoading;
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    const { fileName, invalidFile } = this.state;

    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div className="container  border">
        <h3> HomePage</h3>
        <div className="row">
          <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
            <h5> Welcome, {user.first_name} </h5> You have Logged in
            successfully.
          </div>
          <div className="col-xl-3 col-sm-12 col-md-3">
            <Button
              className="btn btn-primary text-right"
              onClick={this.onLogoutHandler}
            >
              Logout
            </Button>
          </div>
        </div>

        <div >
        <Form className="containers" style={{ 
      backgroundImage: `url("https://wallpaperaccess.com/full/1385482.jpg")` 
    }}>
          <FormGroup>
            <Label for="type">Type</Label>
            <Input
              type="name"
              name="type"
              placeholder="Enter type"
              value={this.state.type}
            />
          </FormGroup>
          
          <CustomInput
          type="file"
          id="exampleCustomFileBrowser"
          name="img"
          label={fileName || 'choose an image file'}
          onChange={this.handleFileChange}
          invalid={invalidFile} />

        <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSaveHandler}
          >
            SUBMIT
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
     </Form>

      </div>


      </div>
    );
  }
}
