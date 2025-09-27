  import React, { useState, useEffect, useRef } from "react";
 import { Html5Qrcode } from "html5-qrcode";
 import { BrowserProvider } from "ethers";
 import { Link } from 'react-router-dom';
 import QRcode from './QRcode'
 import { useNavigate } from "react-router-dom"; 
 import "bootstrap/dist/css/bootstrap.min.css";
 import "bootstrap/dist/js/bootstrap.bundle.min.js";
 import "@fortawesome/fontawesome-free/css/all.min.css";
 
  function dashboard() {
   // Sample data
   const initialParticipants = [
     { name: "Raj Farmer", role: "Farmer", id: "0xFA1...", batches: ["BATCH-001", "BATCH-025"], last: "2025-09-20" },
     { name: "Kumar Distributor", role: "Distributor", id: "0xD12...", batches: ["BATCH-001"], last: "2025-09-21" },
     { name: "Anita Retailer", role: "Retailer", id: "0xR99...", batches: ["BATCH-025"], last: "2025-09-22" },
     { name: "LogiTrans Pvt", role: "Transporter", id: "0xT44...", batches: ["BATCH-001", "BATCH-010"], last: "2025-09-23" },
     { name: "Inspector", role: "Verifier", id: "0xV07...", batches: [], last: "2025-09-19" },
   ];
 
   const initialTransfers = [
     { batch: "BATCH-001", from: "Raj Farmer", to: "Kumar Distributor", time: "2025-09-21 10:12" },
     { batch: "BATCH-001", from: "Kumar Distributor", to: "LogiTrans Pvt", time: "2025-09-21 15:22" },
     { batch: "BATCH-025", from: "Raj Farmer", to: "Anita Retailer", time: "2025-09-22 11:02" },
   ];
 
   // States
   const [participants, setParticipants] = useState(initialParticipants);
   const [transfers] = useState(initialTransfers);
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState(initialParticipants);
   const [batchIdInput, setBatchIdInput] = useState("");
   const [batchProvenance, setBatchProvenance] = useState(null);
   const [qrScannerActive, setQrScannerActive] = useState(false);
   const [qrResultMessage, setQrResultMessage] = useState("");
   const [walletAddress, setWalletAddress] = useState(null);
   const [networkName, setNetworkName] = useState("Localhost");
 
   // QR Scanner ref
   const html5QrCodeRef = useRef(null);
   const qrRegionId = "qr-reader";
 
   // Modal ref for bootstrap modal control
   const qrModalRef = useRef(null);
 
   // Filter participants based on search
   const handleSearch = () => {
     const q = searchQuery.trim().toLowerCase();
     if (!q) {
       setSearchResults(participants);
       return;
     }
 
     const filtered = participants.filter(
       (p) =>
         p.name.toLowerCase().includes(q) ||
         p.role.toLowerCase().includes(q) ||
         p.id.toLowerCase().includes(q) ||
         p.batches.join(" ").toLowerCase().includes(q)
     );
     setSearchResults(filtered);
   };
 
   // Load batch provenance
   const loadBatchProvenance = (id) => {
     if (!id) {
       alert("Enter a Batch ID or paste the scanned QR payload");
       return;
     }
     const hist = transfers.filter((t) => t.batch.toLowerCase() === id.toLowerCase());
     setBatchProvenance({ batchId: id, provenance: hist });
   };
 
   // QR Scanner handlers
   const startQrScanner = async () => {
     if (!html5QrCodeRef.current) {
       html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
     }
 
     const config = { fps: 10, qrbox: { width: 250, height: 250 } };
 
     try {
       await html5QrCodeRef.current.start(
         { facingMode: "environment" },
         config,
         (qrCodeMessage) => {
           setQrResultMessage(`Scanned: ${qrCodeMessage}`);
           setBatchIdInput(qrCodeMessage);
           loadBatchProvenance(qrCodeMessage);
           stopQrScanner();
         }
       );
       setQrScannerActive(true);
     } catch (err) {
       console.error("QR start error", err);
       setQrResultMessage("Could not access camera. Try localhost or HTTPS.");
     }
   };
 
   const stopQrScanner = () => {
     if (html5QrCodeRef.current && qrScannerActive) {
       html5QrCodeRef.current
         .stop()
         .then(() => {
           html5QrCodeRef.current.clear();
           setQrScannerActive(false);
           setQrResultMessage("");
         })
         .catch(() => {
           // ignore errors
         });
     }
   };
 
   // Wallet connect using ethers.js
   const connectWallet = async () => {
   if (window.ethereum) {
     try {
       const provider = new BrowserProvider(window.ethereum);
       const accounts = await provider.send("eth_requestAccounts", []);
       const addr = accounts[0];
       setWalletAddress(addr);
       const net = await provider.getNetwork();
       setNetworkName(net.name || net.chainId);
     } catch (e) {
       console.error(e);
       alert("Wallet connection rejected");
     }
   } else {
     alert("No Web3 wallet found. Install MetaMask or use WalletConnect.");
   }
 };
 
   // Show modal and start scanner
   const openQrModal = () => {
     qrModalRef.current.show();
     startQrScanner();
   };
 
   // Cleanup on unmount to stop scanner
   useEffect(() => {
     return () => {
       stopQrScanner();
     };
   }, []);
 
   return (
     <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-success">
         <div className="container-fluid">
           <a className="navbar-brand" href="#">
             AgriChain
           </a>
           <div className="d-flex gap-2">
             <button onClick={connectWallet} className="btn btn-outline-light btn-sm">
               {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
             </button>
             <button className="btn btn-light btn-sm" onClick={() => (<QRcode></QRcode>)} >
               Scan QR 
             </button>
           </div>
         </div>
       </nav>
 
       <div className="container-fluid">
         <div className="row">
           {/* Sidebar */}
           <aside className="col-md-2 bg-white sidebar p-3 border-end" style={{ minHeight: "100vh" }}>
             <h6 className="mb-3">Dashboard</h6>
             <ul className="nav flex-column">
               <li className="nav-item">
                 <a className="nav-link active" href="#">
                   Overview
                 </a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" href="#transfers">
                   Transfers
                 </a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" href="#participants">
                   Participants
                 </a>
               </li>
               <li className="nav-item">
                 <a className="nav-link" href="#search-section">
                   Search
                 </a>
               </li>
             </ul>
             <hr />
             <div>
               <small className="small-muted">
                 Network: <span id="networkName">{networkName}</span>
               </small>
             </div>
           </aside>
 
           {/* Main */}
           <main className="col-md-10 p-4">
             <div className="row g-3 mb-3">
               <div className="col-md-3">
                 <div className="card card-compact shadow-sm p-3">
                   <div className="card-body">
                     <h6>Total Batches</h6>
                     <h3 id="totalBatches">128</h3>
                     <small className="small-muted">Updated 2 mins ago</small>
                   </div>
                 </div>
               </div>
               <div className="col-md-3">
                 <div className="card card-compact shadow-sm p-3">
                   <div className="card-body">
                     <h6>Active Shipments</h6>
                     <h3 id="activeShip">24</h3>
                     <small className="small-muted">In transit</small>
                   </div>
                 </div>
               </div>
               <div className="col-md-3">
                 <div className="card card-compact shadow-sm p-3">
                   <div className="card-body">
                     <h6>Validators</h6>
                     <h3 id="validators">5</h3>
                     <small className="small-muted">Nodes online</small>
                   </div>
                 </div>
               </div>
               <div className="col-md-3">
                 <div className="card card-compact shadow-sm p-3">
                   <div className="card-body">
                     <h6>Scans Today</h6>
                     <h3 id="scansToday">48</h3>
                     <small className="small-muted">QR & API scans</small>
                   </div>
                 </div>
               </div>
             </div>
 
             {/* Search / Intermediate persons */}
             <section id="search-section" className="mb-5">
               <div className="card shadow-sm">
                 <div className="card-header d-flex justify-content-between align-items-center">
                   <h6 className="mb-0">Search Intermediate Persons / Transfers</h6>
                   <div className="input-group w-50">
                     <input
                       id="searchInput"
                       type="text"
                       className="form-control"
                       placeholder="Search by name, role, address, batch id..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       onKeyDown={(e) => {
                         if (e.key === "Enter") handleSearch();
                       }}
                     />
                     <button id="searchBtn" className="btn btn-success" onClick={handleSearch}>
                       Search
                     </button>
                   </div>
                 </div>
                 <div className="card-body">
                   <div className="table-responsive">
                     <table id="participantsTable" className="table table-hover table-sm">
                       <thead>
                         <tr>
                           <th>Participant</th>
                           <th>Role</th>
                           <th>Wallet / ID</th>
                           <th>Associated Batches</th>
                           <th>Last Action</th>
                         </tr>
                       </thead>
                       <tbody>
                         {searchResults.length === 0 ? (
                           <tr>
                             <td colSpan="5" className="text-muted">
                               No results
                             </td>
                           </tr>
                         ) : (
                           searchResults.map((p, i) => (
                             <tr key={i}>
                               <td>{p.name}</td>
                               <td>{p.role}</td>
                               <td>
                                 <code>{p.id}</code>
                               </td>
                               <td>{p.batches.length ? p.batches.join(", ") : "-"}</td>
                               <td>{p.last}</td>
                             </tr>
                           ))
                         )}
                       </tbody>
                     </table>
                   </div>
                 </div>
               </div>
             </section>
 
             {/* Transfers / Timeline */}
             <section id="transfers" className="mb-5">
               <div className="card shadow-sm">
                 <div className="card-header">
                   <h6 className="mb-0">Recent Transfers</h6>
                 </div>
                 <div className="card-body">
                   <ul id="transferList" className="list-group list-group-flush">
                     {[...transfers].reverse().map((t, i) => (
                       <li key={i} className="list-group-item">
                         <strong>{t.batch}</strong> — {t.from} → {t.to}{" "}
                         <span className="small-muted float-end">{t.time}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             </section>
 
             {/* QR result / provenance */}
             <section id="qrResult" className="mb-5">
               <div className="card shadow-sm">
                 <div className="card-header d-flex justify-content-between">
                   <h6 className="mb-0">Scanned Item & Provenance</h6>
                   <small className="small-muted">Scan a QR to load on-chain history</small>
                 </div>
                 <div className="card-body">
                   <div id="provenanceContent">
                     {!batchProvenance ? (
                       <>
                         <p className="text-muted">
                           No batch scanned yet. Use the <strong>Scan QR</strong> button or paste a Batch ID below.
                         </p>
                         <div className="input-group mb-3 w-50">
                           <input
                             id="batchInput"
                             className="form-control"
                             placeholder="Paste Batch ID or CID"
                             value={batchIdInput}
                             onChange={(e) => setBatchIdInput(e.target.value)}
                             onKeyDown={(e) => {
                               if (e.key === "Enter") loadBatchProvenance(batchIdInput);
                             }}
                           />
                           <button
                             id="loadBatchBtn"
                             className="btn btn-outline-success"
                             onClick={() => loadBatchProvenance(batchIdInput)}
                           >
                             Load
                           </button>
                         </div>
                       </>
                     ) : (
                       <pre
                         id="batchJson"
                         className="bg-light p-3 rounded"
                         style={{ maxHeight: 300, overflow: "auto" }}
                       >
                         {JSON.stringify(batchProvenance, null, 2)}
                       </pre>
                     )}
                   </div>
                 </div>
               </div>
             </section>
           </main>
         </div>
       </div>
 
       {/* QR Modal */}
       <div
         className="modal fade"
         id="qrModal"
         tabIndex="-1"
         aria-hidden="true"
         data-bs-backdrop="static"
         data-bs-keyboard="false"
       >
         <div className="modal-dialog modal-lg modal-dialog-centered">
           <div className="modal-content">
             <div className="modal-header">
               <h5 className="modal-title">QR Scanner</h5>
               <button
                 type="button"
                 className="btn-close"
                 data-bs-dismiss="modal"
                 aria-label="Close"
                 onClick={() => {
                   stopQrScanner();
                   setQrResultMessage("");
                 }}
               ></button>
             </div>
             <div className="modal-body">
               <div id={qrRegionId} className="qr-preview mb-3" style={{ width: "100%", height: 300, background: "#000" }}></div>
               <p className="small-muted">Allow camera access. Works on HTTPS or localhost.</p>
               {qrResultMessage && (
                 <div
                   className={`alert ${
                     qrResultMessage.startsWith("Scanned") ? "alert-success" : "alert-danger"
                   }`}
                 >
                   {qrResultMessage}
                 </div>
               )}
             </div>
             <div className="modal-footer">
               <button
                 id="stopQr"
                 className="btn btn-secondary"
                 onClick={() => {
                   stopQrScanner();
                   setQrResultMessage("");
                 }}
               >
                 Stop
               </button>
               <button
                 type="button"
                 className="btn btn-primary"
                 data-bs-dismiss="modal"
                 onClick={() => {
                   stopQrScanner();
                   setQrResultMessage("");
                 }}
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 }
 
 export default dashboard;
 