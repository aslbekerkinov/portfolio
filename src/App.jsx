import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Quote from './QouteApp'
import About from './pages/about'
import Cuntact from './pages/contact'
import CoutryList from './pages/Api'
import CurrencyConverter from './pages/Canvertor'
import MovieSearch from './pages/api2'
import LiveInput from './pages/live'
import Traslete from'./pages/api3'
import Books from './pages/books'
import cars from './pages/car'
import CarSearch from './pages/car'
import Chat from './pages/chat'
function App() {
  return(   
    <BrowserRouter>
    <nav style={{padding:'20px',background:'#eee', margin:'15px' , marginTop:'0px',gap:'300px'}} >
      <Link to="/Homepage" style={{textDecoration:'none',marginRight:'10px'}}>Bosh sahifa</Link>
      <Link to="/About" style={{marginRight:'10px',textDecoration:'none'}}>My project</Link>
      <Link to="/" style={{marginRight:'10px',textDecoration:'none'}}>Men haqimda</Link>
      <Link to="/contact" style={{marginRight:'10px',textDecoration:'none'}} >Aloqa</Link>
      <Link to="/country" style={{marginRight:'10px',textDecoration:'none'}} >Davlatlar</Link>
       <Link to="/CurrencyConverter" style={{marginRight:'10px',textDecoration:'none'}} >Valyutalar</Link>
      <Link to="/moviesearch" style={{marginRight:'10px',textDecoration:'none'}} >Movie </Link>
      <Link to="/live" style={{marginRight:'10px',textDecoration:'none'}} >LiveInput </Link>
     <Link to="/traslete" style={{marginRight:'10px',textDecoration:'none'}} >Traslete </Link>
     <Link to="/book" style={{marginRight:'10px',textDecoration:'none'}} >Books </Link>
     <Link to="/chat" style={{marginRight:'10px',textDecoration:'none'}} >chat </Link>

     </nav>
<div style={{padding:'20px'}}>
  <Routes>
    <Route path="/" element={<About />} />
    <Route path="/About" element={<Quote />} />
    <Route path="/contact" element={<Cuntact />} />
    <Route path="/Homepage" element={<HomePage />} />
    <Route path="/country" element={<CoutryList />} />
    <Route path="/CurrencyConverter" element={<CurrencyConverter />} />
    <Route path="/moviesearch" element={<MovieSearch />} />
    <Route path="/live" element={<LiveInput />} />
    <Route path="/traslete" element={<Traslete />} />
    <Route path="/book" element={<Books />} />
   <Route path="/chat" element={<Chat />} />
   {/* <Route path="/chat" element={<Chat />} /> */}

  </Routes>
</div>
    </BrowserRouter>
  );
}
export default App