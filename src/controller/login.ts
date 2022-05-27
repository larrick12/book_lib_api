import query from '../db/query';
import moment from 'moment';
import {
    isEmpty,
    isvalidEmail,
    validPass,
    generateToken,
    comparePass
} from '../helper/validation';
import { successMessage, errorMessage } from '../helper/status';



/**
* login in user
* @param {object} req
* @returns {object} updated user
*/
const loginuser = async (args:any, req:any): Promise<object> => {

    const { email, password } = args;

    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.message = 'Email or Password detail is missing';
        throw new Error(errorMessage.message);
    }


    if (!isvalidEmail(email)) {
        errorMessage.message = 'Please enter a valid Email';
        throw new Error(errorMessage.message);
    }

    if (!validPass(password)) {
        errorMessage.message = 'Password too short or incorrect';
        throw new Error(errorMessage.message);
    }

    let lastlogin = moment(new Date());

    const loginQuery = `SELECT * FROM bookuser WHERE email=$1`;
    const updatequery = `UPDATE bookuser SET last_login=$1 WHERE email=$2 returning *`;

    try {

        const { rows }:any = await query(loginQuery, [email]);
        const response = rows[0];

        if (!response || response == undefined) {
            errorMessage.message = 'User with this email cannot be found';
            throw new Error(errorMessage.message);
        }

        if (!comparePass(response.password, password)) {
            errorMessage.message = 'The password you provided is incorrect';
            throw new Error(errorMessage.message);
        }

        const res:any = await query(updatequery, [lastlogin, email]);
        const dbResponse = res.rows[0];

        delete dbResponse.password

        const token = generateToken(dbResponse.uid, dbResponse.firstname, dbResponse.lastname, dbResponse.middlename, dbResponse.email, dbResponse.username, dbResponse.gender, dbResponse.created_on, dbResponse.updated_on, dbResponse.last_login);

        (<any>successMessage).data = dbResponse;
        (<any>successMessage).data.token = token;
        return successMessage;
    } catch (error: any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message);
    }
};

export default loginuser