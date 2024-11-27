// services/mfaService.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Function to generate MFA secret and QR code
export const generateMFA = async (): Promise<any> => {
    const secret = speakeasy.generateSecret({ name: "VRV-Security" });
    const qrCode = await QRCode.toDataURL(secret.otpauth_url);
    return { secret: secret.base32, qrCode };
};

// Function to verify MFA
export const verifyMFA = (token: string, secret: string): boolean => {
    const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
    });
    return verified;
};
