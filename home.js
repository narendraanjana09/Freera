var version="0.0.3";
var div2 = document.getElementById("div2");
var div3 = document.getElementById("div3");

var login_btn = document.querySelector('.login');
var user_detail = document.querySelector('.person-detail');
var profile_img = document.querySelector('.profile');
var name_tv = document.querySelector('.name');
var email_tv = document.querySelector('.email');



function goToAppoint() {
    firebase
  .database()
  .ref("museum")
  .child("room").set('two');
div2.scrollIntoView({behavior: "smooth"});

}
function goToHireMe() {
    div3.scrollIntoView({behavior: "smooth"});
}
function goTOP(){
    window.scroll({top: 0, behavior: "smooth"})
}
function viewLeaderBoard(){
    location.href ='./leaderboard/leader.html';
}
function onSignIn(profile) {

        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        name_tv.innerHTML =profile.getName();
        email_tv.innerHTML=profile.getEmail();
        profile_img.src = profile.getImageUrl();
    
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}