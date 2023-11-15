
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LOGIN_PAGE, REGISTER_PAGE } from './utility/Route';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage';
import SideBar from './Component/SideBar';
import '../src/custom/App.css'

function App() {
  return (
    <>
      <BrowserRouter>
          <SideBar/>
        <Switch>

          <Route exact path={LOGIN_PAGE} component={() => <LoginPage />} />
          <Route exact path={REGISTER_PAGE} component={() => <RegisterPage />} />

        </Switch>

      </BrowserRouter>


    </>

  );
}

export default App;
