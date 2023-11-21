
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LISTA_CHAT_UTENTE, LOGIN_PAGE, REGISTER_PAGE, RUBRICA } from './utility/Route';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage';
import SideBar from './Component/SideBar';
import '../src/custom/App.css'
import ListaChat from './Component/ListaChat';
import ChatPage from './Component/ChatPage';
import Rubrica from './Component/Rubrica';
import { useState } from 'react';

function App() {

  const [destinatarioChatPage, setDestinatarioChatPage] = useState()

  return (
    <>
      <BrowserRouter>
          <SideBar/>
        <Switch>

          <Route exact path={LOGIN_PAGE} component={() => <LoginPage />} />
          <Route exact path={REGISTER_PAGE} component={() => <RegisterPage />} />
          <Route exact path={LISTA_CHAT_UTENTE} component={() => <ListaChat />} />    
          <Route exact path={RUBRICA} component={()=> <Rubrica setDestinatarioChat={setDestinatarioChatPage}/>}/>
        </Switch>

        <ChatPage destinatarioChat={destinatarioChatPage} setDestinatarioChat={setDestinatarioChatPage}  />


      </BrowserRouter>


    </>

  );
}

export default App;
