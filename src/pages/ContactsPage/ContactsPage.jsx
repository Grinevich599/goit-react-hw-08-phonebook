import { ContactForm, ContactList, Filter } from 'components';

import css from '../HomePage/HomePage.module.css';
const ContactsPage = () => {
  return (
    <div className={css.card}>
      <h1 className={css.contactshero}>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
