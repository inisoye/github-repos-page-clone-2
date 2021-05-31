import Component from '../classes/component';
import DOMSelection from '../classes/domSelection';
import getUsersTemplate from '../templates/usersTemplate';
import getNoUsersTemplate from '../templates/noUsersTemplate';
import getUsers from '../services/usersService';
import { isObjectEmpty } from '../helpers/objectHelpers';

// Create a generic component for list of users
const usersComponent = new Component('#github-users-search-results', {
  data: {},

  template: (props) => {
    // Render users, if available
    if (props.edges && props.edges.length) {
      return getUsersTemplate(props);
    }

    if (!props.edges) {
      return;
    }

    // Show error template if no users match query
    return getNoUsersTemplate();
  },
});

const usersComponentContainer = new DOMSelection(
  '#github-users-search-results'
);
const searchLoader = new DOMSelection('#search-loader');

// Add Users to DOM
const renderUsers = async (searchQuery) => {
  searchLoader.removeClass('h-hide');

  const usersData = await getUsers(searchQuery);

  // Hide loader after response is obtained
  searchLoader.addClass('h-hide');

  // Render data when users data is not empty
  if (!isObjectEmpty(usersData)) {
    usersComponentContainer.removeClass('h-hide');
    usersComponent.data = usersData;
    usersComponent.render();
  }

  if (!searchQuery) {
    usersComponentContainer.addClass('h-hide');
  }
};

export default renderUsers;
