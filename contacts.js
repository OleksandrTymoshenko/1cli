const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const contactsPath = path.join(__dirname, 'db', 'contacts.json') ;

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data);
    return contacts;
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id == contactId);
    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const newArrContacts = contacts.filter(item => item.id != contactId);
    fs.writeFile(contactsPath, JSON.stringify(newArrContacts));
    return newArrContacts;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: v4(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}