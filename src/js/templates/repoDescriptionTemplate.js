import { removeHTMLFromString } from '../helpers/stringHelpers';

const getRepoDescriptionTemplate = (repository) => {
  return repository.description
    ? `
      <p class="repo-details__description">
        ${removeHTMLFromString(repository.description) || ''}
      </p>
      `
    : '';
};

export default getRepoDescriptionTemplate;
