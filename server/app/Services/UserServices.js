import UserModel from "../models/UsersModel/UserModel.js";
import ProfilesModel from "../models/UsersModel/UserProfiles.js";
import { EmailSend } from "../utility/EmailSender.js";
import { TokenEncode } from "../utility/TokenHelper.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


export const UserOTPService = async (req) => {

    try {

        const email = req.params.email;
        const code = Math.floor(100000 + Math.random() * 900000);
        const EmailSub = `User Login OTP Verification`
        const EmailText = ``
        const EmailHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Login Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            color: #4CAF50;
            font-size: 24px;
        }
        .otp {
            font-size: 24px;
            color: #4CAF50;
            font-weight: bold;
            text-align: center;
            padding: 20px 0;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to MERN-SHOP</h1>
        </div>
        <div class="message">
            <p>Use the following OTP to complete your login:</p>
        </div>
        <div class="otp">
            ${code}
        </div>
        <div class="message">
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2024 MERN-SHOP. All rights reserved.
        </div>
    </div>
</body>
</html>
`

        /*---------EMAIL SEND TO USERS MAIL---------*/
        const OTPSender = await EmailSend(email, EmailSub, EmailText, EmailHTML);


        if(OTPSender) {
            await UserModel.updateOne({email: email}, {$set: {otp: code}}, {upsert: true});
            return {status: "Success", message: "6 Digit OTP has been sent successfully"};
        }else {
            return {status: "fail", message: "OTP is not been sent"};
        }


    }catch(e) {
        console.log(e);
        return {status: "Error", message: "Internal server error..!"};
    }
}


export const VerifyOTPService  = async (req) => {

    try {

        const otp = req.params.code;
        const email = req.params.email;

        /*----------OTP MATCHING------------*/
        const data = await UserModel.aggregate([
            {$match:{email: email, otp: otp}}
        ])


        /*-------------CHECKING DATA FOUND OR NOT--------*/
        if(!data || data.length === 0) {
            return {status: "fail", message: "Invalid OTP"}
        }


        /*----------USER EMAIL, ID--------------*/
        const User_Email = data[0]['email'];
        const User_id =  data[0]['_id'].toString()


        /*-------ENCODEDE USER MAIL AND ID INTO TOKEN---------*/
        const encoded = await TokenEncode(User_Email, User_id);

        if(encoded === null) {
            return {status: 'fail', message:'Token info invalid'}
        }
        

         /*-----------OTP RESET AFTER LOGGED IN------------*/
        await UserModel.updateOne({email: email}, {otp: "0"});


         /*----------------RETURN STATUS------------------*/
        return {status: "Success", message: "Login success", Token: encoded};


    }catch(e) {
        console.log(e.toString());
        return {status: "error", message: "Internal server error..!"};
    }
}

 
export const SaveProfileService  = async (req) => {
    try {

        const user_id = req.headers['user_id'];
        const reqBody = req.body;
 
         /*----SET USER ID IN THE PROFILE-----*/
        reqBody.userID =  user_id;

        /*-------CREATE OR UPDATE USER INFO WHETHER ALREADY USER CREATED OR NOT--------*/
        await ProfilesModel.updateOne({userID: user_id}, {$set:reqBody}, {upsert: true});
        return {status: "Success", message: "Profile save success"};

    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error..!"};
    }
}


export const ReadProfileService  = async (req) => {
    try {

        const user_id = new ObjectId(req.headers['user_id']);

         /*-------READ USER PROFILE'S---------*/
        const data = await ProfilesModel.aggregate([
            {$match: {userID: user_id}}
        ])

         /*-------RETURN STATUS---------*/
        return {status: "Success", data: data[0]};

    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error..!"};
    }
}
 