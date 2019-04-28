const Sequelize = require('sequelize');
const sequelize = new Sequelize('AlchemistAppDB', 'postgres', 'Thibmat4@0', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    protocol: null,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});