(function() {
'use strict';
//For iFrame blocking
if (self == top) {
  // Everything checks out, show the page.
  document.documentElement.style.display = 'block';
} else {
  // Break out of the frame.
  try {
    if (self.location.href && self.location.href !== '') {
      top.location = self.location;
    }
  } catch (e) {
    // Silently handle security errors in iframe environments
    console.warn('Frame navigation blocked by security policy');
    document.documentElement.style.display = 'block';
  }
}

//For Preloading
let preLoader = document.querySelector(".preloader");
window.addEventListener('load', function(){
	preLoader.style.display = 'none';
});

//For Scroll Back To Top
let backToTop = document.getElementById("scroll-top");
window.addEventListener("scroll" ,function() {
    backToTop.classList.toggle("back-to-top", window.scrollY > 0);
});
backToTop.onclick = () => {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

//For Offcanvas Menu
 document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open');
    document.querySelector('.menu-bar').classList.toggle('fa-times');
    document.querySelector('.back-overlay').classList.toggle('back-overlay-active');
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

let navLink = document.querySelectorAll(".navbar-collapse a:not(.dropdown-toggle), .back-overlay");
let menuHeight = document.querySelector('.navbar').clientHeight;
let getSection = document.querySelectorAll('section:not(.vh-100):not(.first-section)');
let totalHeight = menuHeight * 2;
for (let i = 0; i < navLink.length; i++) {
	navLink[i].addEventListener("click", () => {
	document.querySelector(".offcanvas-collapse").classList.remove("open");
    document.querySelector('.menu-bar').classList.remove('fa-times');
    document.querySelector('.back-overlay').classList.remove('back-overlay-active');
	//For Offset Height
	getSection.forEach(x=>x.style.cssText += 'padding-top:'+totalHeight+'px !important; padding-bottom:'+menuHeight+'px !important;');
	});
}
//On MouseWheel Scroll
document.addEventListener("mousewheel", function(event){
  if(event.wheelDelta >= 0){
    getSection.forEach(x=>x.style.removeProperty('padding-top'));
    getSection.forEach(y=>y.style.removeProperty('padding-bottom'));
  }else{   
    getSection.forEach(x=>x.style.removeProperty('padding-top'));
    getSection.forEach(y=>y.style.removeProperty('padding-bottom'));
  }
});
//For First Section
document.addEventListener("DOMContentLoaded", function(){
  let getFirstSection = document.querySelector('.first-section');
  if (getFirstSection){
    getFirstSection.style.cssText +=
      "padding-top: " + totalHeight + "px!important";
  }
});

//For Fixed Navigation
window.addEventListener("scroll" ,function() {
    let header = document.querySelector(".navbar"),
		logoAtype = document.getElementById('logo-a'),
		logoBtype = document.getElementById('logo-b');
		header.classList.toggle("sticky", window.scrollY > 0);
		logoAtype.classList.toggle("d-none", window.scrollY > 0);
		logoBtype.classList.remove("d-none", window.scrollY > 0);
		logoBtype.classList.toggle("d-block", window.scrollY > 0);
});

})();
