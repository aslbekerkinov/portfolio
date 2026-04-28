import './App.css'
// import QuoteCard from 'QuoteCard'
import QuoteCard from './QuoteCard';
import { useState,useEffect } from 'react'
    function Quote() {
  const [quote, setQuote] = useState(null);
 const[loading,setLoading]=useState(true);
 const[error,setError]=useState(null)

 const getNewQoute=async() => {
  setLoading(true);
  setError(null);
  try{
    const res = await fetch('https://dummyjson.com/quotes/random');
    const date = await res.json();
  
  setQuote({
    content: date.quote,
    author:date.author
  })
  }catch(err){
    setError("Malumot yuklashda xatolik yuz berdi!")
    console.error("Xatolik tafsiloti",err)
  }
  setLoading(false);
 };
 useEffect(()=>{
  getNewQoute();

 },[]);
//  useEffect(()=>{
//   if(quote){
//   const ranglar=['#1abc9c','#e74c3c','#9b59b6','#f1c40f','#e67e22','#e74c3c']
//   const tasodifiyrang=ranglar[Math.floor(Math.random()*ranglar.length)]
//   document.body.style.backgroundColor=tasodifiyrang;
//   document.body.style.transition='0.5s'
//   }
//  },[quote])
  return (
      <div style={{maxWidth:'600px',margin:'50px auto',textAlign:'center'}}>
        <h1>Kun Hikmati</h1>
        {loading && <p>Yuklanmaqda...</p>  }
        {error && <p style={{color:'red'}}>{error}</p> }
        {!loading && !error && quote &&(
          <QuoteCard  matn={quote.content}muallif={quote.author}/>
        )}
        
        <button onClick={getNewQoute}style={{marginTop:'20px',padding:'10px',margin:'10px'}}>
          Yangi hikmat
        </button>
      </div>
  );
}
export default Quote

