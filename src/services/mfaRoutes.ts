// services/mfaRoutes.ts
import express from 'express';
import { generateMFA, verifyMFA } from './mfaService';

const router = express.Router();

// Route to generate MFA
router.post('/generate-mfa', async (req, res) => {
    try {
        const result = await generateMFA();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error generating MFA' });
    }
});

// Route to verify MFA
router.post('/verify-mfa', (req, res) => {
    const { token, secret } = req.body;
    const isVerified = verifyMFA(token, secret);

    if (isVerified) {
        res.status(200).send('MFA Verified');
    } else {
        res.status(401).send('Invalid MFA token');
    }
});

export default router;
    