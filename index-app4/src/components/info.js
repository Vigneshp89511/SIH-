import Data1 from './data1'
import './info.css'
import Qrcode from '../components/qrcode'
function Info({}){
    return (
        <>
          <div className="Info">
           <div className="info_qrcode">
             <Qrcode></Qrcode>
           </div>
         </div>
        </>
    );
}

export default Info;