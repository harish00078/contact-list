import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const ContactListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactAddress, setNewContactAddress] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleAddContact = async () => {

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        {
          name: newContactName,
          email: newContactEmail,
          phone: newContactPhone,
          address: {
            city: newContactAddress,
          },
        }
      );
      setContacts([...contacts, response.data]);
      setNewContactName("");
      setNewContactEmail("");
      setNewContactPhone("");
      setNewContactAddress("");
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleUpdateContact = async (
    id,
    updatedName,
    updatedEmail,
    updatedPhone,
    updatedAddress
  ) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
        address: {
          city: updatedAddress,
        },
      });
      const updatedContacts = contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              name: updatedName,
              email: updatedEmail,
              phone: updatedPhone,
              address: {
                city: updatedAddress,
              },
            }
          : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Contact List App</h1>
   
      <div className="contacts">
        <h2>Contacts</h2>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>
        
        <ul>
          {contacts.map((contact) => (
            <li className="contact-item" key={contact.id}>
              <span>{contact.name}</span>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>

              <div className="contact-buttons">
                <button
                  onClick={() =>
                    handleUpdateContact(contact.id, "Updated Name")
                  }
                >
                  Update
                </button>
                <button onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="contacts add-contact">
        <h3>Add New Contact</h3>
        <input
          type="text"
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <input
          type="email"
          value={newContactEmail}
          onChange={(e) => setNewContactEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={newContactPhone}
          onChange={(e) => setNewContactPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          value={newContactAddress}
          onChange={(e) => setNewContactAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>

 
  );
};

export default ContactListApp;
