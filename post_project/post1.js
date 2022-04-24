
var web_btn = document.querySelector('.web_btn');
var mobile_btn = document.querySelector('.mobile_btn');
var selected="";

var data_div = document.querySelector('.data_div');
var category_div = document.querySelector('.category_div');
const tagContainer = document.querySelector('.skills');
const input = document.querySelector('.skills input');
const pdf=document.querySelector('#files');
const file_name_ed=document.querySelector('.file-name')

const name_ed=document.querySelector('#name');
const desc_ed=document.querySelector('#description');
const budget_select=document.querySelector('#budget');


web_btn.addEventListener("click", ( )=>{
  selected="Web Project";
  showDataDiv();
});
function hideDataDiv(){
    data_div.style.display="none";
    category_div.style.display="block";
}
function showDataDiv(){
    data_div.style.display="block";
    category_div.style.display="none";
}
mobile_btn.addEventListener("click", ( )=>{
    selected="Mobile Project";
    showDataDiv();
});
function back(){
    if(!selected){
        history.back();
    }else{
        hideDataDiv();
    }
}

let tags = [];

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = '×';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.target.value.split(',').forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input.value = '';
    }
});
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})

input.focus();


function filesSelected(){
      file_name_ed.innerHTML=pdf.files.item(0).name;
      var children = "";
      for (var i = 0; i < pdf.files.length; ++i) {
          children += '<li>' + pdf.files.item(i).name + '</li>';
      }
      file_name_ed.innerHTML = '<ul>'+children+'</ul>';
}

var projectData = {
    pid:"",
    uid:"",
    name: "",
    description: "",
    category:"",
    skills:[],
    budget:"",
    files:[],
    postDate:""
  };

  

function postProject(){
    var fuser=firebase.auth().currentUser;
    projectData.pid=Date.now();
    projectData.uid=fuser.uid;
    projectData.name=name_ed.value;
    projectData.description=desc_ed.value;
    projectData.category=selected;
    projectData.skills=tags;
    var e = document.getElementById("budget");
    var budget = e.options[e.selectedIndex].text;
    projectData.budget=budget;
    projectData.files=pdf.files;
    projectData.postDate=getTimeStamp();

    console.log(projectData);
    if(checkData(projectData)){
        showProgress()
        if(projectData.files.length==0){
            postProjectToFirebase(projectData);
        }else{
            uploadFiles(projectData,0)
        }
    }     
}
function  uploadFiles(projectData,index){
   
    const file =pdf.files[index];
    const metadata = {
      contentType: file.type,
    };
   
   
    const referenceImage = firebase.storage()
    .ref()
    .child("users")
    .child(projectData.uid)
    .child("projects_data")
    .child(projectData.pid)
    .child(Date.now());
  
    const uploadTask = referenceImage.put(file, metadata);
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
          var link=downloadURL;
          projectData.files[index]=downloadURL;
          if(projectData.files.length==index+1){
            postProjectToFirebase(projectData);
          }else{
            uploadFiles(projectData,index+1)
          }
           
        
        });
      }
    );
  }
  
function postProjectToFirebase(projectData){

        firebase
        .database()
        .ref("projects")
        .child(projectData.category)
        .child(projectData.pid).set(projectData, (error) => {
          hideProgress()
          if (error) {
            alert("error");
          } else {
            var projectType={
              pid:projectData.pid,
              category:projectData.category
            };
            firebase
            .database()
            .ref("users")
            .child("users")
            .child(projectData.uid)
            .child("projects")
            .child(projectData.pid)
            .set(projectType);
            alert("Project Successfully Published!");
            history.back();
          }
        });
         
    
}
function showProgress(){
    window.scroll({top: 0, behavior: "smooth"})
    document.getElementById("progress").style.display="grid";
    disableBodyScroll();
   }
   function hideProgress(){
       enableBodyScroll();
     document.getElementById("progress").style.display="none";
   }

   function disableBodyScroll(){
    const element = document.querySelector("#appBody");
    element.classList.add("stop-scroll");
   }
   
   function enableBodyScroll(){
    const element = document.querySelector("#appBody");
    element.classList.remove("stop-scroll");
   }

function checkData(data){
    if(!data.name){
        alert("project name can't be empty");
        return false;
    }
    if(!data.description){
        alert("project description can't be empty");
        return false;
    }
    if(!data.budget){
        alert("project budget can't be empty");
        return false;
    }
    return true;    
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
