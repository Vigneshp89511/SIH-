import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { ethers } from "ethers";
import contract from "./contract.json";

const CONTRACT_ADDRESS = "0xaE036c65C649172b43ef7156b009c6221B596B8b";

export default function  QRcode() {
  const [details, setDetails] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      const parsed = JSON.parse(data);

      // Fetch from backend
      const res = await axios.get(`http://localhost:5000/produce/${parsed.produceId}`);

      // Fetch from blockchain
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contract, provider);
        const blockchainData = await contract.getProduce(parsed.produceId);

        setDetails({
          id: parsed.produceId,
          ...res.data,
          blockchain: {
            crop: blockchainData[0],
            quantity: blockchainData[1].toString(),
            date: blockchainData[2],
            farmer: blockchainData[3],
            stage: blockchainData[4],
          },
        });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Consumer - Scan QR</h2>
       
      {details && (
        <div className="mt-6 bg-gray-100 p-3 rounded">
          <h3 className="font-bold">Produce Details</h3>
          <p>ID: {details.id}</p>
          <p>Crop: {details.crop}</p>
          <p>Quantity: {details.quantity}</p>
          <p>Date: {details.date}</p>
          <p>Status: {details.status}</p>
          <p className="text-green-600">✔ Verified on Blockchain</p>
          <p><strong>Stage:</strong> {details.blockchain.stage}</p>
        </div>
      )}
    </div>
  );
}
