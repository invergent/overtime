require('dotenv').config();
var exec = require('child_process').exec;
var allTenants = require('./src/application/database/tenantsModels/tenants');

allTenants.forEach(tenant => exec(`sequelize db:migrate --url ${process.env[`${tenant.name}_DEV_DB_URL`]}`,
  (error, stdout, stderr) => {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }));
