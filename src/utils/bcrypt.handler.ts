import { hash, compare } from "bcryptjs";


const encrypt = (password:string ) => {
    const hashedPassword = hash(password,8)
    return hashedPassword
};

const verify = (password:string, hashedPassword:string) => {
    const isCorrect = compare(password, hashedPassword)
    return isCorrect
};

export { encrypt, verify };
