import React, { useState } from "react";
import QRCode from "qrcode";
import { authenticator } from "otplib";
import { useAuth } from "../context/AuthContext";

const MFASetup: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { setMfaSecret } = useAuth();

  const setupMfa = () => {
    const secret = authenticator.generateSecret();
    setMfaSecret(secret);

    const otpauth = authenticator.keyuri("user@example.com", "YourApp", secret);
    QRCode.toDataURL(otpauth, (err, imageUrl) => {
      if (err) console.error(err);
      setQrCode(imageUrl);
    });
  };

  return (
    <div>
      <h1>Set up MFA</h1>
      <button onClick={setupMfa}>Generate MFA QR Code</button>
      {qrCode && <img src={qrCode} alt="Scan this QR code with your authenticator app" />}
    </div>
  );
};

export default MFASetup;
