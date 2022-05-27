import { Pool } from 'pg';
import env from '../config/env';


const dbconnectionConfig = {
    connectionString: env.db_uri
}

const pool = new Pool(dbconnectionConfig);

export default pool;