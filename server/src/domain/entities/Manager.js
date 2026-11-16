class Manager {
    constructor({
        id,
        name,
        email,
        password,
        role = 'Manager',
        isActive = true,
    }){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
    }
}

export default Manager