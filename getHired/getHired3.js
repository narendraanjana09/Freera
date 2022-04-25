
console.log("getHired version 1");
const pdf=document.querySelector('#pdf');
const file_name_ed=document.querySelector('.file-name')
const link1_ed=document.querySelector('#link1_ed');
const link2_ed=document.querySelector('#link2_ed');

function pdfSelected(){
   
      console.log('Selected file: ' + pdf.files.item(0).name);
      file_name_ed.innerHTML=pdf.files.item(0).name;
      console.log('Selected file: ' + pdf.files.item(0).size);
      console.log('Selected file: ' + pdf.files.item(0).type);
}
var userData = {
    uid:"",
    name: "",
    email: "",
    address: "",
    number: "",
    profileUrl: "",
    field: "",
    bio: "",
    skills:[],
    resumeUrl:"",
    links:[],
    joinDate:""
  };

const next = document.querySelector(".next"),
form1 = document.querySelector(".form1"),
form2 = document.querySelector(".form2"),
form3 = document.querySelector(".form3"),
back = document.querySelector(".back");
var counter=0;

next.addEventListener("click", ( )=>{ 
    var fuser=firebase.auth().currentUser;
    var img_src=img.src;
    var name =name_ed.value;
    var email=email_ed.value;
    var address=address_ed.value;
    var phoneNumber = phoneInput.getNumber();
    var e = document.getElementById("field_select");
    var field = e.options[e.selectedIndex].text;
    var bio=bio_ed.value;
    // tags.length

    userData.uid=fuser.uid;
    userData.name=name;
    userData.email=email;
    userData.number=phoneNumber;
    userData.profileUrl=img_src
    userData.address=address;
    userData.uid=fuser.uid;
    userData.bio=bio;
    userData.field=field;
    userData.skills=tags;
    userData.links=[link1_ed.value,link2_ed.value];
    userData.joinDate=getTimeStamp()

    console.log(userData)
    if(counter==0){
        if(checkFirst(name,email,phoneNumber)){
        form2.style.width = "80%";
        form1.style.width = "0%";
        counter++;
       }
    }else if(counter==1){
        
        if(checkSecond(e.selectedIndex,bio,tags.length)){
        form2.style.width = "0%";
        form3.style.width = "80%";
        counter++;
    }
    }else if(counter==2){
        if(pdf.files.length != 0 ){
          var resumeName=pdf.files.item(0).name;
          if(userData.profileUrl != fuser.photoURL){
            uploadProfilePhoto(userData);
          }else{
            uploadResume(userData);
          }
         
          
        }else{
            alert("select your resume")
        }
       
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

function checkFirst(name,email,phoneNumber){
    if(!name){
        alert("name can't be empty");
        return false;
    }
    if(!email){
        alert("email can't be empty");
        return false;
    }
    if(!phoneNumber){
        alert("phoneNumber can't be empty");
        return false;
    }
    return true;
  }
function checkSecond(index,bio,tags){
    if(index==0){
        alert("select your field! ")
        return false;
    }
    if(!bio){
        alert("enter your bio! ")
        return false;
    }
    if(tags<3){
        alert("enter atleast 3 skills")
        return false;
    }
    return true;
}

function uploadProfilePhoto(userData){
  showProgress();
  const file = document.getElementById("file").files[0];
  const metadata = {
    contentType: file.type,
  };

 
  const referenceImage = firebase.storage().ref().child("users").child(userData.uid);

  const uploadTask = referenceImage.child("profile").put(file, metadata);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      hideProgress();
      switch (error.code) {
        case "storage/unauthorized":
          alert("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          alert("User canceled the upload");
          break;

        // ...

        case "storage/unknown":
          alert(" Unknown error occurred, inspect error.serverResponse");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        userData.profileUrl=downloadURL;
        uploadResume(userData);
        // homeImageRef.child(id).set(homeImageItem, (error) => {
        //   hideProgress()
        //   if (error) {
        //     alert("error");
        //   } else {
        //     alert("Data saved successfully");
        //   }
        // });
      });
    }
  );
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
function  uploadResume(userData){
  showProgress();
  const file = document.getElementById("pdf").files[0];
  const metadata = {
    contentType: file.type,
  };
 
 
  const referenceImage = firebase.storage().ref().child("users").child(userData.uid);

  const uploadTask = referenceImage.child("resume").put(file, metadata);
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      hideProgress();
      switch (error.code) {
        case "storage/unauthorized":
          alert("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          alert("User canceled the upload");
          break;

        // ...

        case "storage/unknown":
          alert(" Unknown error occurred, inspect error.serverResponse");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        userData.resumeUrl=downloadURL;

       
        firebase
        .database()
        .ref("users")
        .child("developers")
        .child(userData.uid).set(userData, (error) => {
          hideProgress()
          if (error) {
            alert("error");
          } else {
            var userNow = firebase.auth().currentUser;
            userNow.updateProfile({
            displayName: userData.name,
            photoURL: userData.profileUrl
          }).then(function() {
            alert("Profile Created Successfully!");
            history.back();
           console.log("firebase profile updated");
          }, function(error) {
            console.log("firebase profile updated error "+error);
          });
            
          }
        });
      });
    }
  );
}

function showProgress(){
 document.getElementById("progress").style.display="grid";
}
function hideProgress(){
  document.getElementById("progress").style.display="none";
}
