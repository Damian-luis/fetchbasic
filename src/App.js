import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
function App() {
const [datos,setDatos]=useState();
 async function traer(){  
  const data = await axios.get("https://backforproject.herokuapp.com/users").then(e=>{setDatos(e.data)}) 

}


useEffect(()=>{
  traer()
},[])
function statusHandler(e){
  if(e.target.value=="all"){
    const data = axios.get("https://backforproject.herokuapp.com/users").then(e=>{setDatos(e.data)}) 
  }
  const data =  axios.get(`https://backforproject.herokuapp.com/users/status/${e.target.value}`).then(e=>{setDatos(e.data)}) 
}
function genderHandler(e){
  const data =  axios.get(`https://backforproject.herokuapp.com/users/gender/${e.target.value}`).then(e=>{setDatos(e.data)}) 
}


  return (
    <div className="App">
      <nav><p>No mucho que ver aqui, simple fetch a una api con react ;)</p></nav>

<select onChange={statusHandler}>
  <option value="all">Todos</option>
  <option value="active" >Acivo</option>
  <option value="inactive" >Inactivo</option>
</select>
<select onChange={genderHandler}>
  <option value="all">Ambos</option>
  <option value="female">Femenino</option>
  <option value="male">Masculino</option>
</select>
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
