
function Color({id,r,g,b,borrarColor}){
    return (
        
        <li style={{backgroundColor : `rgb(${[r,g,b].join(",")})`}}
            onClick={() => borrarColor(id)}
            
            >{r},{g},{b}</li>
    )
}

export default Color