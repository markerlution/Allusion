import './CompanyUserSuggestion.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CompanyUserSuggestion() {

  const [data, setUserData] = useState({});
  const [suggestion, setSuggestion] = useState("");

  function validateForm() {
    return suggestion.length > 0;
  }
  
  function handleSubmit(event) {

    let body = {
      suggestion: suggestion
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/api/user/suggestion", body)
      .then(function(response) {
        setUserData(response.data.userSuggestions);
        setSuggestion("");
      })
      .catch(function(error) {
          console.log(error);
      });

    event.preventDefault();
  }

  const getPayload = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/api/user/suggestion");
    setUserData(response.data.userSuggestions);
  };

  useEffect(() => {
    getPayload();
  }, []);

  const addSuggestion = (
    <div className="App-userSuggestion">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="suggestion">
          <Form.Label>Suggestion<span className="required">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows="8"
            autoFocus
            type="textarea"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </Form.Group>        
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Suggest
        </Button>
      </Form>
    </div>
  );

  return (
    <div className="App-CompanyUserSuggestion">
      <h1>Make a suggestion</h1>
      {addSuggestion}
      <div className="App-userTable">
        {Array.from(data).map(function(items) {
          let thumbs;
          switch(items.rating) {
            case 1:
                thumbs = (
                  <div>
                    <i className="fa fa-thumbs-down companySuggestionThumbsDown"></i>
                  </div>
                );
              break;
            case 2:
                thumbs = (
                  <div>
                    <i className="fa fa-thumbs-up companySuggestionThumbsUp"></i>
                  </div>
                );
              break;
              default:
              thumbs = (
                <div>
                  <i className="fa fa-question-circle companySuggestionUnrated"></i>
                </div>
              );

            break;
          }

          return ( 
            <div key={items._id} className="userSuggestionsTable">
                <div className="userSuggestion">{items.suggestion}</div>
                {thumbs}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CompanyUserSuggestion;
