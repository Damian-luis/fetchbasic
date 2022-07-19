import React from "react";

export default function Registro(){
    return <div>
        <h2>Registrese para poder acceder a la base de datos</h2>
        <form>
    <input type="text" placeholder="Por favor ingrese su usuario"></input>
    <input type="text" placeholder="Por favor ingrese su contraseña"></input>
    <button type="submit">Registrarse</button>
   
  </form>
    </div>
}