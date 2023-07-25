import { UserInterface } from "../../entities/user/userModel";
import { findUserByEmail } from "../../repositories/userRepository";
import { matchPassword } from "../../services/bycript";
import { generateAuthToken } from "../../middlewares/auth";


export interface LoginResponse {
    userData: UserInterface;
    token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        const isMatch = await matchPassword(password, existingUser.password);
        if (isMatch) {
            const token = generateAuthToken(existingUser);
            return { userData: existingUser, token };
        } else {
            throw new Error("Password Not Match");
        }
    }else{

        throw new Error("User not found hehehe");
    }
};