import './Home.css';
import { Link } from "react-router-dom";

function Home() {
  let getStartedLink;
  const user = JSON.parse( localStorage.getItem('user') ) ;

  switch(user ? user.type ?? null : null){
    case 'COMPANY_ADMIN':
      getStartedLink = (<Link className="link" to="/manage-company/suggestions">Get started &gt;</Link>)
    break;
    case 'COMPANY_USER':
      getStartedLink = (<Link className="link" to="/user/suggestion">Get started &gt;</Link>)
    break;
    default:
      getStartedLink = (<Link className="link" to="/register">Get started &gt;</Link>)
      break;
  }

  return (
    <div className="App-Home">
      <h1>What is it?</h1>
      <div className="intro-text">Allusion a is digital suggestion box, built to encourage members of your company to submit suggestions, comments and complaints anonymously.</div>
      <div className="get-started-container">
        {getStartedLink}
      </div>
    </div>
  );
}

export default Home;
