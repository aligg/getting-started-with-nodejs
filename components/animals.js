var koa = require('koa');
const _ = require('koa-route');
var app = module.exports = new koa();
var database = require('./database').database;


const animals = {
  list: (ctx) => {
    const names = Object.keys(database);
    ctx.body = 'animals: ' + names.join(', ');
  },
    show: (ctx, name) => {
    const animal = database[name];
    if (!animal) return ctx.throw('cannot find that creature', 404);
    ctx.body = animal.name + ' is a ' + animal.species;
  }
};


app.use(_.get('/', animals.list));
app.use(_.get('/:name', animals.show));
