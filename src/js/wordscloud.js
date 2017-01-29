

//-----WORDS CLOUD---------
$(document).ready(function() {

  var
    words = $('#tagi text'),
    l = words.length,
    current = null,
    delay = 2000;

  function clearBlink(o) {
    var
      ca = o.getAttribute('class').split(' '),
      i = ca.indexOf('blink');

    if (i !== -1) {
      ca.splice(i, 1);
      o.setAttribute('class', ca.join(' '));
    }
  }

  function addBlink(o) {
    var
      ca = o.getAttribute('class').split(' ');
    ca.push('blink');
    o.setAttribute('class', ca.join(' '));
  }

  function wordblink() {

    var e;

    if (current !== null) {
      clearBlink(words.eq(current)[0])
    }

    current = Math.floor(Math.random() * l);
    e = words.eq(current);
    addBlink(e[0]);

    setTimeout(wordblink, delay);
  }

  wordblink();

});

///////////////////////////////////////////////////
//  accordion//
//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
      case "true":
      	setAriaAttr(el1, 'aria-expanded', 'true');
      	setAriaAttr(el2, 'aria-hidden', 'false');
      	break;
      case "false":
      	setAriaAttr(el1, 'aria-expanded', 'false');
      	setAriaAttr(el2, 'aria-hidden', 'true');
      	break;
      default:
				break;
		}
	};
//function
switchAccordion = function(e) {
  console.log("triggered");
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
		setAccordionAria(thisQuestion, thisAnswer, 'true');
	} else {
		setAccordionAria(thisQuestion, thisAnswer, 'false');
	}
  	thisQuestion.classList.toggle('is-collapsed');
  	thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
 	
  	thisAnswer.classList.toggle('animateIn');
	};
	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();