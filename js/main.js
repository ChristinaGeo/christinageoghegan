//sticky nav
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
window.addEventListener('scroll', fixNav);

// Smooth Scrolling
$(function() {
  $('content a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDudd1GwzQmULFs9J9tZ8W2WW-SWt4uqzU",
  authDomain: "cgcontactform.firebaseapp.com",
  databaseURL: "https://cgcontactform.firebaseio.com",
  projectId: "cgcontactform",
  storageBucket: "cgcontactform.appspot.com",
  messagingSenderId: "389730786949"
};
firebase.initializeApp(config);

//reference messages collection, tables
var messagesRef = firebase.database().ref('messages');

  //Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);

  function submitForm(e){
   e.preventDefault();

   //get values
   var name = getInputVal('name'); 
   var email = getInputVal('email');
   var message = getInputVal('message');

   //save
   saveMessage(name, email, message);
  }

  //function to get form values
  function getInputVal(id){
 return document.getElementById(id).value;
  }

  //function to save message to firebase
  function saveMessage(name, email, message){
 var newMessageRef = messagesRef.push();
 newMessageRef.set({
  name: name,
  email: email,
  message: message 
 });
  }



