import logo from './logo.svg';
import './App.css';
import Login from './Components/Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navigation/NavBar';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Signup from './Components/Pages/Signup';
function App() {
  return (
    <>
    <header>
    <NavBar></NavBar>
    </header>

    <Switch>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
    </Switch>

    </>

  );
}

export default App;
