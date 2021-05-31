import Component from '../classes/component';
import DOMSelection from '../classes/domSelection';
import getRepositoriesTemplate from '../templates/repositoriesTemplates';
import { getQueryString } from '../helpers/stringHelpers';
import updateAccountInfoData from '../helpers/accountInfoUpdateHelpers';
import getRepos from '../services/reposService';

const repositoriesComponent = new Component('#repositories-container', {
  data: {},

  template: (props) => {
    return getRepositoriesTemplate(props);
  },
});

const selectedUser = getQueryString(window.location.search)[
  'user-search-input'
];
const reposPreloader = new DOMSelection('#repos-preloader-container');
const pageContainer = new DOMSelection('#container');

const renderRepositories = async () => {
  const repositoriesData = await getRepos(selectedUser);

  reposPreloader.addClass('h-hide');
  pageContainer.removeClass('h-hide');

  updateAccountInfoData(repositoriesData);
  repositoriesComponent.data = repositoriesData;
  repositoriesComponent.render();
  document.title = `${selectedUser}'s Repositories`;
};

export default renderRepositories;
