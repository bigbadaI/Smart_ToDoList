const faker = require('faker');
const fs = require('fs');

const generateUsers = () => {

  // TABLE INFO
  const NAME = "users";
  const ATTRIBUTES = "(first_name, last_name, username, email)";

  let users = "";

  for (let i = 1; i <= 5; i++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let username = faker.internet.userName();
    let email = faker.internet.email();

    users += `INSERT INTO ${NAME} ${ATTRIBUTES} VALUES (${firstName}, ${lastName}, ${username}, ${email});`;
    users += "\n";
  }

  return users;
};

fs.writeFileSync('01_users.sql', generateUsers());
