const faker = require('faker');
const fs = require('fs')
console.log("HELLO")
function generateUsers() {

  let users = []

  for (let id=0; id <= 1; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let username = faker.internet.userName();

    users.push({
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "username":username
    });
  }
  console.log(users);
  return { "data": users }
}

let dataObj = generateUsers();
generateUsers();

// fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

