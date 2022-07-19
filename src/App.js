import { Link, Routes,Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Logines from "./components/logines.jsx"
import Registro  from './components/registro';

function App() {


  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<Logines />}></Route>
        <Route path="/register" element={<Registro/>}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
