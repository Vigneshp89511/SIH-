// QRScanner.js
import React, { useRef, useEffect, useState } from 'react';
import './qrcode.css'
import qrc from '../assets/1838579-200.png'
function QRcode(){
    return (
    <div className="qrcode">
      <h2 className='info-heading'>QR Code Scanner</h2>
      <small>Scan QR codes to track produce through the supply chain</small>
      <img src={qrc} width={"100px"}></img>
      <div className='startcam'><h1>Start Camera scanner</h1></div>
      <div>
        <span>or enter product ID manually</span>
        <input type="text"></input>
      </div>
      <button>Track Product</button>
    </div>
  );
};

export default QRcode;
