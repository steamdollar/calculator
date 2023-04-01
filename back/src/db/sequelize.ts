// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('calculator', 'sila', '11', {
//   host: process.env.BACKEND_DB,
//   dialect: 'mysql',
//   logging: false, // set to true if you want to see SQL logs
// });

// // Define your models
// const Wallet = sequelize.define('wallet', {
//   addr: {
//     type: Sequelize.STRING(256),
//     primaryKey: true,
//   },
//   affiliation: Sequelize.STRING(32),
//   purpose: Sequelize.STRING(32),
// });

// const Trading = sequelize.define('trading', {
//   idx: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   date: Sequelize.DATE,
//   wallet: {
//     type: Sequelize.STRING(256),
//     references: {
//       model: Wallet,
//       key: 'addr',
//     },
//   },
//   tolerance: Sequelize.INTEGER,
//   entry: Sequelize.INTEGER,
//   sl: Sequelize.INTEGER,
//   tp: Sequelize.INTEGER,
//   ticker: Sequelize.STRING(256),
//   result: Sequelize.BOOLEAN,
//   memo: Sequelize.TEXT,
// });

// const Balance = sequelize.define('balance', {
//   addr: {
//     type: Sequelize.STRING(256),
//     references: {
//       model: Wallet,
//       key: 'addr',
//     },
//   },
//   coin: Sequelize.STRING(256),
//   balance: Sequelize.FLOAT,
// });

// const Coin = sequelize.define('coin', {
//   name: {
//     type: Sequelize.STRING(256),
//     primaryKey: true,
//   },
//   listed_market: Sequelize.STRING(256),
// });

// const ProjectWallet = sequelize.define('project_wallet', {
//   wallet: {
//     type: Sequelize.STRING(256),
//     references: {
//       model: Wallet,
//       key: 'addr',
//     },
//   },
//   project: Sequelize.STRING(256),
// });

// const Project = sequelize.define('project', {
//   name: {
//     type: Sequelize.STRING(256),
//     primaryKey: true,
//   },
//   link: Sequelize.STRING(256),
//   status: Sequelize.STRING(32),
// });

// // Define associations between models
// Wallet.hasMany(Trading, { foreignKey: 'wallet' });
// Wallet.hasMany(Balance, { foreignKey: 'addr' });
// Wallet.hasMany(ProjectWallet, { foreignKey: 'wallet' });

// Coin.hasMany(Balance, { foreignKey: 'coin' });

// ProjectWallet.belongsTo(Project, { foreignKey: 'project' });

// // Sync the database
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('Database synced successfully');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

// export { sequelize, Wallet, Trading, Balance, Coin, ProjectWallet, Project };
