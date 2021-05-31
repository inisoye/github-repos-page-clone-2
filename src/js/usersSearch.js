import DOMSelection from './classes/domSelection';
import renderUsers from './components/users';

const userSearchInput = new DOMSelection('#user-search-input');
const usersComponentContainer = new DOMSelection(
  '#github-users-search-results'
);
const usersSearchSubmitButton = new DOMSelection('.search-form-button');

userSearchInput.first().addEventListener('input', async (inputEvent) => {
  await renderUsers(inputEvent.target.value);

  usersSearchSubmitButton.first().disabled = true;
  usersSearchSubmitButton.first().textContent = 'Select a GitHub account above';

  const userSearchOptions = new DOMSelection('.search-option');
  const userSearchOptionUsernames = new DOMSelection('.search-option-username');

  userSearchOptions.items().forEach((searchOption, index) => {
    searchOption.addEventListener('click', (clickEvent) => {
      inputEvent.target.value = userSearchOptionUsernames
        .items()
        [index].textContent.trim();

      usersComponentContainer.addClass('h-hide');

      usersSearchSubmitButton.first().disabled = false;
      usersSearchSubmitButton.first().textContent = `View ${inputEvent.target.value}'s repositories`;
    });
  });
});
