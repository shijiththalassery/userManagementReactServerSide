import { adminLogin } from "../../usecase/adminUseCase/adminLogin";
import {Request,Response} from 'express'
import { getUsers } from "../../usecase/adminUseCase/getUsers";
import { getUpdateUser } from "../../usecase/adminUseCase/getUpdateUser";
import { UserInterface } from "../../entities/user/userModel";
import { adminUpdateUser } from "../../usecase/adminUseCase/updateUser";
import { adminDeleteUser } from "../../usecase/adminUseCase/deleteUser";

export const loginAdmin = async(req:Request,res:Response)=>{
    console.log('inside log in admin')
    try {
        console.log(req.body,'this data from admin login side')
        const {email,password} = req.body
        const adminData = await adminLogin(email,password)
        res.json(adminData)
    } catch (error) {
        throw new Error("Something error happened")
    }
}

export const loadDashboard = async(req:Request,res:Response)=>{
    console.log('inside dashboard')
    try{

        const userData = await getUsers()        
        res.json(userData)

    }catch(error){
        throw new Error("Sommething error happened");
        
    }
}

export const findUpdateUser = async(req:Request,res:Response)=>{
    try {

        const userId = req.params.id
        console.log(userId,"idddd");
        const userData = await getUpdateUser(userId)
        res.json(userData)
        
    } catch (error) {
        throw new Error("Sommething error happened");
    }
}

export const updateUser = async(req:Request,res:Response)=>{
    try {
        const {username,email,mobile} = req.body
        const image = req.file?.filename
        const response = await adminUpdateUser(username,email,mobile,image)
        res.json(response)
    } catch (error) {
        res.json({message:"Couldnt Update the User"})
    }
}

export const deleteUser = async(req:Request,res:Response)=>{
    try {
        
        const id=req.params.id
        const response = await adminDeleteUser(id)
        res.json(response)

    } catch (error) {
        res.json({message:"Couldnt delete the user"})
    }
}