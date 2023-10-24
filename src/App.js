import logo from './logo.svg';
import Inbox from './Components/Pages/Inbox';
import './App.css';
import Login from './Components/Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navigation/NavBar';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Signup from './Components/Pages/Signup';
import ComposeMail from './Components/Pages/ComposeMail';
import Sent from './Components/Pages/Sent';
function App() {
  return (
    <>
    
    <header>
    <NavBar></NavBar>
    </header>
     
    <Switch>
      <Route path="/inbox">
        <Inbox>
        </Inbox>
      </Route>
      <Route path="/sent">
        <Sent></Sent>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/composeEmail">
        <ComposeMail></ComposeMail>
      </Route>
      
    </Switch>

    </>

  );
}

export default App;
