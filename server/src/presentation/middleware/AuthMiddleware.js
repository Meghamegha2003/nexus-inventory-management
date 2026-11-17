import JwtService from '../../infrastructure/security/JwtService.js';

const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Token required.'
            });
        }

        const token = authHeader.slice(7).trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. Token required.'
            });
        }

        const decoded = JwtService.verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export default AuthMiddleware;