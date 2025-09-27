import Data from './data'
import Arrow from '../assets/images.png'
import "./player.css"
import { useState } from 'react';
function Player(){
    var [i,seti] = useState(0);
    return(
        <>
        <div className="Player">
          
                <>
                <img src={Data[i]} key={i} className="Player_img"></img>
                <img className='Player_left' src={Arrow} onClick={()=> i>-1?seti(i=i-1):seti(8)}></img><img className='Player_right' src={Arrow}onClick={()=> i<8?seti(i=i+1):seti(0)}></img>
                </>
         
        </div>
        </>
    );
}

export default Player;