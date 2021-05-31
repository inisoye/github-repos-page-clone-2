import { removeHTMLFromString } from '../helpers/stringHelpers';

const getRepoParentTemplate = (repository) => {
  return repository.isFork
    ? `
      <span class="repo-details__parent">
        Forked from <a href="#">${removeHTMLFromString(
          repository.parent.nameWithOwner
        )}</a>
      </span>
      `
    : '';
};

export default getRepoParentTemplate;
