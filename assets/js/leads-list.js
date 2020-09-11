window.AttachLeadsListHandlers = () => {
	window.toggleList = (e) => {
		var width = $(window).width();
		if ($(e).hasClass("active")) {
			$(e).hide().removeClass("active");
			return true;
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
		const contentHeight = tableRowList.clientHeight - window.innerHeight + headerHeight + searchHeight + 40;
	});


	//  Added class "dropdown-active" to an active dropdown (Leads-list page)
	$('.status-btn').click(function() {
		$('.leads-item-wrap').each(function () {
			$(this).removeClass('dropdown-active');
		});
		console.log('Active', $(this).parents('.leads-item-wrap'));
		$(this).parents('.leads-item-wrap').addClass('dropdown-active');
	});


	// When scroll page added class to the $('table-header-col') element to make table header sticky
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();

		//console.log('=>', scrollTop);
		let fixedTopPanelHeight = $('.fixed-top-panel-d').height();
		let contentSearchInputHeight = $('#content-search-input').height();
		//console.log('=>', fixedTopPanelHeight);
		//console.log('=>', contentSearchInputHeight);
		// console.log('true or false', scrollTop > $(fixedTopPanelHeight + contentSearchInputHeight).offset().top);

		if ( scrollTop > (fixedTopPanelHeight + contentSearchInputHeight) ) {
			// display add
			$('.table-header-wrap').addClass('add-underline');
			$('#content-search-input').addClass('no-underline');
		}
		else {
			$('.table-header-wrap').removeClass('add-underline');
			$('#content-search-input').removeClass('no-underline');
		}

	});

	return true;
};

AttachLeadsListHandlers();

window.AttachPopOverHandlers = () => {

	// Invokes popover (Leads list page)
	if(window.innerWidth >= 768) {
		// for desktop
		$('.notification-popover').popover({
			trigger: 'hover'
		});
	} else {
		// for mobile
		$('.notification-popover').popover({
			trigger: 'click'
		});
	}

	return true;
};

AttachPopOverHandlers();
