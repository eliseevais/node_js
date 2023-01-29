// 1 урок

// const colors = require('colors');

// colors.bgMagenta

// let foo = `Hello, ${colors.red(process.argv[2])}!`;
// console.log(colors.red(foo));
// console.log(colors.inverse(foo));

/// 2 урок

// setTimeout(() => console.log('Hello, world!'), 5000);
// for (let n = 0; n < 10000000000; n++) {}

// console.log(1);

// new Promise((resolve) => {
//   console.log('1.5');
//   resolve(0);
// });

// Promise.resolve().then(() => console.log(2));

// setTimeout(() => {
//   console.log(3);
//   Promise.resolve().then(() => console.log(4))
// }, 0);

// Promise.resolve().then(() => {
//   Promise.resolve().then(() => console.log(5));
//   console.log(6);
// });

// console.log(7);

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

const RequestTypes = [
  { type: 'send', payload: 'send document' },
  { type: 'receive', payload: 'get document' },
  { type: 'sign', payload: 'sign document' },
];

class Customer {
  constructor({ type, payload }) {
    this.type = type;
    this.payload = payload;
  }
}

const generateCustomer = () => new Promise((resolve) => {
  setTimeout(
    () => {
      resolve(new Customer(RequestTypes[random(0, RequestTypes.length - 1)]));
    },
    random(1000, 5000)
  );
})

const Handler = {
  send: (payload) => console.log(`Customer need ${payload}`),
  receive: (payload) => console.log(`Customer need ${payload}`),
  sign: (payload) => console.log(`Customer need ${payload}`)
}

const EventEmitter = require('events');
const emitter = new EventEmitter();

const receiveMoney = () => {
  console.log('Money was paid');
}

emitter.on('send', Handler.send);
emitter.on('send', receiveMoney);
emitter.setMaxListeners(100);
emitter.on('receive', Handler.receive);
emitter.on('sign', Handler.sign);

emitter.on('error', () => undefined);

const run = async () => {
  const customer = await generateCustomer();
  emitter.emit(customer.type, customer.payload);
  emitter.emit('error', new Error('Some error'))
  run();
};

run();
