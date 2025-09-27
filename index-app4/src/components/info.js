import Data1 from './data1'
import './info.css'
import Qrcode from '../components/qrcode'
import Slog from '../components/slogin'
function Info({}){
    return (
        <>
          <div className="Info">
           <div className="info_qrcode">
             <Qrcode></Qrcode>
             <Slog></Slog>
           </div>
         </div>
        </>
    );
}

export default Info;