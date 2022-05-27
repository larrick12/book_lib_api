import query from '../db/query';
import { successMessage, errorMessage } from '../helper/status';



const dropBook = async (args:any, req:any) => {

    let {bid} = args;

    const user = req.user;

    const { uid } = user;

    if (!user) {
        errorMessage.message = "you're unauthorized to delete book";
        throw new Error(errorMessage.message);
    }

    if (!user.last_login) {
        errorMessage.message = "you're unauthorized to delete book";
        throw new Error(errorMessage.message);
    }

    const findbook = `SELECT * FROM book WHERE bid=${bid}`;
    const dropquery = `DELETE FROM book WHERE bid=$1 AND user_id=${uid} returning *`;

    try {

        const f:any = await query(findbook);
        const d = f.rows[0];

        if (!d || d == undefined) {
            errorMessage.message = "you have no book with that id";
            throw new Error(errorMessage.message);
        }

        const { rows }:any = await query(dropquery, [d.bid]);
        const dbresp = rows[0];

        (<any>successMessage).data = dbresp;
        (<any>successMessage).data.message = " book deleted successfully";

        return successMessage;

    } catch (error: any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message)
    }

}

const dropUser = async (args:any, req:any) => {

    let {uid} = args;

    const user = req.user;

    if (!user || user == undefined) {
        errorMessage.message = "you're unauthorized to delete your account";
        throw new Error(errorMessage.message);
    }

    if (!user.last_login || user.last_login == undefined) {
        errorMessage.message = "you're unauthorized to delete your account please login to continue!";
        throw new Error(errorMessage.message);
    }

    const findbook = `SELECT * FROM bookuser WHERE uid=${uid}`;
    const dropquery = `DELETE FROM bookuser WHERE uid=$1 returning *`;

    try {

        const f:any = await query(findbook);
        const d = f.rows[0];

        if (!d || d == undefined) {
            errorMessage.message = "you have no user with that id";
            throw new Error(errorMessage.message);
        }

        const { rows }:any = await query(dropquery, [d.uid]);
        const dbresp = rows[0];

        (<any>successMessage).data = dbresp;
        (<any>successMessage).data.message = " user deleted successfully";

        return successMessage;

    } catch (error: any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message)
    }
}

const dropComment = async (args:any, req:any) => {

    let {cid, bid} = args;

    const user = req.user;

    let {uid} = user;

    if (!user || user == undefined) {
        errorMessage.message = "you're unauthorized to delete your comment";
        throw new Error(errorMessage.message);
    }

    if (!user.last_login || user.last_login == undefined) {
        errorMessage.message = "you're unauthorized to delete your comment please login to continue!";
        throw new Error(errorMessage.message);
    }

    const findbook = `SELECT * FROM comment WHERE cid=${cid}`;
    const dropquery = `DELETE FROM comment WHERE cid=$1 AND book_id=${bid} AND user_id=${uid} returning *`;

    try {

        const f:any = await query(findbook);
        const d = f.rows[0];

        if (!d || d == undefined) {
            errorMessage.message = "you have no comment with that id";
            throw new Error(errorMessage.message);
        }

        const { rows }:any = await query(dropquery, [d.cid]);
        const dbresp = rows[0];

        (<any>successMessage).data = dbresp;
        (<any>successMessage).data.message = " comment deleted successfully";

        return successMessage;

    } catch (error: any) {
        errorMessage.message = error;
        throw new Error(errorMessage.message)
    }
}



export { dropBook, dropComment, dropUser}