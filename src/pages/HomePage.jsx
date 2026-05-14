import Rasm3 from'../assets/5397917646851870611.jpg'
import Rasm4 from'../assets/kasb.jpg'
import Rasm5 from'../assets/top.jpg'
import Rasm6 from'../assets/samolyot.jpg'
import Rasm2 from'../assets/it.jpg'
import Rasm from'../assets/email.jpg'
import Rasm7 from'../assets/facebook.jpg'
import Rasm8 from'../assets/ins.jpg'
import Rasm9 from'../assets/git.jpg'
import Rasm11 from'../assets/xx.jpg'
import Rasm0 from'../assets/tele.jpg'
import './homepage.css'
function HomePage(){
    return(
        <div id='Cant'>
            <div>  
                <img src={Rasm3} alt="preview" width="200"style={{borderRadius:'100px',left:'20px',}} />
            </div>
             <div style={{gap:'20px',justifyContent:'center'}}>
            <h1 style={{height:'50px',}} id='men2'> Men Erkinov Aslbek</h1>
            <h3>⚽ fueled by Futboll</h3>
            <h3>🌍 based in the Uzbekistan</h3>
            <h3>💼 frontend developer</h3>
            <h3>📧 aslbekerkinov15@gmail.com</h3>
          </div>
                  <div id='rasmm'>
                  <a href="https://www.instagram.com/erciinov"> <img src={Rasm8} style={{width:'40px',gap:'30px'}}></img> </a> 
                   <a href="https://www.github.com/aslbekerkinov"> <img src={Rasm9} style={{width:'80px',gap:'30px'}}></img></a>
                   <a href="https://www.web.telegram.org/erciinov"> <img src={Rasm0} style={{width:'40px',gap:'30px'}}></img></a>
                    <img src={Rasm7} style={{width:'40px',gap:'30px'}}></img>
                    <img src={Rasm11} style={{width:'40px'}}></img>  
                </div> 
             </div> 
    )
}
export default HomePage;