import {useState} from 'react'

function Formulario({crearColor}) {

    let [textoInput,setTextoInput] = useState("")
    let [error,setError] = useState(false)
    let [mensajeError, setMensajeError] = useState("")

    return (
      <>
        <form onSubmit={evento =>{
          evento.preventDefault()

          setError(false)

          let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoInput)

          if(valido){
            
            let [r,g,b] = textoInput.split(",").map(n => Number(n)); // crea tres variables desestructuradas  rompemos el string con las comas y lo convertimos en un numero

            [r,g,b].forEach(n => valido = valido && n <= 255)

            if(valido){
              return fetch("https://app-colores.onrender.com/colores/nuevo",{
                method : "POST",
                body : JSON.stringify({r,g,b}),
                headers : {
                  "Content-type" : "application/json"
                }
              })
              .then(respuesta => respuesta.json())
              .then(({error,id}) => {
                if(!error){
                  crearColor({id,r,g,b})
                  return setTextoInput("")                  
                }
                console.log("error al usuario")
              }
              )
              
            }
            setMensajeError("Introduce un número entre 0 y 255")
            return setError(true)
          }
          setMensajeError("Formato inválido")
          setError(true)

        }}>
            <input type="text" placeholder="rrr,ggg,bbb" value={textoInput} onChange={evento => setTextoInput(evento.target.value)}/>
            <p className={`error ${error ? "visible" : ""}`}>{mensajeError}</p>
            <input type="submit" value="crear color" />
        </form>
       
      </>
    )
  }

  export default Formulario
  // regex: (es un grupo de 3 números entre 0 y 9) entre 1 y 3 caracteres, que se hace dos veces separados por una coma, y luego uno más 

          
