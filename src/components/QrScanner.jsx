import React from "react";
import { useState, useRef } from "react";
// other previous imports
import * as htmlToImage from "html-to-image"
import QRCode from "react-qr-code";
import { Button, Input } from "@mui/material";

function QrScanner() {

  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };


  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };
  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        <div className="qrcode__input">
          <Input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button variant="contained" onClick={handleQrCodeGenerator}>Generate QR Code</Button>
        </div>
        {qrIsVisible && (
          <div className="qrcode__download">
            <div className="qrcode__image">
              <QRCode value={url} size={300} />
            </div>
            <Button variant="contained" onClick={downloadQRCode}>Download QR Code</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrScanner;
