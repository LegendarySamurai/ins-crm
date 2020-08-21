const filterButton = document.querySelector('.filter-btn');
const statusBarPanel = document.querySelector('.status-bar-panel');
const statusBarInner = document.querySelector('.status-bar-inner');
const closeStatusBarInnerBtn = document.querySelector('.close-filter-btn');
const closeFilterBtns = document.querySelectorAll('.close-filter');
const closeStatusBarBtn = document.querySelector('.close-status-bar-btn');

const openFilterBtns = document.querySelectorAll('.open-filter');
const statusBarCol = document.querySelector('.status-bar-col');

if (window.innerWidth < 600) {
	statusBarInner.classList.remove("is-active");

	filterButton.addEventListener("click", () => {
		statusBarInner.classList.add("is-active");
		statusBarCol.classList.add("filter-opened");
		// statusBarBacklayer.classList.add('is-active');
	});

	closeFilterBtns.forEach(button => {
		button.addEventListener("click", () => {
			console.log('=> Works1');
			statusBarInner.classList.remove("is-active");

			statusBarCol.classList.remove("filter-opened");
		});

	});
	closeStatusBarInnerBtn.addEventListener("click", () => {
		console.log(e, '=> Works2');
		statusBarInner.classList.remove("is-active");
	});
}

if (window.innerWidth >= 600) {
	openFilterBtns.forEach(button => {
		button.addEventListener('click', () => {
			if (statusBarCol.classList.contains('filter-closed')) {
				statusBarCol.classList.add('filter-opened');
				statusBarCol.classList.remove('filter-closed');
			}
		});
	});

	statusBarPanel.addEventListener('click', () => {
		if (statusBarCol.classList.contains('filter-closed')) {
			statusBarCol.classList.add('filter-opened');
			statusBarCol.classList.remove('filter-closed');
		}
	});

	closeStatusBarBtn.addEventListener('click', () => {
		statusBarCol.classList.remove('filter-opened');
		statusBarCol.classList.add('filter-closed');
	});
}


