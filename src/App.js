import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
function App() {
const [datos,setDatos]=useState();
 async function traer(){  
  const data = await axios.get("https://gorest.co.in/public/v2/users").then(e=>{setDatos(e.data)}) 

}


useEffect(()=>{
  traer()
},[])
  return (
    <div className="App">
      <nav><p>No mucho que ver aqui, simple fetch a una api con react ;)</p></nav>


      <div className="body">
      {datos? datos.map(e=>{return <div className="card" key={e.id}> 
      
      <h4 key={e.id}>Nombre del usuario:</h4> <p>{e.name}</p><br/>
      <h4 key={e.id}>Mail de contacto del usuario:</h4><p>{e.email}</p><br/>
      <h4 key={e.id}>Genero del usuario:</h4><p>{e.gender}</p><br/>
      <h4 key={e.id}>Estado del usuario:</h4> <p>{e.status}</p>

      </div>}):<div className="loading"><p>Loading...</p></div>}
      </div>



    <footer><h3>Fin de la pagina</h3></footer>

    </div>
  );
}

export default App;
