'use strict';

const conn = require('./lib/connectMongoose');
const anuncio = require('./models/anuncio.js');
const tagDb = require('./models/tag.js');
const usersDb = require('./models/user.js');

conn.once('open', async () => {
  try {
    await initAdDb();
    await initTagDb();
    await initUsersDb();
    conn.close();

  } catch (err) {
    console.error('Hubo un error:', err);
    process.exit(1);
  }
});

async function initAdDb() {
  await anuncio.deleteMany();
  await anuncio.insertMany([
    { name: 'Botas de futbol', sell: true, price: 10, image: '/images/test-image-05-tn.jpg', tags: ['lifestyle', 'work'] },
    { name: 'Patinete electrico', sell: false, price: 100, image: '/images/test-image-04-tn.jpg', tags: ['motor'] },
    { name: 'Telefono fijo', sell: true, price: 104, image: '/images/test-image-03-tn.jpg', tags: ['work'] },
    { name: 'Rueda de coche', sell: true, price: 299, image: '/images/test-image-02-tn.jpg', tags: ['lifestyle'] },
    { name: 'Telefono', sell: true, price: 299, image: '/images/test-image-01-tn.jpg', tags: ['lifestyle'] },
  ]);
}

async function initTagDb() {
  await tagDb.deleteMany();
  await tagDb.insertMany([
    { tag: 'lifestyle' },
    { tag: 'work' },
    { tag: 'motor' },
    { tag: 'mobile' },
  ]);
}

async function initUsersDb() {
  await usersDb.deleteMany();
  await usersDb.insertMany([
    {userName: 'user@example.com', password: await usersDb.hashPass('1234')},
    {userName: 'user123@example.com', password: await usersDb.hashPass('1234567890')},
  ]);
}