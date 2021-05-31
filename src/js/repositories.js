import DOMSelection from './classes/domSelection';
import renderRepositories from './components/repositories';

const hamburgerButton = new DOMSelection('.header-hamburger');
const mobileMenu = new DOMSelection('.mobile-menu');
const allHeaderForms = new DOMSelection('.header-form');
const desktopHeaderForm = new DOMSelection('.header-form--desktop');
const repoNavUserElement = new DOMSelection('.main-nav-user');

renderRepositories();

const toggleMobileMenu = () => {
  mobileMenu.first().classList.toggle('h-hide');
};

const toggleHeaderInputExpansion = (event) => {
  const eventTargetParent = event.target.parentNode;

  if (!event.target.closest('.header-form')) {
    allHeaderForms.items().forEach(function (form) {
      form.classList.remove('h-clicked-form');
    });
    desktopHeaderForm.first().classList.remove('h-clicked-form-desktop');

    return;
  }

  if (eventTargetParent.classList.contains('header-form')) {
    eventTargetParent.classList.add('h-clicked-form');
  }
  if (eventTargetParent.classList.contains('header-form--desktop')) {
    desktopHeaderForm.first().classList.add('h-clicked-form-desktop');
  }
};

const toggleUserAvatar = function () {
  if (window.pageYOffset >= 360) {
    repoNavUserElement.first().style.opacity = 1;
  } else {
    repoNavUserElement.first().style.opacity = 0;
  }
};

// Hamburger Toggle
hamburgerButton.first().addEventListener('click', toggleMobileMenu, false);

// Event Delegation for Header Input Expansion
document.addEventListener('click', toggleHeaderInputExpansion, false);

// Show and Hide User Profile in Repo Section Header
window.addEventListener('scroll', toggleUserAvatar, false);
