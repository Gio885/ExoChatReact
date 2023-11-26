import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AREA_PERSONALE, CREA_GRUPPO, LISTA_CHAT_UTENTE, LOGIN_PAGE, REGISTER_PAGE, RUBRICA, VIDEO_CHAT_PAGE } from './utility/Route';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage';
import SideBar from './Component/SideBar';
import '../src/custom/App.css'
import ListChatPage from './Component/ListChatPage';
import ChatPage from './Component/ChatPage';
import Rubrica from './Component/Rubrica';
import CreateGruppo from './Component/CreateGruppo';
import ProfiloPersonale from './Component/ProfiloPersonale';
import { useState } from 'react';

function App() { 

  const [aggiornamentoForzato, setAggiornamentoForzato] = useState('')

  return (
    <>
      <BrowserRouter>
          <SideBar/>
        <Switch>

          <Route exact path={LOGIN_PAGE} component={() => <LoginPage />} />
          <Route exact path={REGISTER_PAGE} component={() => <RegisterPage />} />
          <Route exact path={LISTA_CHAT_UTENTE} component={() => <ListChatPage aggiornamento={aggiornamentoForzato} setAggiornamento = {setAggiornamentoForzato}/>} />  
          {/* <Route exact path={LISTA_CHAT_UTENTE} component={() => <ListaChat aggiornamento={aggiornamentoForzato} setAggiornamento = {setAggiornamentoForzato}/>} />     */}
          <Route exact path={RUBRICA} component={()=> <Rubrica aggiornamento={aggiornamentoForzato} setAggiornamento = {setAggiornamentoForzato} />}/>
          <Route exact path={CREA_GRUPPO} component={()=> <CreateGruppo/>}/>
          <Route exact path={AREA_PERSONALE} component={()=> <ProfiloPersonale/>}/>
          
        </Switch>

        {/* <ChatPage aggiornamento={aggiornamentoForzato} setAggiornamento = {setAggiornamentoForzato} /> */}


      </BrowserRouter>


    </>

  );
}

export default App;
