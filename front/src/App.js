import './App.css';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';
import LogoutUser from './user/LogoutUser';
import Home from './home/Home';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ManageCompanySuggestions from './company/ManageCompanySuggestions'
import ManageCompanyUsers from './company/ManageCompanyUsers'
import CompanyUserSuggestion from './companyUser/CompanyUserSuggestion'
import uuid from 'react-uuid'

function App() {
  const user = JSON.parse( localStorage.getItem('user') ) ;
  const logo = (<div  className="App-logo-container"><div  className="App-logo"><Link className="logoLink" to="/">Allusion</Link></div></div>)
  const slogan = (<div className="App-slogan">The suggestion box solution</div>)
  const loginLink = (<Link className="link" to="/login">Login</Link>)
  const logoutLink = (<Link className="link" to="/logout">Logout</Link>)
  
  let render
  
  switch(user ? user.type ?? null : null){
    case "COMPANY_ADMIN":
      render = (
        <div className="App">
          <Router>
            <header className="App-header">
              {logo}
              {slogan}
              <nav className="App-nav">
                <Link className="link" to="/manage-company/users">Users</Link> | 
                <Link className="link" to="/manage-company/suggestions">Suggestions</Link> | {logoutLink}
              </nav>
            </header>
            <main className="App-mainContent">
              <Route exact path="/" render={props => <Home key={uuid()} /> } />
              <Route exact path="/manage-company/suggestions" render={props => <ManageCompanySuggestions key={uuid()} /> } />
              <Route exact path="/manage-company/users" render={props => <ManageCompanyUsers key={uuid()} /> } />
              <Route exact path="/logout" render={props => <LogoutUser key={uuid()} /> } />
            </main>
          </Router>
        </div>
      );  
      break;
      case "COMPANY_USER":
        render = (
          <div className="App">
            <Router>
              <header className="App-header">
                {logo}
                {slogan}
                <nav className="App-nav">
                  <Link className="link" to="/user/suggestion">Suggest</Link> | {logoutLink}
                </nav>
              </header>
              <main className="App-mainContent">
                <Route exact path="/" render={props => <Home key={uuid()} /> } />
                <Route exact path="/user/suggestion" render={props => <CompanyUserSuggestion key={uuid()} /> } />
                <Route exact path="/logout" render={props => <LogoutUser key={uuid()} /> } />
              </main>
            </Router>
          </div>
        );
      break;
      default:
        render = (
          <div className="App">
            <Router>
              <header className="App-header">
                {logo}
                {slogan}
                <nav className="App-nav">
                  <Link className="link" to="/register">Register</Link> | {loginLink}
                </nav>
              </header>
              <main className="App-mainContent">
                <Route exact path="/" render={props => <Home key={uuid()} /> } />
                <Route exact path="/register" render={props => <RegisterUser key={uuid()} /> } />
                <Route exact path="/login" render={props => <LoginUser key={uuid()} /> } />
              </main>
            </Router>
          </div>
        );
      break;
    }

  return [render];
}

export default App;
