const faker = require('faker');
const fs = require('fs')

function generateUsers() {

  // TABLE INFO
  const NAME = "users";
  const ATTRIBUTES = "(first_name, last_name, username, email)";

  let users = "";

  for (let id=1; id <= 5; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let username = faker.internet.userName();
    let email = faker.internet.email();

    users += `INSERT INTO ${NAME} ${ATTRIBUTES} VALUES (${firstName}, ${lastName}, ${username}, ${email});`;
    users += "\n"
  }

  return users;
}

fs.writeFileSync('users.sql', generateUsers());
