import "./LoginUser.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse( localStorage.getItem('user') ) ;

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
  function handleSubmit(event) {
    
    let body = {
      email: email,
      password: password,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/login", body)
      .then(function(response) {
          if(response.data.userModel){
            localStorage.setItem('user', JSON.stringify(response.data.userModel))

            switch(response.data.userModel.type){
              case 'COMPANY_ADMIN':
                  window.location.href = process.env.REACT_APP_WEB_URL + "/manage-company/suggestions";
                break;
                case 'COMPANY_USER':
                  window.location.href = process.env.REACT_APP_WEB_URL + "/user/suggestion";
                break;
                default:
                break;
            }

          } else {
            localStorage.removeItem('user');
          }
      })
      .catch(function(error) {
          console.log(error);
      });

    event.preventDefault();

  }

  const loggedIn = (
    <div className="App-Login">
      Already logged in!
    </div>
  );

  const loginForm = (
    <div className="App-Login-Container">
      <h1>Login</h1>
      <div className="App-Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email<span className="required">*</span></Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password<span className="required">*</span></Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
  
  if(user === null) {
    return [loginForm];
  } else {
    switch(user.type){
      case "COMPANY_ADMIN":
        window.location.href = process.env.REACT_APP_WEB_URL + "/manage-company";
        return [loggedIn];
      case "COMPANY_USER":
        window.location.href = process.env.REACT_APP_WEB_URL + "/user/suggestion";
        return [loggedIn];
      default:
        return [loginForm];
    }
  }
}