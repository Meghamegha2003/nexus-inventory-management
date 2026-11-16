import bcrypt from "bcrypt";

class LoginManager {
    constructor(managerRepo){
        this.managerRepo = managerRepo
    }

    async execute({email,password}){
        if(!email || !password){
            throw new Error("Email and password are required")
        }

        const manager = await this.managerRepo.findByEmail(email.trim().toLowerCase())
        if(!manager){
            throw new Error("Invalid email or password")
        }

        if(!manager.isActive){
            throw new Error("Your account is inactive")
        }

        const isPasswordMatch = await bcrypt.compare(password,manager.password)

        if(!isPasswordMatch){
            throw new Error("Invalid email or password")
        }

        return {
            id : manager.id,
            name : manager.name,
            email : manager.email,
            role : manager.role
        }
    }
}

export default LoginManager