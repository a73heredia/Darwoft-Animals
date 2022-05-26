import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (

    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/forgotPassword' component={ForgotPasswordScreen} />
          <Route exact path='/resetPassword' component={ResetPasswordScreen} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
