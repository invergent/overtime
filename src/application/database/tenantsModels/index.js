import ModelsCache from './ModelsCache';
import config from '../config/connectionConfig';
import sequelizeModels from '../models';
import allTenants from './tenants';

const modelsCache = new ModelsCache(allTenants, config, sequelizeModels);

export default modelsCache;
