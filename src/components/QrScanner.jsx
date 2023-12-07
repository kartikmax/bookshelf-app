import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
import { Button } from "@mui/material";

function QrScanner({ url }) {
  const qrCodeRef = useRef(null);

  // Use state to handle visibility
  const [qrIsVisible, setQrIsVisible] = useState(false);

  useEffect(() => {
    // Set visibility to true when the URL is provided
    if (url) {
      setQrIsVisible(true);
    }
  }, [url]);

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

  return (
    <div className="qrcode__container">
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        {qrIsVisible && (
          <div className="qrcode__download">
            <div className="qrcode__image">
              {/* Display QR code */}
              <QRCode value={url} size={300} />
            </div>
            <Button variant="contained" onClick={downloadQRCode}>
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrScanner;
