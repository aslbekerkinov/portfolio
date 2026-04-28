import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Quote from './QouteApp'
import About from './pages/about'
import Cuntact from './pages/contact'
// import QuoteCard from './QouteCard.jsx'
function App() {
  // const About= () => <h2>Project</h2>
  // const Contact= () => <h2>
  
  // </h2>
  return(
    <BrowserRouter>
    <nav style={{padding:'20px',background:'#eee', margin:'15px' , marginTop:'0px'}} >
      <Link to="/Homepage" style={{textDecoration:'none',marginRight:'10px'}}>Bosh sahifa</Link>
      <Link to="/About" style={{marginRight:'10px',textDecoration:'none'}}>My project</Link>
      <Link to="/" style={{marginRight:'10px',textDecoration:'none'}}>Men haqimda</Link>
      <Link to="/contact" style={{marginRight:'10px',textDecoration:'none'}} >Aloqa</Link>
     </nav>
<div style={{padding:'20px'}}>
  <Routes>
    <Route path="/" element={<About />} />
    <Route path="/About" element={<Quote />} />
    <Route path="/contact" element={<Cuntact />} />
    <Route path="/Homepage" element={<HomePage />} />
  </Routes>
</div>
    </BrowserRouter>
  );
}
export default App