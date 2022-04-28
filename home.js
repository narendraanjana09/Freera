var version="1.0.3";
document.getElementById("version").innerHTML="v:"+version;
var div2 = document.getElementById("div2");
var div3 = document.getElementById("div3");
var login_btn = document.querySelector('.login');
var user_detail = document.querySelector('.person-detail');
var profile_img = document.querySelector('.profile');
var name_tv = document.querySelector('.name');
var email_tv = document.querySelector('.email');
const developerBtn=document.querySelector('.developerBtn');



function goToAppoint() {
 
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
function onSignIn(profile,location) {
        console.log('ID: ' + profile.uid);
        console.log('Full Name: ' + profile.displayName);
        console.log('Image URL: ' + profile.photoURL);
        console.log('Email: ' + profile.email);
        name_tv.innerHTML =profile.displayName;
        email_tv.innerHTML=profile.email;
        profile_img.src = profile.photoURL;
        checkData(profile,location)
      
}
function checkData(profile,location){
    
var ref = firebase.database().ref("users/users").child(profile.uid);
ref.once("value")
  .then(function(snapshot) {
    if(snapshot.exists()){
        console.log("user data exist in firebase.")
        if(location)
        window.location=location;
       
    }else{
        console.log("user data  found");
        var userData = {
            uid:profile.uid,
            name: profile.displayName,
            email: profile.email,
            profileUrl: profile.photoURL,
            joinDate:getTimeStamp()
          };
        firebase
        .database()
        .ref("users")
        .child("users")
        .child(profile.uid).set(userData, (error) => {
          if (error) {
            alert("error");
           
          } else {
            var userNow = firebase.auth().currentUser;
            userNow.updateProfile({
            displayName: profile.displayName,
            photoURL: profile.photoURL
          }).then(function() {
            if(location)
            window.location=location;
           console.log("firebase profile updated");
           
          }, function(error) {
            console.log("firebase profile updated error "+error);
          
          });
          }
        });
    }
  });
    
}
function getTimeStamp(){
    var currentdate = new Date();
  const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
  };
  const time = new Intl.DateTimeFormat('en-US', options).format(currentdate)
  var id =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
       time;
  
        return id;
  }
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

function openDevelopersPage(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            window.location='developers/home.html';
        }else{
            if(window.confirm("Login to Continue!")){
                firebase.auth().signInWithPopup(provider).then(res =>{
                    console.log(res.user)
                    onSignIn(res.user,'developers/home.html')
                    
                }).catch(e =>{
                    console.log(e)
                })
            }
        }
    })
}
function openPostProject(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            window.location='post_project/project.html';
        }else{
            if(window.confirm("Login to Continue!")){
                firebase.auth().signInWithPopup(provider).then(res =>{
                    console.log(res.user)
                    onSignIn(res.user,'post_project/project.html')
                }).catch(e =>{
                    console.log(e)
                })
            }
        }
    })
}
function openGetHired(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            checkDevUser(user,0);
        }else{
            if(window.confirm("Login to Continue!")){
                firebase.auth().signInWithPopup(provider).then(res =>{
                    console.log(res.user)
                    checkDevUser(user,1)
                }).catch(e =>{
                    console.log(e)
                })
            }
        }
    })
}
function checkDevUser(user,value){
   
    if(developerBtn.innerText=="View Projects"){
        if(value==0){
            window.location='projects/main.html';
        }else{
            onSignIn(user,'projects/main.html')
        }
    }else{
        if(value==0){
        window.location='getHired/getHired.html';
    }else{
        onSignIn(user,'getHired/getHired.html')
    }
    }
}
function checkDeveloperexist(user){
    var devRef=firebase
            .database()
            .ref("users")
            .child("developers")
            .child(user.uid);
            devRef.once("value")
  .then(function(snapshot) {
    if(snapshot.exists()){
        developerBtn.innerText="View Projects";
    }else{
        developerBtn.innerText="Get Started";   
    }
});
}

