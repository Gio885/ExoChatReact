
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LOGIN_PAGE } from './utility/Route';
import LoginPage from './Component/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>

        <Switch>

          <Route exact path={LOGIN_PAGE} component={() => <LoginPage />} />

        </Switch>

      </BrowserRouter>


    </>

  );
}

export default App;
