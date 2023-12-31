const contacts = require('./contacts');
const {Command} =require('commander');
const program = new Command();

program
  .option('-a, --action, <type>', 'choose action')
  .option('-i, --id, <type>', 'user id')
  .option('-n, --name, <type>', 'user name')
  .option('-e, --email, <type>', 'user email')
  .option('-p, --phone, <type>', 'user phone');

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.table(contactById);
    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      return console.table(addedContact);
    case 'remove':
      const removedContact = await contacts.removeContact(id);
      return console.table(removedContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);