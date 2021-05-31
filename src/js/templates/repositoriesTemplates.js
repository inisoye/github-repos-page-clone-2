import {
  removeHTMLFromString,
  formatUpdatedDate,
} from '../helpers/stringHelpers';
import getRepoParentTemplate from './repoParentTemplate';
import getRepoDescriptionTemplate from './repoDescriptionTemplate';
import getRepoPrimaryLanguageTemplate from './repoPrimaryLanguageTemplate';
import getRepoStarsTemplate from './repoStarsTemplate';
import getRepoForksTemplate from './repoForksTemplate';
import getRepoLicenseTemplate from './repoLicenseTemplate';

const getRepositoriesTemplate = (data) => {
  return data.user.repositories.nodes
    .map(function (eachRepo) {
      const repoParentTemplate = getRepoParentTemplate(eachRepo);
      const repoDescriptionTemplate = getRepoDescriptionTemplate(eachRepo);
      const repoPrimaryLanguageTemplate =
        getRepoPrimaryLanguageTemplate(eachRepo);
      const repoStarsTemplate = getRepoStarsTemplate(eachRepo);
      const repoForksTemplate = getRepoForksTemplate(eachRepo);
      const repoLicenseTemplate = getRepoLicenseTemplate(eachRepo);
      const repoUpdatedDate = formatUpdatedDate(eachRepo.updatedAt);

      // Return Full Repository Templates with Private Repositories Filtered Out
      return `<article class="single-repo h-flex">
                <div class="single-repo__left">
                  <h3 class="single-repo__name">
                    <a class="single-repo__link" href="#">
                      ${removeHTMLFromString(eachRepo.name)}
                      <span class="h-screen-reader-text"> repository</span>
                    </a>
                  </h3>

                  <div class="repo-details">
                    ${repoParentTemplate}

                    ${repoDescriptionTemplate}

                    <div class="repo-details__indicators h-flex">
                      ${repoPrimaryLanguageTemplate}

                      ${repoStarsTemplate}
                    
                      ${repoForksTemplate}
                      
                      ${repoLicenseTemplate}
                    
                      <p class="repo-update">
                        Updated <span class="repo-update-date">${repoUpdatedDate}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="single-repo__right h-flex">
                  <button class="star-button h-flex" aria-label="Star this repository">
                    <svg
                      class="star-button__icon"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 
                        1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 
                        1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 
                        01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 
                        0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 
                        0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 
                        0 01-.564-.41L8 2.694v.001z"
                      ></path>
                    </svg>

                    <span class="star-button__text">Star</span>
                  </button>
                </div>
              </article>`;
    })
    .join('');
};

export default getRepositoriesTemplate;
