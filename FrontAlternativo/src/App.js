import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Nuevo from './componentes/Nuevo/Nuevo';
import Invitados from './componentes/invitados/Invitados';
import Buscar from './componentes/buscar/Buscar';




function App() {
  return (
    
      <Router> 
            
            <Switch>
              <Route exact path="/" component={Nuevo} />
              <Route exact path="/listado" component={Invitados} />
              <Route exact path="/buscar" component={Buscar} />
             

            </Switch>
          
      </Router>

    
  );
}

export default App;
