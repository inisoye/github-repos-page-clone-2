import { removeHTMLFromString } from '../helpers/stringHelpers';

const getRepoPrimaryLanguageTemplate = (repository) => {
  const primaryLanguageName = repository.primaryLanguage
    ? removeHTMLFromString(repository.primaryLanguage.name)
    : '';

  return repository.primaryLanguage
    ? `
      <p class="repo-language h-mr-16 h-flex">
        <span class="repo-language__colour" style="background-color:${removeHTMLFromString(
          repository.primaryLanguage.color
        )}"></span>
        <span class="repo-language__name">${primaryLanguageName}</span>
      </p>
      `
    : '';
};

export default getRepoPrimaryLanguageTemplate;
