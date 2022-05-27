import pool from './pool';

const query = (queryText: string, params ?: any) => {
    return new Promise((resolve, reject) => {
        pool.query(queryText, params)
            .then((res: any) => {
                resolve(res);
            })
            .catch((error: any) => {
                reject(error);
            })
    })

}

export default query;