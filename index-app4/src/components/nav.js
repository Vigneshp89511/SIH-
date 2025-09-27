import logo from '../assets/logo2.jpg'
import video from '../assets/152740-803732906.mp4'
import Info from './info'
import './nav.css'
import { useState } from 'react';
function Nav(){
    var [j,setj] = useState(0);
    return (
        <>
         <div className="Nav">
            <div className="Nav_left">
               <img src={logo}></img>    
            </div>
            <div className="Nav_right">
                <h2 onClick={()=>setj(0)} >Home</h2>
                <h2 onClick={()=>setj(2)}>Contact Us</h2>
                <h2 onClick={()=>setj(3)}>Profile</h2>
            </div>
         </div>
           <div>
               <video className="Nav_background_vedio"  loop autoPlay muted playsInline >
                <source src={video} type="video/mp4" />
                </video>
           </div>
           <div className="Nav_only_left"></div>
        <Info id={j}></Info>
        </>
    );
}

export default Nav;