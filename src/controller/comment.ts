'use strict'

import moment from 'moment';
import query from '../db/query';
import { errorMessage, successMessage } from '../helper/status';
import { isEmpty } from '../helper/validation';


const comments = async (args:any, req:any) => {
    const { content, bid } = args;

    const user = req.user;

    if (!user || user == undefined) {
        errorMessage.message = "sorry you're unauthorized";
        throw new Error(errorMessage.message)
    }

    if (isEmpty(content)) {
        errorMessage.message = "comment cannot be empty";
        throw new Error(errorMessage.message)
    }

    if(!user.last_login || user.last_login == null){
        errorMessage.message = "you're not authenticated please login!"
        throw new Error(errorMessage.message);
    }

    const { uid, username } = user;

    let bookquery = `SELECT * FROM book WHERE bid=$1`;

    const created_at = moment (new Date());
    const user_id = uid;
    const commenter = username;

    const queries = `INSERT INTO comment(content, book_id, user_id, commenter, created_at) VALUES($1, $2, $3, $4, $5) returning *`;

    try {

        let resp:any = await query(bookquery, [bid]);
        const dbres = resp.rows[0];

        if(!dbres || dbres == undefined){
            errorMessage.message = "hey bitch you cant't comment on mising book!";
            throw new Error(errorMessage.message)
        }

        const { rows }:any = await query(queries, [content, dbres.bid, user_id,commenter,created_at]);
        const dbresp = rows[0];

        (<any>successMessage).data = dbresp;
        (<any>successMessage).data.message = "comment added successfully!";
        return successMessage
    }
    catch (error:any) {
        errorMessage.message = error
        throw new Error(errorMessage.message);
    }
}


export default comments