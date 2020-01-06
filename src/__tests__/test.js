const request = require('supertest');

const app = require('../../app');

const contactId = 1;

const contact = {
  id: 1,
  firstname: "Abel" ,
  lastname: "joy",
  email: "abjoy@yahoo.com" ,
  phone: "08032345679",
} 
const updateContact = {
  id: 1,
  email: "theabel@yahoo.com" ,
  phone: "08032345678",
}

describe("/Add a new Contact", () => {
  test("Should add a contact", async () =>{
    return request(app).post(`/api/v1/contacts`).send(contact).expect(res=>{
      const resMessage = Object.values(res.body)
      expect(res.status).toBe(200)
      expect(resMessage).toContain("Contact Added successfully")
    });
  });
});

describe("/View All Contacts", () => {
  test("Should return all contacts", () =>{
    return request(app).get(`/api/v1/contacts`).expect(200);
  })
});

describe("/View a single Contact", () => {
  test("Should return a contact", () =>{
    return request(app).get(`/api/v1/contacts/${contactId}`).expect(200);
  });
});

describe("/Edit a Contact", () => {
  test("Should edit a contact", async () =>{
    return await request(app).put(`/api/v1/contacts/${contactId}`).send(updateContact).expect(res=>{
      const resMessage = Object.values(res.body)
      expect(res.status).toBe(200)
      expect(resMessage).toContain("Update successful")
    });
  });
});

describe("/Delete a Contact", () => {
  test("Should delete a contact", async () =>{
    return request(app).delete(`/api/v1/contacts/${contactId}`).expect(res=>{
      const resMessage = Object.values(res.body)
      expect(res.status).toBe(200)
      expect(resMessage).toContain("Contact removed successfully")
    });
  });
});