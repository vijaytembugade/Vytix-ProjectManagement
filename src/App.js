import './App.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home/Home';
import About from './pages/about/About';
import OnlineUsers from './component/OnlineUsers';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Profile from './pages/profile/Profile';
function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path='/'>
                { !user && <Redirect to="/home" /> }
                { user && <Dashboard /> }
              </Route>
              <Route exact path='/create'>
                { !user && <Redirect to="/signup" /> }
                { user && <Create /> }
              </Route>
              <Route exact path='/project/:id'>
                { !user && <Redirect to="/signup" /> }
                { user && <Project /> }
              </Route>
              <Route exact path='/login'>
                { user && <Redirect to="/" /> }
                { !user && <Login /> }
              </Route>
              <Route exact path='/signup'>
                { user && <Redirect to="/" /> }
                { !user && <Signup /> }
              </Route>
              <Route exact path='/home'>
                <Home/>
              </Route>
              <Route exact path='/about'>
                <About/>
              </Route>
              <Route exact path='/reset-password'>
                <ForgotPassword/>
              </Route>
              <Route exact path='/profile'>
                {user && <Profile/>}
                {!user && <Signup/>}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      ) }
    </div>
  );
}

export default App
