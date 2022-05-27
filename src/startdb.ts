import query from './db/query';
import { createAllTables, dropAllTables } from './db/models';


// dropAllTables();


async function db_table_checker() {

    let tbname = `SELECT EXISTS (SELECT bookuser FROM information_schema.tables WHERE table_name = bookuser)`;

    try {
        let ch: any = await query(tbname);
        if (ch != null) {
            console.log(ch)
        }
    }
    catch (error: any) {
        if (error) {
            console.log('----> creating tables...')
            await createAllTables();
        }
        else{
            throw new Error(error)
        }
    }
}

db_table_checker()


// export default db_table_checker

