import jwt from 'jsonwebtoken';

class JwtService {

    static generateToken(payload) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not configured');
        }

        return jwt.sign(payload, secret, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        });
    }

    static verifyToken(token) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not configured');
        }

        return jwt.verify(token, secret);
    }
}

export default JwtService;