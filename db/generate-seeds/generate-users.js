const faker = require('faker');
const fs = require('fs');

const generateUsers = () => {

  // TABLE INFO
  const NAME = "users";
  const ATTRIBUTES = "(first_name, last_name, username, email, city)";

  let users = "";

  for (let i = 1; i <= 5; i++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let username = faker.internet.userName();
    let email = faker.internet.email();
    let city = faker.address.city();

    users += `INSERT INTO ${NAME} ${ATTRIBUTES} VALUES ('${firstName}', '${lastName}', '${username}', '${email}','${city}');`;
    users += "\n";
  }

  return users;
};

fs.writeFileSync('../seeds/01_users.sql', generateUsers());
