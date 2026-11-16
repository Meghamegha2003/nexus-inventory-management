import bcrypt from "bcrypt";

class RegisterManager { 
    constructor(managerRepo){
        this.managerRepo = managerRepo
    }

    async execute({name,email,password,confirmPassword }){
        if(!name || !email || !password || !confirmPassword){
            throw new Error("All fields are required");
        }

         if (password.length < 8) {
            throw new Error("Password must be at least 8 characters");
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

         const proMail = email.trim().toLowerCase()
         const isMailExist = await this.managerRepo.findByEmail(proMail)

         if(isMailExist){
            throw new Error("Manager already exists");
         }

         const hashedPassword = await bcrypt.hash(password, 10);

        const manager = await this.managerRepo.create({
            name: name.trim(),
            email: proMail,
            password: hashedPassword,
            role: "manager"
        });

         return {
            id: manager.id,
            name: manager.name,
            email: manager.email,
            role: manager.role
        };
    }
}

export default RegisterManager
