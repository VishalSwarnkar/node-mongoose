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
    return Dishes.findByIdAndUpdate(dish._id,{
      $set: {description: 'Updated test'}
    },{
      new: true
    })
    .exec();
  })
  .then((dish)=>{
    console.log(dish);

    dish.comments.push({
      rating: 5,
      comment: 'I exicited about mongoose db',
      author: 'Leonardo'
    });
    return dish.save();
  })
  .then((dish)=>{
    console.log(dish);
    return db.collection('dishes').drop();
  })
  .then(()=>{
    return db.close();
  })
  .catch((error)=>{
    console.log(error);
  })
});
