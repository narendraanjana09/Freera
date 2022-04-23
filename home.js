var version="0.0.7";
console.log(version)
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
        console.log('ID: ' + profile.uid);
        console.log('Full Name: ' + profile.displayName);
        console.log('Image URL: ' + profile.photoURL);
        console.log('Email: ' + profile.email);
        name_tv.innerHTML =profile.displayName;
        email_tv.innerHTML=profile.email;
        profile_img.src = profile.photoURL;
}
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
function openGetHired(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            window.location='getHired/getHired.html';
        }else{
            if(window.confirm("Login to Continue!")){
                firebase.auth().signInWithPopup(provider).then(res =>{
                    console.log(res.user)
                    onSignIn(res.user)
                    window.location='getHired/getHired.html';
                }).catch(e =>{
                    console.log(e)
                })
            }
        }
    })
    
}

