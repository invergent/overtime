import ModelsCache from './ModelsCache';
import config from '../config/connectionConfig';
import sequelizeModels from '../models';

const allTenants = ['INIT'];

const modelsCache = new ModelsCache(allTenants, config, sequelizeModels);

export default modelsCache;
