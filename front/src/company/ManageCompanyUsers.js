import './ManageCompanyUsers.css';
import * as axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ManageCompanyUsers() {

  const [data, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse( localStorage.getItem('user') ) ;
  
  function compare( a, b ) {
    if ( a.email < b.email ){
      return -1;
    }
    
    if ( a.email > b.email ){
      return 1;
    }

    return 0;
  }

  function handleDelete(id, event) {
    axios.delete(process.env.REACT_APP_API_URL + "/api/company/user/" + id, { data: {} }).then(function(response) {
      response.data.companyUsers.sort( compare );
      setUserData(response.data.companyUsers);
    })
    .catch(function(error) {
      console.log(error);
    });
    
    event.preventDefault();
  }

  function validateForm() {
    if (data) {
      for(var i = 0; i < data.length; i++) {
          if (data[i].email === email) {
              return false;
          }
      }
    }

    return email.length > 0 && password.length > 0;
  }
  
  function handleSubmit(event) {

    let body = {
      email: email,
      password: password
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/company/user", body)
      .then(function(response) {
        response.data.companyUsers.sort( compare );
        setUserData(response.data.companyUsers);
      })
      .catch(function(error) {
          console.log(error);
      });

    event.preventDefault();

  }

  const addUser = (
    <div className="App-Login">
      <Form onSubmit={handleSubmit}>
        <div className="App-FormGroup">
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email<span className="required">*</span></Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>        
        </div>
        <div className="App-FormGroup">
          <Form.Group className="App-FormGroup" size="lg" controlId="password">
            <Form.Label>Password<span className="required">*</span></Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Add user
        </Button>
      </Form>
    </div>
  );

  const getPayload = async () => {
    return await axios.get(process.env.REACT_APP_API_URL + "/api/company/user");
  };

  useEffect(() => {
    let isMounted = true;
    getPayload().then(res => {
      if (isMounted && res.data.companyUsers) { 
        res.data.companyUsers.sort( compare );
        setUserData(res.data.companyUsers);
      }
    })
    return () => { isMounted = false };
  }, []);


  return (
    <div className="App-ManageCompanyUsers">
      <h1>Manage company users</h1>
      {addUser}
      <div className="App-userTable">
        {Array.from(data).map(function(companyUser) {
          if(companyUser._id === user.id) {
            return null;
          }
          return ( 
            <div key={companyUser._id} className="companyUsersTable">
                <div className="companyUsersEmail">{companyUser.email}</div>
                <div><i className="fa fa-trash companyUserTrash" onClick={(e) => handleDelete(companyUser._id, e)}></i></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageCompanyUsers;
