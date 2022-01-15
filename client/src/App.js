import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home';
import Createform from './components/createActivitis/createform';
import Detalles from './components/detallesPais/detalle';
import Acerca from './components/acerca/acerca'

function App() {


  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path= "/" element= {<LandingPage />}></Route> 
          <Route path= "/home" element= {<Home />}></Route>  
          <Route path= "/activities" element= {<Createform />}></Route>
          <Route path= "/detalles/:id" element= {<Detalles />}></Route>  
          <Route path= "/acerca/" element= {<Acerca />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;


