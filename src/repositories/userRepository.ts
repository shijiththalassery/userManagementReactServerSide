import userModel from '../entities/user/userModel'
import userMode , {UserInterface} from '../entities/user/userModel'



export const saveUser = async (
    username:String,
    email:String,
    mobile:String,
    password:String,
    image:any
):Promise<UserInterface> => {
    const user = new userModel ({username, email, mobile, password, image, });
    return await user.save()
};


export const findUserByEmail = async (email:String):Promise<UserInterface | null > =>{
    console.log(email,'checking email in data base')
    const userData = await userModel.findOne ({email})
    console.log(userData,'user data is here ')
    return userData;
}

export const updateOne = async (
    username: string,
    email: string,
    mobile: string,
    image: any
): Promise<UserInterface | null> => {
    const userData = await userModel.findOneAndUpdate(
        { email },
        {
            $set: {
                username,
                email,
                mobile,
                image,
            },
        },
        { new: true }
    );
    return userData;
};

export const deleteOne = async(_id:string):Promise<UserInterface | object>=>{
    const response = await userModel.findByIdAndDelete(_id)
    if(response){
        return response
    }else{
        return ({message:"User not found"})
    }
}
