/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import express from 'express'
import {
    errorMessage, status
} from '../helper/status';
import env from '../config/env';



/**
   * Verify Token
   * @param {object} req
   * @returns {object|void} response object 
   */


const verifyToken = async (req: express.Request, res: express.Response): Promise<void | object> => {
    const bearerHeader = req.headers['authorization'] || '';
    const token = bearerHeader.split(' ')[1];

    if (!token) {
        errorMessage.message = 'Token not provided';
        res.statusCode = status.unauthorized
        throw new Error(errorMessage.message);
    }

    // const decodedToken = jwt.decode(token, {complete:true});
    
    // const verifyOptions : jwt.VerifyOptions = {
    //     algorithms: ['RS256', 'RS384', 'RS512'],
    //     issuer: `http://localhost/8050/graphql`,
    //     clockTolerance:300
    //     }

    try {
        const decoded = jwt.verify(token, (<any>env).secret);
        (<any>req).user = {
            uid: (<any>decoded).uid,
            firstname: (<any>decoded).firstname,
            lastname: (<any>decoded).lastname,
            middlename: (<any>decoded).middlename,
            email: (<any>decoded).email,
            username: (<any>decoded).username,
            gender: (<any>decoded).gender,
            created_on: (<any>decoded).created_on,
            updated_on: (<any>decoded).updated_on,
            last_login: (<any>decoded).last_login,
        };
        res.statusCode = status.success
        return (<any>req).user;

    } catch (error: any) {
        errorMessage.message = error;
        res.statusCode = status.unauthorized
        throw new Error(errorMessage.message);
    }
};

export default verifyToken;