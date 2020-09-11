let dotNetReference;
window.SetDotNetReference = (reference) => {
    dotNetReference = reference;
    return true;
};

window.LoadHeadJsFile = (src) => {
    var script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
    return true;
};

window.LoadBodyJsFile = (src) => {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
    return true;
};

window.disableScroll = () => {
    $("body").addClass("overflow-hidden");
};

window.enableScroll = () => {
    $("body").removeClass("overflow-hidden");
};


window.MoveToTop = (id, trIndex) => {

    $([document.documentElement, document.body]).animate({
        scrollTop: (44 * trIndex) + 40
    }, 200);

    return true;
};

window.OpenSelectFileDialog = (id) => {
    document.getElementById(id).click();
}

window.RefreshPage = () => {
    location.reload();
    return true;
};

function validateSignIn() {

    document.getElementById("SigninBtn").disabled = true;
    reloadon(SigninBtnSpinner);
    reloadoff(SigninBtnNext);


    var fields = document.SignIn;
    var ErrorCount = 0;

    if (validateEmail(fields.userEmail.value) == false) {
        document.getElementById("SignInErrorEmail").innerHTML = '<span>Please enter valid <span class="font-weight-bold">email address</span></span>';
        reloadon(SignInErrorEmail);
        fields.userEmail.focus();
        ErrorCount++;
    } else {
        reloadoff(SignInErrorEmail);
    }
    var resMsg = validatePassword(fields.userPassword);
    if (resMsg != "NoError") {
        document.getElementById("SignInErrorPassword").innerHTML = '<span>' + resMsg.replace('Password', '<span class="font-weight-bold">Password</span>');
        reloadon(SignInErrorPassword);
        fields.userPassword.focus();
        ErrorCount++;
    } else {
        reloadoff(SignInErrorPassword);
    }

    if (ErrorCount == 0) {
        return true;
    }
    else {
        reloadon(SigninBtnNext);
        reloadoff(SigninBtnSpinner);
        document.getElementById("SigninBtn").disabled = false;
        return false;
    }
}


AddAntiForgeryToken = function (data) {
    data.__RequestVerificationToken = $('#__AjaxAntiForgeryForm input[name=__RequestVerificationToken]').val();
    return data;
};

function validateSignUp() {

    document.getElementById("SignupBtn").disabled = true;
    reloadon(SignupBtnSpinner);
    reloadoff(ServerErrorMessage);
    reloadoff(SignupBtnNext);


    var fields = document.SignUpForm;
    var ErrorCount = 0; 

    if (validateName(fields.customerName.value) == false) {
        document.getElementById("SignUpErrorUserName").innerHTML = '<span><span class="font-weight-bold">Name</span> should not be empty</span>';
        reloadon(SignUpErrorUserName);
        fields.customerName.focus();
        ErrorCount++;
    } else {
        reloadoff(SignUpErrorUserName);
    }

    var resMsg = validatePhone(fields.customerPhone);
    if (resMsg != "NoError") {
        document.getElementById("SignUpErrorPhone").innerHTML = '<span>' + resMsg.replace('Phone Number', '<span class="font-weight-bold">Phone Number</span>');
        reloadon(SignUpErrorPhone);
        fields.customerPhone.focus();
        ErrorCount++;
    } else {
        reloadoff(SignUpErrorPhone);
    }

    if (validateEmail(fields.customerEmail.value) == false) {
        document.getElementById("SignUpErrorEmail").innerHTML = '<span>Please enter valid <span class="font-weight-bold">email address</span></span>';
        reloadon(SignUpErrorEmail);
        fields.customerEmail.focus();
        ErrorCount++;
    } else {
        reloadoff(SignUpErrorEmail);
    }

    if (ErrorCount == 0) {
        if (document.getElementById("customerTerms").checked == false) {
            document.getElementById("SignUpErrorTerms").innerHTML = '<span>Please read and agree to Terms and Conditions</span>';
            reloadon(SignUpErrorTerms);
            fields.customerName.focus();
            ErrorCount++;
        } else {
            reloadoff(SignUpErrorTerms);
        }
    }


    if (ErrorCount == 0) {
        signUpAjaxCall();
        return false;
    }
    else {
        reloadon(SignupBtnNext);
        reloadoff(SignupBtnSpinner);
        document.getElementById("SignupBtn").disabled = false;
        return false;
    }

}

function signUpAjaxCall() {
    $.ajax({
        type: "post",
        url: $(this).attr("rel"),
        data: AddAntiForgeryToken($('#SignUpForm').serialize()),
        success: function (response) {
            if (response == "ok") {
                window.location.reload();
                //reloadoff(AccountSignUpDiv);
                //reloadon(AccountVerificationDiv);
            }
            else {
                document.getElementById("ServerErrorMessage").innerHTML = '<span>' + response + '</span>';
                reloadon(ServerErrorMessage);
                reloadon(SignupBtnNext);
                reloadoff(SignupBtnSpinner);
                document.getElementById("SignupBtn").disabled = false;
            }
        }
    });
}





function validateSmsVerification() {

    document.getElementById("VerificationBtn").disabled = true;
    reloadon(VerificationBtnSpinner);
    reloadoff(VerificationErrorMessage);
    reloadoff(VerificationBtnNext);


    var fields = document.SmsVerificationForm;
    var ErrorCount = 0;

    var VerificationCode = fields.Verification_1.value + fields.Verification_2.value + fields.Verification_3.value + fields.Verification_4.value ;
    fields.smsVerifyCode.value = VerificationCode;

    if (VerificationCode.length != 4) {
        document.getElementById("VerificationErrorMessage").innerHTML = '<span><span class="font-weight-bold">Verification Code</span> should be 4 digits</span>';
        reloadon(VerificationErrorMessage);
        fields.Verification_1.focus();
        ErrorCount++;
    } else {
        reloadoff(VerificationErrorMessage);
    }
  

    if (ErrorCount == 0) {
        validateSmsAjaxCall();
        return false;
    }
    else {
        reloadon(VerificationBtnNext);
        reloadoff(VerificationBtnSpinner);
        document.getElementById("VerificationBtn").disabled = false;
        return false;
    }

}

function validateSmsAjaxCall() {
    $.ajax({
        type: "post",
        url: $(this).attr("rel"),
        data: AddAntiForgeryToken($('#SmsVerificationForm').serialize()),
        success: function (response) {

            if (response == "ok") {
                window.location.href = '/Dashboard';
            }
            else {
                document.getElementById("VerificationErrorMessage").innerHTML = '<span>' + response + '</span>';
                reloadon(VerificationErrorMessage);
                reloadon(VerificationBtnNext);
                reloadoff(VerificationBtnSpinner);
                document.getElementById("VerificationBtn").disabled = false;
            }
        }
    });
}
document.addEventListener('readystatechange', event => {

    // When HTML/DOM elements are ready:
    //if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
    //alert("hi 1");
    //}

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        var body = $('#SmsVerificationForm');
        body.on('keyup', 'input', goToNextInput);
        body.on('keydown', 'input', onKeyDown);
        body.on('click', 'input', onFocus);


        function goToNextInput(e) {
            var key = e.which,
                t = $(e.target),
                sib = t.next('input');


            if (key === 9 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                
            }
            else {
                e.preventDefault();
                return false;
            }

            if (key === 9) {
                return true;
            }

            if (!sib || !sib.length) {
                sib = body.find('input').eq(0);
            }
            sib.select().focus();
        }

        function onKeyDown(e) {
            var key = e.which;

            if (key === 9 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
                return true;
            }

            e.preventDefault();
            return false;
        }

        function onFocus(e) {
            $(e.target).select();
        }


    }
});


function validatePassword(pass) {
    var error = "";
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var hasSymbols = /[!@#$%^&*()_+=\[{\]};:<>|./?,-]/g;

    if (pass.value == "" || pass.value == null) {
        error = "Password should not be empty.";
    } else if ((pass.value.length < 8)) {
        error = "Password should not be less than than 8 characters";
    } else if ((pass.value.length > 12)) {
        error = "Password should not be greater than than 12 characters";
    } else if (!pass.value.match(lowerCaseLetters)) {
        error = "Password should contain At least one lower case letter";
    } else if (!pass.value.match(upperCaseLetters)) {
        error = "Password should contain At least one upper case letter";
    } else if (!pass.value.match(numbers)) {
        error = "Password should contain At least one numeric value";
    } else if (!pass.value.match(hasSymbols)) {
        error = "Password should contain At least one special case characters";
    } else {
        error = "NoError";
    }

    return error;
}
function validateNotEmptyPassword(pass) {
    if (pass.value == "" || pass.value == null) {
        error = "Password should not be empty!.";
    }else {
        error = "NoError";
    }

    return error;
}
function validateName(Name) {
    var error = true;

    if (Name == "" || Name == null) {
        error = false;
    } 

    return error;
}
function validatePhone(Phone) {
    var phonePattern = /(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/;
        
    if (Phone.value == "" || Phone.value == null) {
        error = "Phone Number should not be empty.";
    } else if ((Phone.value.length != 16)) {
        error = "Phone Number should not be less than 10 digits";
     } else if (!Phone.value.match(phonePattern)) {
         error = "Invalid Phone Number Please re-enter using valid 10 digit number";
     } else {
        error = "NoError";
    }

    return error;
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function reloadon(c) {
    c.style.display = "";
}
function reloadoff(c) {
    c.style.display = "none";
}



/*

function openNav() {
    $(".main-wrapper").css("z-index", 0);
    document.getElementById("mySidebar").style.left = "0px";
    document.querySelectorAll(".sidebar-overlay")[0].style.display = "block";
    $(".sidebar-overlay").attr("navIsOpen", "true");


}

function closeNav() {

    document.getElementById("mySidebar").style.left = "-500px";
    document.getElementById("main").style.marginLeft = "0";
    document.querySelectorAll(".sidebar-overlay")[0].style.display = "none";
    $(".main-wrapper").css("z-index", "");
}

function openSideBar() {
    console.log('added');
    $(".sidebar-overlay").attr("navIsOpen", "true");
    $(".main-wrapper-inner").addClass("active");
}

function closeSideBar() {
    $(".sidebar-overlay")[0].style.display = "none";
    $(".main-wrapper-inner").css("z-index", "");
    $(".main-wrapper-inner").removeClass("active");
    $(".sidebar-overlay").attr("navIsOpen", "false");
}


window.openInFixedPostion = (element) => {

    $("." + element).addClass("fix-popup").css("z-index", "99999");
    $("." + element).addClass(element + "-fixed");

    $("." + element).animate({
        width: '100vw',
        height: '100vh',
        top: '0px',
        left: '0px',
        padding: '20px'
    }, 200);

    setTimeout(function () {
        $(".table-actions").css("display", "flex");
        $(".filtersTabs").css("display", "block");
        $(".filter-panel-elements").css("background", "white");
        $(".filter-collapse-tab").css("display", "none");
        $(".header-mobile").css({
            "display": "none",
            "visibility": "hidden"
        });
    }, 200);


};

window.closeFixedPostion = (element) => {
    $(".header-mobile").css({
        "display": "flex",
        "visibility": "visible",
    });
    $("." + element).removeClass(element + "-fixed");
    $("." + element).removeClass("fix-popup");
    $("." + element).attr("style", "");
    $(".table-actions").attr("style", "");
    $(".close-popup").hide();

};


window.closeLeadFixedPostion = () => {
    $(".table-actions").css("display", "none");
};




//this is just a temp function for tabs
function opentemp(event) {
    var id = event.target.id;
    $(".hide-this").hide();
    $("#" + id + id).show();
}

function openStatusItem(event) {
    var attr = $(event.currentTarget).attr("isOpen");
    if (typeof attr === typeof undefined) {
        var EmptyDivPosition = $(event.currentTarget).offset().top - $('.wrapper').offset().top;
        var contentHeight = $(".wrapper").height() - $(".wrapper .item").height();


        $('.wrapper').addClass('active');
        $('.wrapper .item').removeClass('active').removeClass('margin');
        $('.close').fadeOut(300);
        $(event.currentTarget).addClass('active').addClass('margin');

        $(".content").css("background", "white");

        $(event.currentTarget).animate({
            top: "-" + EmptyDivPosition
        }, 500, function () {



            $(event.target).siblings(".content").delay(800).slideToggle(700, function () {
                //$(this).css('min-height', contentHeight);
                $('.wrapper .item:not(.active)').css('opacity', '0');
                $(event.currentTarget).css("text-align", "center");
            });

            $(".active").css("text-align", "center");
        });
        $('.close', event.currentTarget).delay(700).fadeIn(300);
        $(event.currentTarget).attr("isOpen", "true");
        $(event.currentTarget).css("cursor", "auto");
    }
}


function closeStatusList(event) {
    event.stopPropagation();
    $('.wrapper').removeClass('active');
    $('.item').find(".content").hide();
    $(".active").css("text-align", "left");
    $('.item').animate({
        top: "0px"
    });
    $('.item').removeClass('active').removeClass('margin');
    $('.close').fadeOut(300);
    $(".item").removeAttr("isOpen");
    $(".item").css("cursor", "pointer");
    $(".content").removeAttr("style");
    $('.item').css('opacity', '1');
}

function saveAsFile(filename, bytesBase64) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = "data:application/octet-stream;base64," + bytesBase64;
    document.body.appendChild(link); // Needed for Firefox
    link.click();
    document.body.removeChild(link);
}

window.collapseExtendFilter = () => {
    if ($(".filter-expand").hasClass("isCollapse")) {
        $(".filter-expand").css('visibility', 'hidden');
        $(".filter-panel-wrap").animate({
            "width": "250px"
        });
        $(".filter-elements").css("background", "white");

        setTimeout(function () {
            $(".filter-expand").hide();
            $(".filtersTabs").show();
            $(".collapse-filter-icon, .filter-action, .hr-gray, .user-action").css("visibility", "visible");
            $(".filter-elements").show();
            $(".filter-collapse-tab").show();


        }, 400);
        $("#fa-angle").removeClass("fad fa-angle-right").addClass("fad fa-angle-left");
        $(".filter-expand").removeClass("isCollapse");
   
    } else {
        
        $(".filtersTabs").hide();
        $(".filter-expand").css('visibility', 'visible');
        $(".filter-expand").css("display", "flex");
        $(".filter-panel-wrap").animate({
            "width": "50px"
        });
        $(".filter-panel-wrap").addClass("sticky-filter-collapse");
        $(".collapse-filter-icon, .filter-action, .hr-gray, .user-action").css("visibility", "hidden");
        $(".filter-elements").css("background", "unset");
        $(".filter-expand").addClass("isCollapse");
        $("#fa-angle").removeClass("fad fa-angle-left").addClass("fad fa-angle-right");
    }
  
};





window.togglePanel = (e) => {
    var width = $(window).width(); 
    if ($(e).hasClass("active")) {
        $(e).hide().removeClass("active");
        return;
    }
    if ($(".tab-panel").hasClass("active")) { 
        $(".tab-panel").hide().removeClass("active");
        $(e).addClass("active").show();     
    } else {
        $(".tab-panel").removeClass("active");
        $(e).addClass("active");
        $(e).show();
    }
};


window.addEventListener("resize", myFunction);

function myFunction() {
    var width = $(window).width(); 
    if (width >= 1300) {
        $(".tab-panel").show();
    } else {
        $(".loggin-panel").addClass("active");
    }
    if (width <= 600) {
        $(".lead-data-panel").addClass("tab-panel");
    } else {
        $(".lead-data-panel").removeClass("tab-panel");
    }
}



window.SetCookie = (c_name, c_value, ex_days) => {
    var d = new Date();
    d.setTime(d.getTime() + (ex_days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
    return true;
};

window.GetCookie = (c_name) => {
    var name = c_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "{\"isLoggedIn\":false,\"ID\":-1,\"displayName\":\"\",\"companyName\":\"\",\"email\":\"\",\"imageFile\":\"\",\"hash\":\"\"}";
};

window.DelCookie = (c_name) => {
    var d = new Date();
    d.setTime(d.getTime() - 100);
    var expires = "expires=" + d.toUTCString();
    document.cookie = c_name + "=" + "" + ";" + expires + ";path=/";
    return true;
};

var map;

window.setMapLocation = (latCoord, longCoord) => {
    var latLng = new google.maps.LatLng(latCoord, longCoord);
    initMap(latLng);
}


function initMap(location) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 12,
        styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#ebe3cd"
            }]
        },
        {
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#523735"
            }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f1e6"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#c9b2a6"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#dcd2be"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ae9e90"
            }]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#93817c"
            }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#a5b076"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#447530"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f1e6"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#fdfcf8"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f8c967"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#e9bc62"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e98d58"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#db8555"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#806b63"
            }]
        },
        {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#8f7d77"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ebe3cd"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dfd2ae"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#b9d3c2"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#92998d"
            }]
        }
        ]
    });

    var contentString = "amit";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

}

var setTooltip = setTimeout(function () {
    $("i").tooltip();
}, 5000);

window.showSortMenu = (id, e) => {
    $("th").removeClass("show-sort");
    $(e.currentTarget).addClass("show-sort");

    $(".sort-menu").hide();
    var attr = $(e.currentTarget).attr('isOpen');
    if (typeof attr !== typeof undefined && attr !== false) {
        $("#" + id).hide();
        $(e.currentTarget).removeAttr("isOpen");
        $(e.currentTarget).removeClass("show-sort");
        return;
    }
    $("#" + id).show();
    $("th").removeAttr("isOpen");
    $(e.currentTarget).attr("isOpen", "true");
}
*/