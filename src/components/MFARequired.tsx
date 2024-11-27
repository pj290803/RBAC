import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const MFARequired: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const { verifyMfa } = useAuth();

  const handleVerify = () => {
    if (verifyMfa(otp)) {
      alert("MFA Verified!");
    } else {
      alert("Invalid MFA Code!");
    }
  };

  return (
    <div>
      <h1>MFA Required</h1>
      <input
        type="text"
        placeholder="Enter MFA Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default MFARequired;
