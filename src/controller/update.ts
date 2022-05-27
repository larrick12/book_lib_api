import query from '../db/query';
import moment from 'moment';
import { empty, isEmpty } from '../helper/validation';
import { successMessage, errorMessage } from '../helper/status';



// create user function to handle graphql mutation
const updateBook = async (args: any, req: any) => {

    let { bid, title, content} = args;

    let user = req.user;

    if(!user || user == undefined){
        errorMessage.message = "you're unauthorized to update book!";
        throw new Error(errorMessage.message);
    }

    if(!bid || bid == undefined){
        errorMessage.message = "book id not supplied";
        throw new Error(errorMessage.message)
    }

    if (isEmpty(title) || isEmpty(content)) {
        errorMessage.message = "asterick fields cannot be empty";
        throw new Error(errorMessage.message);
    }

    if(!user.last_login || user.last_login == undefined){
        errorMessage.message = "you're not authorized to update book please login!"
        throw new Error(errorMessage.message)
    }

    let updated_on = moment(new Date());

    const findbookQuery = `SELECT * FROM book WHERE bid=${bid}`;

    let bookquery = `UPDATE book SET title=$1, content=$2, updated_on=$3 WHERE bid=$4 returning *`;

    let values: any[] = [
        title, content, updated_on, bid
    ];

    try {
        const bookres:any = await query(findbookQuery);
        const found = bookres.rows[0];

        if(!found || found == undefined){
            errorMessage.message = "book not found"
            throw new Error(errorMessage.message)
        };

        const { rows }: any = await query(bookquery, values);
        const dbResponse = rows[0];


        (<any>successMessage).data = dbResponse;
        (<any>successMessage).data.message = "Book updated Successfully";
        return successMessage

    } catch (error:any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message);
    }
};



const updateComment = async (args: any, req: any) => {

    let { cid, content} = args;

    let user = req.user;

    if(!user || user == undefined){
        errorMessage.message = "you're unauthorized to update comment!"
        throw new Error(errorMessage.message)
    }


    if (isEmpty(cid) || isEmpty(content)) {
        errorMessage.message = "asterick fields cannot be empty";
        throw new Error(errorMessage.message);
    }

    if(!user.last_login || user.last_login == undefined){
        errorMessage.message = "you're not authorized to update comment please login!"
        throw new Error(errorMessage.message)
    }

    let updated_at = moment(new Date());

    const findcommentQuery = `SELECT * FROM comment WHERE cid=${cid}`;
    let commentquery = `UPDATE comment SET content=$1, updated_at=$2 WHERE cid=$3 returning *`;

    const values = [
        content,
        updated_at,
        cid
    ];

    try {
        const commentres:any = await query(findcommentQuery);
        const found = commentres.rows[0];

        if(!found || found == undefined){
            errorMessage.message = "comment not found"
            throw new Error(errorMessage.message)
        }

        let { rows }: any = await query(commentquery, values);
        let dbResponse = rows[0];

        (<any>successMessage).data = dbResponse;
        (<any>successMessage).data.message = "Comment updated Successfully";
        return successMessage;

    } catch (error: any) {
        errorMessage.message = 'operation was not successful';
        throw new Error(errorMessage.message);
    }
};


export { updateBook, updateComment }

