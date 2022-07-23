const argv = require('yargs').argv;
const contactOperations = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const contacts = await contactOperations.listContacts();
            console.table(contacts)
            break;
        case 'get':
            const contact = await contactOperations.getContactById(id);
            console.table(contact)
            break;
        case 'remove':
            const removeContact = await contactOperations.removeContact(id);
            console.table(removeContact)
            break;
        case 'add':
            const addContact = await contactOperations.addContact(name, email, phone)
            console.table(addContact)
            break;
        default:
           console.warn('\x1B[31m Unknown action type!');
            
    }
}

invokeAction(argv);