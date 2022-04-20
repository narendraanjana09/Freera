var div2 = document.getElementById("div2");
var div3 = document.getElementById("div3");

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
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

