import configuration from '../../../application/database/config/connectionConfig';
import copyModelsToDB from '../../../application/database/models';

const dbConfig = configuration('VLA');
const db = copyModelsToDB(dbConfig);

export default db;
