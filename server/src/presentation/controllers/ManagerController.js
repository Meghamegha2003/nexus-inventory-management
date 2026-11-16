class ManagerController {
    constructor(loginManager,registerManager) {
        this.loginManager = loginManager;
        this.registerManager = registerManager;

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const manager = await this.loginManager.execute({
                email,
                password
            })

            return res.status(200).json({
                success: true,
                message: "Manager login successful",
                data: manager
            })


        }
        catch (error) {
            console.error("Manager Login Error:", error);

            const statusCode =
                error.message === "Email and password are required"
                    ? 400
                    : error.message === "Your account is inactive"
                        ? 403
                        : error.message === "Invalid email or password"
                            ? 401
                            : 500;

            return res.status(statusCode).json({
                success: false,
                message: statusCode === 500
                    ? "Internal server error"
                    : error.message
            });
        }

    }


     async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            const manager = await this.registerManager.execute({
                name,
                email,
                password,
                confirmPassword
            });

            return res.status(201).json({
                success: true,
                message: "Manager registered successfully",
                data: manager
            });

        } catch (error) {
            console.error("Manager Registration Error:", error);

            const statusCode =
                error.message === "All fields are required" ||
                error.message === "Passwords do not match" ||
                error.message === "Password must be at least 8 characters" ? 400 :
                error.message === "Manager already exists" ? 409 : 500;

            return res.status(statusCode).json({
                success: false,
                message: statusCode === 500
                    ? "Internal server error"
                    : error.message
            });
        }
    }
}

export default ManagerController;