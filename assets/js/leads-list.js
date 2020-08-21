window.toggleList = (e) => {
	var width = $(window).width();
	if ($(e).hasClass("active")) {
		$(e).hide().removeClass("active");
		return;
	}

	if ($(".toggle-panel").hasClass("active")) {
		$(".toggle-panel").hide().removeClass("active");
		$(e).addClass("active").show();
	}	else {
		$(".toggle-panel").removeClass("active");
		$(e).addClass("active");
		$(e).show();
	}
};

window.addEventListener("resize", myFunction);

function myFunction() {
	let width = $(window).width();
	if (width >= 1300) {
		$(".toggle-panel").show();
	} else {
		$(".activity-list").addClass("active");
	}

	if (width <= 600) {
		$(".list-outer").addClass("tab-panel");
	} else {
		$(".list-outer").removeClass("tab-panel");
	}
}



// let windowHeight = $(window).height();
let tableRowList = document.querySelector('.table-row-list');
let tableRowListHeight = tableRowList.clientHeight;
const leadsListCol = document.querySelector('.leads-list-col');
const header = document.querySelector('.fixed-top-panel-d');
let statusBar = document.querySelector('.status-bar');
let statusBarHeight = statusBar.clientHeight;
const headerHeight = header.clientHeight;
const search = document.querySelector('.search');
const searchHeight = search.clientHeight;


// function gotoBottom(className){
// 	let element = document.getElementsByClassName(className);
// 	element.scrollTop = element.scrollHeight - element.clientHeight;
// }


document.addEventListener('scroll', () => {
	let scroll = $(document).scrollTop();
	let leftContentHeight = statusBarCol.innerHeight;
	let rightContentHeight = leadsListCol.innerHeight;
	// console.log('=>', statusBarHeight > tableRowListHeight);

	// console.log('SCROLL', scroll);
	const contentHeight = tableRowList.clientHeight - window.innerHeight + headerHeight + searchHeight + 40;

	if(statusBarCol.classList.contains('filter-opened')) {
		// console.log('Filter is open!');
		if (statusBarHeight > tableRowListHeight) {
			// tableRowList.classList.add('fixed-position');
			// console.log('1.fixed position added');
		} else {
			// console.log('1');
			// tableRowList.classList.remove('fixed-position');
		}
	} else {
		// console.log('Filter is close!');
		if (statusBarHeight > tableRowListHeight) {
			// console.log('status bar High!');
			// console.log(statusBarHeight, tableRowListHeight);
			// tableRowList.classList.add('fixed-position');
			// console.log('2.fixed position added');
		} else {
			// console.log('Status bar is NOT High!');
			// tableRowList.classList.remove('fixed-position');
		}
	}

	if (statusBarHeight > tableRowListHeight) {
		// console.log(statusBarHeight, tableRowListHeight);
		// if(scroll > contentHeight) {
		// 	console.log(contentHeight, scroll);
		// 	// tableRowList.classList.add('fixed-position');
		// 	// if(!statusBarCol.classList.contains('filter-opened')) {
		// 	// 	return;
		// 	// } else {
		// 	// 	tableRowList.classList.add('fixed-position');
		// 	// }
		//
		// }
	}
	// if(scroll > contentHeight) {
	// 	console.log(contentHeight, scroll);
	// 	// tableRowList.classList.add('fixed-position');
	// 	if(!statusBarCol.classList.contains('filter-opened')) {
	// 		return;
	// 	} else {
	// 		tableRowList.classList.add('fixed-position');
	// 	}
	//
	// }
	// else {
	// 	console.log(2);
	// 	tableRowList.classList.remove('fixed-position');
	// }

	// console.log(
	// 	"=>",
	// 	scroll,
	// 	tableRowList.clientHeight,
	// 	window.innerHeight,
	// 	tableRowList.clientHeight - window.innerHeight + headerHeight + searchHeight + 40
	// );
});



