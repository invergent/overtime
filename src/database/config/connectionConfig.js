export default client => ({
  development: {
    use_env_variable: `${client}_DEV_DB_URL`,
    dialect: 'postgres',
    logging: false
  },
  test: {
    use_env_variable: `${client}_TEST_DB_URL`,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: `${client}_PROD_DB_URL`,
    dialect: 'postgres'
  }
});
