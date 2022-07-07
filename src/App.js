import './App.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import swal from 'sweetalert';
function App() {
const [datos,setDatos]=useState();
const [datosActuales,setDatosActuales]=useState();
const [data,setData]=useState();
 async function traer(){  
  await axios.get("https://backforproject.herokuapp.com/all").then(e=>{setDatos(e.data)}) 
   await axios.get("https://backforproject.herokuapp.com/all").then(e=>{setDatosActuales(e.data)}) 
   await axios.get("https://backforproject.herokuapp.com/all").then(e=>{setData(e.data)}) 
}


useEffect(()=>{
  traer()
},[])



async function statusHandler(e){
  var value=e.target.value
  if(e.target.value==="all"){
    
      
  traer()
    }
  else {
    var actual=data.filter(e=>{return e.status===value})
    setDatosActuales(actual)
    setDatos(actual)
     }
}



async function genderHandler(e){
  const genero=e.target.value
  if(e.target.value==="all"){
    
      
    const actual = datosActuales.filter(e=>{return e.gender===genero})
      }
      
    else{
      
      const actual = datosActuales.filter(e=>{return e.gender===genero})
      setDatos(actual)

    }
    }


    //AQUUI ABAJO PASAR LAS SIGUIENES FUCIUNOES A COMPOENTTIZAR
    const [form,setForm] =useState({
      name:"",
      gender:"",
      mail:"",
      status:""
    });
    //envio a backend
    async function formHandler(e){
      console.log(form);
      e.preventDefault();
      
      try{
        await axios.post("https://backforproject.herokuapp.com/new-users",form)
      }
      catch(err){console.log(err);}
      swal("Good job!", "Usuario añadido exitosamente!", "success");
      e.target.reset();


      var nuevo=[...datos,{
        name:form.name,
      gender:form.gender,
      mail:form.mail,
      status:form.status
      }]
      setDatos(nuevo);
    }



    //handlers inputs 
    function nameFormHandler(e){
        setForm({...form,name:e.target.value})
    }
    function genderFormHandler(e) {
        setForm({...form,gender:e.target.value})
    }
    function mailFormHandler(e){
        setForm({...form,mail:e.target.value})
    }
    function statusFormHandler(e) {
        setForm({...form,status:e.target.value})
    }

    //funcion a compoenttizar DELETE 
    async function deleteHandler(e){
      const id = e.target.value
      console.log(id)
      
      console.log(datos)
      swal({
        title: "Estas seguro?",
        text: "Una vez elimido el usuario se eliminará de la base de datos para siempre!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`https://backforproject.herokuapp.com/delete/${id}`)
          setDatos(datos.filter(data=>{return data.id != id}));
        
          swal("El usuario ha sido eliminado exitosamente!", {
            icon: "success",
          })
          
          ;
        } else {
          swal("Eliminación cancelada!");
        }
      });

      


     
      
    }
  return (
    <div className="App">
      <nav><p>Esta app hace una peticion a una Api que cree y desplegue en Heroku, realice 2 filtros de estado (activo/inactivo) y genero de la persona (masculino/femenino).<br/>
        Ambos filtros son endpoints, en caso de elegir opcion "ambos" solo usa el fetch principal alojado en el estado principal. <br/>
        <span className="importante" >Aclaracion: Estoy trabajando en guardar toda la informacion en una base de datos y asi poder editar la informacion
          como un CRUD <br/>
          Adicionalmente implentarle un sistema de registros/login <br/><br/>
          Ultima actualización 7 de julio 2022, realizada la conexion a la base de datos. Solo quedan los registros/login Espero añadir todo el(Lunes 11 de julio 2022)</span>
           </p>
           </nav>



<div className="formulario">
  <form onSubmit={formHandler}>
    <input type="text" placeholder="Escriba su nombre aqui" onChange={nameFormHandler}></input>
    <input type="mail" placeholder="Escriba su correo aqui" onChange={mailFormHandler}></input>
    
    <select onChange={genderFormHandler}>
    <option value="female" >Femenino</option>
    <option value="male" >Masculino</option>
    </select>
    <select onChange={statusFormHandler}>
    <option value="active">Activo</option>
    <option value="inactive">Inactivo</option>
    </select>
    {/*<input type="text" placeholder="Escriba su genero aqui" onChange={genderFormHandler}></input>
    
  <input type="text" placeholder="Escriba su estado aqui" onChange={statusFormHandler}></input> */}
    <button type="submit">Registrar</button>
  </form>
</div>





<div className="filtros">
  <div className="filtros-content">

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

</div>
</div>

      <div className="body">
      {datos? datos.map(e=>{return <div className="card" key={e.id}> 
      
      <h4 key={e.id}>Nombre del usuario:</h4> <p>{e.name}</p><br/>
      <h4 key={e.id}>Mail de contacto del usuario:</h4><p>{e.mail}</p><br/>
      <h4 key={e.id}>Genero del usuario:</h4><p>{e.gender}</p><br/>
      <h4 key={e.id}>Estado del usuario:</h4> <p>{e.status}</p>
      <button onClick={deleteHandler} value={e.id}>Eliminar</button>
      </div>}):<div className="loading"><p>Loading...</p></div>}
      </div>



    <footer><h3>Fin de la pagina</h3></footer>

    </div>
  );
}

export default App;
