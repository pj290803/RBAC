// src/components/GenerateMFA.tsx
import React, { useState } from 'react';

const GenerateMFA = () => {
    const [qrCode, setQrCode] = useState<string | null>(null);

    const generateMFA = async () => {
        const response = await fetch('http://localhost:3000/api/mfa/generate-mfa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setQrCode(data.qrCode);
    };

    return (
        <div>
            <button onClick={generateMFA}>Generate MFA</button>
            {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
    );
};

export default GenerateMFA;
