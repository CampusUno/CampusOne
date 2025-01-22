import { strict } from 'assert';
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, { // userId acts as the payload
        expiresIn: '15d'
    });
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, // expiresIn here needs to be in ms
        httpOnly: true, // prevents XSS attacks and cross site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });
};