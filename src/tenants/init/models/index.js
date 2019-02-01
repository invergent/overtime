import configuration from '../../../application/database/config/connectionConfig';
import copyModelsToDB from '../../../application/database/models';

const dbConfig = configuration('INIT');
const db = copyModelsToDB(dbConfig);

export default db;
