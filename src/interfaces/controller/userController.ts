import { Request, Response } from 'express'
import {createUser} from '../../usecase/userUseCase/createUser'
import {loginUser} from '../../usecase/userUseCase/loginUser'
import { LoginResponse } from '../../usecase/userUseCase/loginUser'
 import { findUser } from '../../usecase/userUseCase/finduser'
import { updateUser } from '../../usecase/userUseCase/updateUser'





export const userSignup = async (req: Request, res: Response) => {
    try {
        const { username, email, mobile, password } = req.body;
        const image = req.file?.filename;
        await createUser(username, email, mobile, password, image);
        res.status(201).send()
    } catch (error:any) {
        console.error(error)
        res.json({message:error.message})
    }
}

export const userLogin = async(req:Request,res:Response)=>{
    try {
        const email = req.query.email?.toString();
        const password = req.query.password?.toString();
        console.log(email,password,'these are the email and password')
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const response:LoginResponse = await loginUser(email,password)
        const {userData,token} = response
        res.json({userData,token})

    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const profile = async(req:Request,res:Response)=>{
    try {
        const email = req.query.email?.toString()
        console.log(email,'this is the email of profile apr');        
        if(!email){
            return res.status(400).json({ message: 'Somthing Error' });
        }
        const userData = await findUser(email)        
        res.json(userData)
    } catch (error:any) {
        throw new Error(error.message)      
    }
}

export const profileUpdate = async(req:Request,res:Response)=>{
    try {

        const {username,email,mobile} = req.body
        
        const image = req.file?.filename
        const userEmail = req.query.userEmail?.toString()
        
        if(!userEmail){
            return res.status(400).json({ message:'No email provided'});
        }
        const userData = await updateUser(username,email,mobile,image,userEmail)
        
        res.json(userData)
        
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}