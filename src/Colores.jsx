import {useState, useEffect} from 'react'
import Formulario from './Formulario.jsx'
import Color from './Color.jsx'

function Colores() {
  
  let [colores,setColores] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/colores")
    .then(respuesta => respuesta.json())
    .then(respuesta => {
      setColores(respuesta)
    })
    
  }, [])// llamadas iniciales a las APIs

  function borrarColor(id){
    fetch(`http://localhost:4000/borrar/${id}`,{
      method : "DELETE"
    })
    .then(respuesta => respuesta.json())
    .then(({resultado}) =>{ 
      if(resultado == "ok"){
        return setColores(colores.filter(color => color.id != id))
      }
      console.log("error")
    } 
    )
  }

  function crearColor(color){
    setColores([...colores,color]) //un array con todos los valores que tenía y le añade el último
  }
  return (
    <>
      <Formulario crearColor={crearColor}/>
      <ul>
        {colores.map(({id,r,g,b})=> <Color  key={id} id={id} r={r} g={g} b={b} borrarColor={borrarColor}/>)}
      </ul>
     
    </>
  )
  

}

export default Colores
