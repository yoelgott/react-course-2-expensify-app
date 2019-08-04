//Object Destructuring

// const person = {
//     name: 'Yoel',
//     age: 21,
//     location: {
//         city: 'Tlv',
//         temp: 92
//     }
// };
// const { name, age } = person;
// console.log(`${name} is ${age}.`);
// const { city, temp } = person.location;
// console.log(`It's ${temp} in ${city}`);

/**************************/

//Array Destructuring

const address = ['1299 S Juniper Street', 'Phili', 'Pensylvenia', '1231'];

const [, city, state] = address;

console.log(`You are in ${city} ${state}`);
