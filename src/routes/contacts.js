const express = require('express');
const router = express.Router();
const data = require('../../data.json');

const contacts = data.contacts;

router.get('/', function(req, res) {
  return res.status(200).json({ message: "Contacts are ready!!!" });
});

//Add a contact
router.post('/api/v1/contacts', (req, res)=>{
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.phone) {
    res.status(400).json({message: "Required field cannot be left blank"});
  }
  const newContact = {
    id: contacts.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone
  }
  contacts.push(newContact);
  return res.status(200).send({message: "Contact Added successfully"});
});

// View all Contacts
router.get('/api/v1/contacts', (req, res)=>{
  return res.status(200).json({contacts});
});

//View a single contact
router.get('/api/v1/contacts/:contactId', (req, res)=>{
  const contactId = Number(req.params.contactId);
  if (Number.isNaN(contactId)) {
    res.status(400).json({message: "Enter a valid contact id"});
    return;
  }

  if (contactId < 1 || contactId > contacts.length) {
    res.status(404).json({message: `Contact with id ${contactId} was not found`});
    return;
  }
  const contactData = contacts[contactId - 1];
  res.status(200).json({ contact: contactData});
});


//Update contact
router.put('/api/v1/contacts/:contactId', (req, res) =>{
  const contactId = Number(req.params.contactId);
  if (Number.isNaN(contactId)) {
    res.status(400).json({message: "Enter a valid contact id"});
    return;
  }

  if (contactId < 1 || contactId > contacts.length) {
    res.status(404).json({message: `Contact with id ${contactId} was not found`});
    return;
  }

  if (!req.body.email) {
    res.status(400).json({
      message: "Email is required"
    });
  }
  if (!req.body.phone) {
    res.status(400).json({
      message: "Phone-Number is required"
    });
  }
  const updatedContact = {
    id: contactId,
    email: req.body.email,
    phone: req.body.phone
  }
  const contactData = contacts[contactId - 1];
  contactData.email = updatedContact.email || contactData.email;
  contactData.phone = updatedContact.phone || contactData.phone;

  return res.status(200).json({
    message: "Update successful"
  })
});

//Delete a contact
router.delete('/api/v1/contacts/:contactId', (req, res) => {
  const contactId = Number(req.params.contactId);

  if (Number.isNaN(contactId)) {
    res.status(400).json({message: "Enter a valid contact id"});
    return;
  }

  if (contactId < 0 || contactId > contacts.length) {
    res.status(404).json({message: `Contact with id ${contactID} was not found`});
    return;
  }

  const contactData = contacts[contactId - 1];
  const id = contactData.id - 1;
  contacts.splice(id, 1);
  return res.status(200).json({
    message: "Contact removed successfully"
  });
});

module.exports = router;
