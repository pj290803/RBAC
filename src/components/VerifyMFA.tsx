// src/components/VerifyMFA.tsx
import React, { useState } from 'react';

const VerifyMFA = () => {
    const [token, setToken] = useState('');
    const [secret, setSecret] = useState('');
    const [message, setMessage] = useState('');

    const verifyMFA = async () => {
        const response = await fetch('http://localhost:3000/api/mfa/verify-mfa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, secret }),
        });

        const result = await response.text();
        setMessage(result);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter OTP"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
            />
            <button onClick={verifyMFA}>Verify MFA</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyMFA;
