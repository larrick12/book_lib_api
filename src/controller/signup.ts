import query from '../db/query';
import moment from 'moment';
import {
    isEmpty,
    isvalidEmail,
    hashedPass,
    validPass,
    generateToken
} from '../helper/validation';
import { successMessage, errorMessage } from '../helper/status';



// create user function to handle graphql mutation
const createuser = async (args: any) => {

    const { firstname, lastname,
        email, username, password} = args;

    const created_on = moment(new Date());

    if (isEmpty(email) || isEmpty(firstname) || isEmpty(lastname) || isEmpty(password) || isEmpty(username)) {
        errorMessage.message = "asterick fields cannot be empty";
        throw new Error(errorMessage.message);
    }

    if (!isvalidEmail(email)) {
        errorMessage.message = 'Please enter a valid Email';
        throw new Error(errorMessage.message);
    }

    if (!validPass(password)) {
        errorMessage.message = 'Password must be more than seven(7) characters';
        throw new Error(errorMessage.message);
    }

    const hashedPassword = hashedPass(password);

    const insquery: string = `INSERT INTO bookuser (firstname, lastname,  email, username, password, created_on) VALUES($1, $2, $3, $4, $5, $6 ) returning *`;

    const values: any[] = [
        firstname, lastname,
        email, username, hashedPassword,
        created_on
    ];


    try {
        const { rows }:any = await query(insquery, values);
        const dbResponse = rows[0];
        delete dbResponse.password;

        const token = generateToken(dbResponse.uid, dbResponse.firstname, dbResponse.lastname, dbResponse.middlename, dbResponse.email, dbResponse.username, dbResponse.gender, dbResponse.created_on, dbResponse.updated_on, dbResponse.last_login);

        (<any>successMessage).data = dbResponse;
        (<any>successMessage).data.token = token;
        return successMessage;

    } catch (error: any) {
        if (error.routine === '_bt_check_unique') {
            errorMessage.message = 'user with that EMAIL or USERNAME already exist';
            throw new Error(errorMessage.message);
        }
        console.log(error)
        errorMessage.message = 'Operation was not successful on signup section';
        throw new Error(errorMessage.message);
    }
};


export default createuser

