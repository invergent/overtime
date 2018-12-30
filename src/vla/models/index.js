import configuration from '../../database/config/connectionConfig';
import copyModelsToDB from '../../database/models';

const dbConfig = configuration('VLA');
const db = copyModelsToDB(dbConfig);

export default db;
