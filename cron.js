const cron = require('node-cron');

console.log('Initialisation des tâches cron...');

const task = () => {
  console.log('send');
  fetch('http://localhost:3000/api/cron');
};

cron.schedule('0 0 * * *', task);
