// On top fixed panel users buttons click - showes dropdown for each.
const notificationButtonOne = document.querySelector('.notification-1 .notification-button');
const notificationButtonTwo = document.querySelector('.notification-2 .notification-button');
const userInfoTopOuter = document.querySelector('.user-outer');
const userInfoTop = document.querySelector('.user');
const dropdownListOne = document.querySelector('.dropdown-list-wrapper-one .dropdown-list-one');
const dropdownListTwo = document.querySelector('.dropdown-list-wrapper-two .dropdown-list-two');
const dropdownListWrapperOne = document.querySelector('.dropdown-list-wrapper-one');
const dropdownListWrapperTwo = document.querySelector('.dropdown-list-wrapper-two');
const dropdownInfo = document.querySelector('.dropdown-info');
const dropdownInfoWrapper = document.querySelector('.dropdown-info-wrapper');
const openMenuMobileBtn = document.querySelector('.mobile-menu-ope-btn button');
const leftSideMenuContainer = document.querySelector('.left-side-container');
const menuLeftUnderlay = document.querySelector('.left-underlay');
const leftSideMenuCloseBtn = document.querySelector('.top-logo-col .close-button');
const menuRightUnderlayOne = document.querySelector('.right-underlay-1');
const menuRightUnderlayTwo = document.querySelector('.right-underlay-2');
const menuRightUnderlayThree = document.querySelector('.right-underlay-3');
// const subMenuItems = document.querySelectorAll('.sub-menu-item');
const menuItems = document.querySelectorAll('.menu-item-d');
const body = document.querySelector('body');
let subMenuBtnClicked = false;

const closeMenu = function(underlay, button, dropdown, wrapper) {
	if (underlay.classList.contains('active')) {
		underlay.addEventListener('click', () => {
			underlay.classList.remove('active');
			button.classList.remove('active');
			dropdown.classList.remove('visible');
			dropdown.classList.add('invisible');
			wrapper.classList.remove('active');
		});
	}
};

notificationButtonOne.addEventListener('click', function () {
	if(!this.classList.contains('active')) {
		this.classList.add('active');
		dropdownListOne.classList.remove('invisible');
		dropdownListOne.classList.add('visible');
		dropdownListWrapperOne.classList.add('active');
		menuRightUnderlayOne.classList.add('active');
		closeMenu(menuRightUnderlayOne, this, dropdownListOne, dropdownListWrapperOne);
	} else {

		this.classList.remove('active');
		dropdownListOne.classList.remove('visible');
		dropdownListOne.classList.add('invisible');
		dropdownListWrapperOne.classList.remove('active');
		menuRightUnderlayOne.classList.remove('active')
	}
});

notificationButtonTwo.addEventListener('click', function () {
	if(!this.classList.contains('active')) {

		this.classList.add('active');
		dropdownListTwo.classList.remove('invisible');
		dropdownListTwo.classList.add('visible');
		dropdownListWrapperTwo.classList.add('active');
		menuRightUnderlayTwo.classList.add('active');

		closeMenu(menuRightUnderlayTwo, this, dropdownListTwo,dropdownListWrapperTwo);
	} else {

		this.classList.remove('active');
		dropdownListTwo.classList.remove('visible');
		dropdownListTwo.classList.add('invisible');
		dropdownListWrapperTwo.classList.remove('active');
		menuRightUnderlayTwo.classList.remove('active');
	}
});

userInfoTop.addEventListener('click', function() {
	if(!userInfoTop.classList.contains('active')) {
		userInfoTop.classList.add('active');
		userInfoTopOuter.classList.add('show');
		dropdownInfoWrapper.classList.add('active');
		dropdownInfo.classList.remove('invisible');
		dropdownInfo.classList.add('visible');

		menuRightUnderlayThree.classList.add('active');
		closeMenu(menuRightUnderlayThree, this, dropdownInfo, dropdownInfoWrapper);
	} else {
		this.classList.remove('active');
		userInfoTopOuter.classList.remove('show');
		dropdownInfoWrapper.classList.remove('active');
		dropdownInfo.classList.remove('visible');
		dropdownInfo.classList.add('invisible');

		menuRightUnderlayThree.classList.remove('active');
	}
});


// Adds class "active" to the clicked menu item left purple sidebar
menuItems.forEach(menuItem => {
	menuItem.addEventListener('click', () => {
		menuItems.forEach(menuItem => {
			menuItem.classList.remove('active');
		});

		if (menuItem.classList.contains('active')) {
			menuItem.classList.remove('active');
		} else {
			menuItem.classList.add('active');
		}
	});
});


// Adds class "active" to the clicked sub-menu item in top fixed panel

// subMenuItems.forEach(item => {
// 	item.addEventListener('click', () => {
// 		subMenuItems.forEach(item => {
// 			item.classList.remove('active');
// 		});
//
// 		if (!item.classList.contains('active')) {
// 			item.classList.add('active');
// 			subMenuBtnClicked = true;
// 		} else {
// 			item.classList.remove('active');
// 			subMenuBtnClicked = false;
// 		}
// 	});
// });



// Open hamburger menu btn on mobile
openMenuMobileBtn.addEventListener('click', () => {
	if (!body.classList.contains('blocked')) {
		body.classList.add('blocked');
		subMenuBtnClicked = true;
	} else {
		body.classList.remove('blocked');
		subMenuBtnClicked = false;
	}

	if (!leftSideMenuContainer.classList.contains('active')) {
		leftSideMenuContainer.classList.add('active');
		menuLeftUnderlay.classList.add('active');

	} else {
		leftSideMenuContainer.classList.remove('active');
		menuLeftUnderlay.classList.remove('active');
	}
});

// when the left side menu on mobile is opened and you click outside of it - the menu closes.
menuLeftUnderlay.addEventListener('click', () => {
	leftSideMenuContainer.classList.remove('active');
	menuLeftUnderlay.classList.remove('active');
	body.classList.remove('blocked');
});

// click on icon close to close left side purple menu on mobile
leftSideMenuCloseBtn.addEventListener('click', () => {
	leftSideMenuContainer.classList.remove('active');
	menuLeftUnderlay.classList.remove('active');
});
