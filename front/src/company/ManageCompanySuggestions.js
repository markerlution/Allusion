import './ManageCompanySuggestions.css';
import axios from "axios";
import React, { useState, useEffect } from "react";

function ManageCompanySuggestions() {

  const [data, setSuggestionData] = useState({});
  
  function handleDelete(id, event) {
    axios.delete(process.env.REACT_APP_API_URL + "/api/company/suggestions/" + id, { data: {} }).then(function(response) {
      setSuggestionData(response.data.userSuggestions);
    })
    .catch(function(error) {
      console.log(error);
    });
    
    event.preventDefault();
  }
  
  function handleThumbsDown(id, event) {
    axios.put(process.env.REACT_APP_API_URL + "/api/company/suggestions/" + id + '/rating/1', { data: {} }).then(function(response) {
      setSuggestionData(response.data.userSuggestions);
    })
    .catch(function(error) {
      console.log(error);
    });
    
    event.preventDefault();
  }
  
  function handleThumbsUp(id, event) {
    axios.put(process.env.REACT_APP_API_URL + "/api/company/suggestions/" + id + '/rating/2', { data: {} }).then(function(response) {
      setSuggestionData(response.data.userSuggestions);
    })
    .catch(function(error) {
      console.log(error);
    });
    
    event.preventDefault();
  }

  const getPayload = async () => {
    return await axios.get(process.env.REACT_APP_API_URL + "/api/company/suggestions");
  };

  useEffect(() => {
    let isMounted = true;
    getPayload().then(res => {
      if (isMounted && res.data.userSuggestions) { 
        setSuggestionData(res.data.userSuggestions);
      }
    })
    return () => { isMounted = false };
  }, []);


  return (
    <div className="App-ManageCompanyUsers">
      <h1>Manage company suggestions</h1>
      <div className="App-userTable">
        {Array.from(data).map(function(items) {
          let thumbs;
          switch(items.rating) {
            case 1:
                thumbs = (
                  <div>
                    <i className="fa fa-thumbs-down companySuggestionThumbsDown active" onClick={(e) => handleThumbsDown(items._id, e)}></i>
                    <i className="fa fa-thumbs-up companySuggestionThumbsUp" onClick={(e) => handleThumbsUp(items._id, e)}></i>
                  </div>
                );
              break;
            case 2:
                thumbs = (
                  <div>
                    <i className="fa fa-thumbs-down companySuggestionThumbsDown" onClick={(e) => handleThumbsDown(items._id, e)}></i>
                    <i className="fa fa-thumbs-up companySuggestionThumbsUp active" onClick={(e) => handleThumbsUp(items._id, e)}></i>
                  </div>
                );
              break;
              default:
              thumbs = (
                <div>
                  <i className="fa fa-thumbs-down companySuggestionThumbsDown" onClick={(e) => handleThumbsDown(items._id, e)}></i>
                  <i className="fa fa-thumbs-up companySuggestionThumbsUp" onClick={(e) => handleThumbsUp(items._id, e)}></i>
                </div>
              );

            break;
          }


          return ( 
            <div key={items._id} className="companySuggestionsTable">
                <div className="companySuggestion">{items.suggestion}</div>
                {thumbs}
                <div><i className="fa fa-trash companySuggestionTrash" onClick={(e) => handleDelete(items._id, e)}></i></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageCompanySuggestions;
