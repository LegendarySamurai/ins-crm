$(document).ready(function () {
    /*
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    */

    $('#home a').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

});

window.MoveToTop = (id, trIndex) => {

    $([document.documentElement, document.body]).animate({
        scrollTop: (44 * trIndex) + 40
    }, 200);

    return true;
};


window.RefreshPage = () => {
    location.reload();
    return true;
};


function validateSignIn() {

    var fields = document.SignIn;
    var ErrorCount = 0;

    var resMsg = validatePassword(fields.userPassword);
    if (resMsg != "NoError") {
        document.getElementById("SignInErrorPassword").innerHTML = resMsg;
        reloadon(SignInErrorPassword);
        fields.userPassword.focus();
        ErrorCount++;
    } else {
        reloadoff(SignInErrorPassword);
    }

    if (validateEmail(fields.userEmail.value) == false) {
        reloadon(SignInErrorEmail);
        fields.userEmail.focus();
        ErrorCount++;
    } else {
        reloadoff(SignInErrorEmail);
    }
    if (ErrorCount == 0) {
        return true;
    }
    else {
        return false;
    }
}
function validateSignUp(event) {

    var fields = document.SignIn;
    var ErrorCount = 0; 
    
    var resMsg = validatePassword(fields.userPassword);
    
    if (resMsg != "NoError") {
        document.getElementById("SignInErrorPassword").innerHTML = resMsg;
        reloadon(SignInErrorPassword);
        fields.userPassword.focus();
        ErrorCount++;
        //event.preventDefault();
    } else {
        reloadoff(SignInErrorPassword);
    }

    if (validateEmail(fields.userEmail.value) == false) {
        reloadon(SignInErrorEmail);
        fields.userEmail.focus();
        ErrorCount++;
        //event.preventDefault();
    } else {
        reloadoff(SignInErrorEmail);
    }
    //alert("name->" + fields.userName.value);
    if (validateName(fields.userName.value) == false) {
        //alert("name-> Error");
        reloadon(SignInErrorName);
        fields.userName.focus();
        ErrorCount++;
        //event.preventDefault();
    } else {
        reloadoff(SignInErrorName);
    }
    //alert(ErrorCount);
    if (ErrorCount == 0) {
        return true;
    }
    else {
        //event.preventDefault();
        return false;
    }
}

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
function validateName(Name) {
    var error = true;

    if (Name == "" || Name == null) {
        error = false;
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



window.lockWindow = () => {
    $("body").addClass("overflow-hidden");
};

window.releaseWindow = () => {
    $("body").removeClass("overflow-hidden");
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


////wehater
//var city, lat, lon, apiUrl;

//window.addEventListener("load", function () {
//    getGeoLocation("https://api.ipdata.co/?api-key=565e4d0e5329609464a995a1d828b97341e2867b20e97fefc676d863", 3, 1);
//    var loadWeather = setTimeout(function () {
//        var weatherJson = getWeatherDetails(apiUrl, 3, 1);
//    }, 2000);
//});


//function getGeoLocation(url, numberOfRuns, currentRun) {
//    var geoLocation = GetCookie("geoLocation");
//    if (geoLocation.length < 5) {
//        if (currentRun <= numberOfRuns) {
//            $.ajax({
//                url: url,
//                success: function (data) {
//                    //todo insert to coockie
//                    var geoLocation = {};
//                    geoLocation.lat = data.latitude;
//                    geoLocation.lon = data.longitude;

//                    SetCookie("geoLocation", JSON.stringify(geoLocation), 20);
//                    apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + data.latitude + "&lon=" + data.longitude + "&appid=c78c613799583afdf09dd8264d45ea20&units=imperial";
//                },
//                error: function (xhr, status, error) {
//                    getGeoLocation(url, 3, 1);
//                }
//            });
//        } else {
//            console.log("ajax error");
//        }
//    } else {
//        var geLocation = JSON.parse(geoLocation);
//        apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + geLocation.lat + "&lon=" + geLocation.lon + "&appid=c78c613799583afdf09dd8264d45ea20&units=imperial";

//    }
//}

////weather app
//function getWeatherDetails(url, numberOfRuns, currentRun) {
//    $.getJSON(url, function (data) {
//        $("#city").html(data.name);
//        $("#temp").html(data.main["temp"] + "<span class='c-ico'>&#8457;</span>");
//        $("#date").html(formatDate(new Date()));
//        $("#icon img").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
//    });

//}



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