import { isObjectEmpty } from '../helpers/objectHelpers';
import { removeHTMLFromString } from '../helpers/stringHelpers';

const getUsersTemplate = (props) => {
  return props.edges
    .map((user) =>
      !isObjectEmpty(user.node)
        ? `<li class="search-option" role="option">
            <img
              class="search-option-avatar"
              src=${removeHTMLFromString(user.node.avatarUrl)}
              width="28"
              height="28"
              alt="@ahgilhelp"
            />

            <div class="search-option-names">
              <strong class="search-option-fullname">
                ${removeHTMLFromString(user.node.name) || ''}
              </strong>
              <span class="search-option-username">
                ${removeHTMLFromString(user.node.login)}
              </span>
            </div>
          </li>`
        : ''
    )
    .join('');
};

export default getUsersTemplate;
