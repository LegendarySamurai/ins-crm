let currentTab = null;

const servicesSelect = document.querySelector('#service-select');
const countySelect = document.querySelector('#county-select');
const contentBoxes = document.querySelectorAll('.content-box');
const contentBoxOne = document.querySelector('#content-box-1');
const contentBoxTwo = document.querySelector('#content-box-2');
const tabs = document.querySelectorAll('.tab');
const tabOne = document.querySelector('#tab-one');
const tabTwo = document.querySelector('#tab-two');
const tabThree = document.querySelector('#tab-three');

const toolsContainer = document.querySelector('.tools-container');

function showContentBox (contentBoxToShow) {
	contentBoxes.forEach(contentBox => contentBox.classList.add('d-none'));
	contentBoxToShow.classList.remove('d-none');
	tabs.forEach(tab => tab.classList.remove('selected'));
}

function changeTab () {
	servicesSelect.addEventListener('change', function () {
		showContentBox(contentBoxOne);
		toolsContainer.classList.remove('d-none');
		toolsContainer.classList.add('d-block');
	});
	countySelect.addEventListener('change', function () {
		showContentBox(contentBoxTwo);
		tabTwo.classList.add('selected');
		toolsContainer.classList.remove('d-block');
		toolsContainer.classList.add('d-none');
	});
}

changeTab();
