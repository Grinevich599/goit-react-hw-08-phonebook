import { useEffect } from 'react';

import { ContactListItem } from './ContactListItem';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectContactsError,
  selectContactsIsLoading,
  selectFilter,
} from '../../redux/contacts.selector';
import { apiGetContact } from '../../redux/contactsSlice';
import { Loader } from 'components';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const state = useSelector(selectFilter);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetContact());
  }, [dispatch]);

  const filterContacts = contacts.filter(profile =>
    profile.name.toLowerCase().includes(state.trim().toLowerCase())
  );

  return (
    <>
      {isLoading && <Loader />}
      {error && 'Sorry, I don`t have information'}
      <ul>
        {Array.isArray(contacts) &&
          filterContacts.map(contact => (
            <ContactListItem
              name={contact.name}
              phone={contact.number}
              key={contact.id}
              id={contact.id}
            />
          ))}
      </ul>
    </>
  );
};

export { ContactList };
