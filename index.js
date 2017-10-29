const mongoose = require('mongoose');
mongoose.Promises = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';

const connect = mongoose.connect(url, {useMongoClient: true})


connect.then((db)=>{
  console.log('Connected correctly to the server');

  Dishes.create({
    name: 'Vishal',
    description: 'test'
  })
  .then((dish)=>{
    console.log(dish);
    return Dishes.find({}).exec();
  })
  .then((Dishes)=>{
    console.log(Dishes);
    return db.collection('dishes').drop();
  })
  .then(()=>{
    return db.close();
  })
  .catch((error)=>{
    console.log(error);
  })
});
