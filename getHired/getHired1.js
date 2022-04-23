//declearing html elements

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const name_ed = document.querySelector('#name_ed');
const email_ed = document.querySelector('#email_ed');
const address_ed = document.querySelector('#address_ed');
const phone_ed = document.querySelector("#phone");
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//if user hover on img div 
function checkUserAuth(){
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            console.log("true");
            img.setAttribute('src', user.photoURL);
            name_ed.value=user.displayName;
            email_ed.value=user.email;
        }else{
            console.log("false");
        }
    })
}
window.onload = (event) => {
    console.log('page is fully loaded');
  };
checkUserAuth()

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a foto to upload

file.addEventListener('change', function(){
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);

        //Allright is done

        //please like the video
        //comment if have any issue related to vide & also rate my work in comment section

        //And aslo please subscribe for more tutorial like this

        //thanks for watching
    }
});

function getIp(callback) {
    fetch('https://ipinfo.io/json?token=<your token>', { headers: { 'Accept': 'application/json' }})
      .then((resp) => resp.json())
      .catch(() => {
        return {
          country: 'us',
        };
      })
      .then((resp) => callback(resp.country));
   }


const phoneInput = window.intlTelInput(phone_ed, {
    initialCountry: "in",
    geoIpLookup: getIp,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// function next(){
//     const phoneNumber = phoneInput.getNumber();
//     alert(phoneNumber);
// }
 const next = document.querySelector(".next"),
form1 = document.querySelector(".form1"),
form2 = document.querySelector(".form2"),
form3 = document.querySelector(".form3"),
back = document.querySelector(".back");
var counter=0;

next.addEventListener("click", ( )=>{  
    if(counter==0){
        form2.style.width = "80%";
        form1.style.width = "0%";
        counter++;
    }else if(counter==1){
        form2.style.width = "0%";
        form3.style.width = "80%";
        counter++;
    } 
    
});

back.addEventListener("click", ( )=>{
  
    if(counter==0){
    
       if( history.back()==null){
        window.location='/index.html';
       }else{
           history.back();
       }
    }else if(counter==1){
    form2.style.width = "0%";
    form1.style.width = "80%";
    counter--;
    }else if(counter==2){
        form2.style.width = "80%";
        form3.style.width = "0%";
        counter--;
    }
   
});
