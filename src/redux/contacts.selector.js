export const selectContacts = state => state.contactsReducer.items;
export const selectContactsError = state => state.contactsReducer.error;
export const selectContactsIsLoading = state => state.contactsReducer.isLoading;

export const selectFilter = state => state.filter.filter;
