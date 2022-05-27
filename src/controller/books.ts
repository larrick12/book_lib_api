import moment from 'moment';
import query from '../db/query';
import { successMessage, errorMessage, status } from '../helper/status';
import { isEmpty } from '../helper/validation';



const book = async (args:any, req:any) => {
    let { title, content } = args;
    let user = req.user;

    if (!user || user === undefined) {
        errorMessage.message = "you're not authenticated please signin!"
        throw new Error(errorMessage.message);
    }

    const { username, uid, last_login } = user;

    if(!last_login || last_login == null){
        errorMessage.message = "you're not authenticated please login!"
        throw new Error(errorMessage.message);
    }

    if (isEmpty(title)) {
        errorMessage.message = "title cannot be empty";
        throw new Error(errorMessage.message);
    }

    if (isEmpty(content)) {
        errorMessage.message = "content cannot be empty";
        throw new Error(errorMessage.message);
    }

    let created_on = moment(new Date());
    let author = username;
    let user_id = uid;

    let insquery: string = `INSERT INTO book(title, content, author, user_id, created_on) VALUES($1, $2, $3, $4, $5) returning *`;
    let fetch = `SELECT * FROM bookuser WHERE uid=${user_id}`;

    const values = [
        title,
        content,
        author,
        user_id,
        created_on
    ];

    try {

        let { rows }:any = await query(fetch);
        let dbresp = rows[0];

        if (!dbresp === undefined) {
            errorMessage.message = "user not exit";
            throw new Error(errorMessage.message);
        }

        let result: any = await query(insquery, values);
        let dbres = result.rows[0];

        (<any>successMessage).data = dbres;
        (<any>successMessage).data.message = "Book added successfully!";
        return successMessage

    } catch (error: any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message)
    }
}


export default book