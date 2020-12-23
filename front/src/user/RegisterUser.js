import "./RegisterUser.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function RegisterUser() {


  const [registerEmail, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse( localStorage.getItem('user') ) ;

  function validateForm() {
    return companyName.length > 0 && registerEmail.length > 0 && password.length > 0;
  }
  
  function handleSubmit(event) {

    let body = {
      email: registerEmail,
      password: password,
      company_name: companyName,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/register", body)
      .then(function(response) {
        if(response.data.userModel){
          localStorage.setItem('user', JSON.stringify(response.data.userModel))

          switch(response.data.userModel.type){
            case 'COMPANY_ADMIN':
                window.location.href = process.env.REACT_APP_WEB_URL + "/manage-company/users";
              break;
              case 'COMPANY_USER':
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

  const loggedOut = (
    <div className="App-Login-Container">
      <h1>Register company</h1>
      <div className="App-Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="companyName">
            <Form.Label>Company name<span className="required">*</span></Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="registerEmail">
            <Form.Label>Email<span className="required">*</span></Form.Label>
            <Form.Control
              type="registerEmail"
              value={registerEmail}
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
            Register
          </Button>
        </Form>
      </div>
    </div>
  );

  if(user === null) {
    return [loggedOut];
  } else {
    switch(user.type){
      case "COMPANY_ADMIN":
        window.location.href = process.env.REACT_APP_WEB_URL + "/manage-company";
        return [loggedIn];
      case "COMPANY_USER":
        window.location.href = process.env.REACT_APP_WEB_URL + "/user/suggestion";
        return [loggedIn];
      default:
        return [loggedOut];
    }
  }
}