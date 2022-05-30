import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import DeleteUserScreen from "./components/screens/DeleteUserScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Landing from './components/screens/Landing';
import Details from "./components/screens/Details";
import Cart from "./components/screens/Cart";
const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path='/' component={Landing} />
          <PrivateRoute exact path="/home" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
          <PrivateRoute path="/detail/:id" component={Details} />
          <PrivateRoute path='/cart' component={Cart} />
          <PrivateRoute path='/delete' component={DeleteUserScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;