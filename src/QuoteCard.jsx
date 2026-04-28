function QuoteCard({muallif, matn}){
    const nusxalash=()=>{
        navigator.clipboard.writeText(`${matn}-${muallif}`)
        alert("Nusxalandi")
    }
 return(
    <div style={{
        borderLeft:'5px solid #61dafb',
        padding:'20px',
        margin:'20px 0',
        background:'#f9f9f9',
        borderRadius:'8px',
        boxShadow:'0 4px 8px rgb(0,0,0,0.1)'
    }}>
    <p style={{fontSize:'20px',fontStyle:'italic'}}>"{matn}"</p>
    <h4 style={{textAlign:'right',color:'#333'}}>-{muallif}</h4>
    <button onClick={nusxalash}>Nusxa olish</button>
    </div>
 );
}

export default QuoteCard;