
const ValidateManager = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters"
        });
    }

    if (!confirmPassword || password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }

    next();
};

export default ValidateManager;
