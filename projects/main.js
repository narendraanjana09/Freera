const div_mobile_project=document.querySelector('.data-mobile-project');
const div_web_project=document.querySelector('.data-web-project');
const field_select = document.getElementById("field_select");
const view_project_div=document.querySelector('.view-project-div');
const view_place_bid_div=document.querySelector('.place-bid-div');

let webProjectsList=[];
let mobileProjectsList=[];
firebase
  .database()
  .ref("projects")
  .child("Web Project")
  .on("child_added", (data) => {
    var project = data.val();
    webProjectsList.push(project);
    addData(project,webProjectsList.length-1,0)
  });
firebase
  .database()
  .ref("projects")
  .child("Mobile Project")
  .on("child_added", (data) => {
    var project = data.val();
    console.log("name:"+project.name)
    mobileProjectsList.push(project);
    addData(project,mobileProjectsList.length-1,1)
  });
  function addData(project,index,type){
    var skills="";
    project.skills.forEach(skill => {
      skills+=`<div class="chip">
      ${skill}</div>`
  })
      var layout=`<div class="project-div ${index}">
      <div class="title">
          ${project.name}
      </div>
      <div class="description">
      ${project.description}
      </div>
      <div class="skills">
          ${skills}
      </div>
      <div class="bottom-data">
          <span class="budget">${project.budget}</span>
          <span class="bids">10 bids left</span>
          <br>
          <span class="date">Posted on ${project.postDate}</span>
      </div>
  </div>`;
  if(type==0){
    div_web_project.innerHTML+=layout;
  }else{
      div_mobile_project.innerHTML+=layout;
  }
  }

 function typeChanged(){
    //var field = e.options[e.selectedIndex].text;
    if(field_select.selectedIndex==0){
        div_web_project.style.display="flex";
        div_mobile_project.style.display="none";
    }else{
        div_mobile_project.style.display="flex";
        div_web_project.style.display="none";
    }
 }
 document.addEventListener('click', (e) => {
  const myArray = e.target.className.split(" ");
    if (e.target.className.includes('project-div')){
        if(field_select.selectedIndex==0){
            var project=webProjectsList[myArray[1]];
            showFullProjectDiv(project,myArray[1])
        }else{
            var project=mobileProjectsList[myArray[1]];
            showFullProjectDiv(project,myArray[1])
        }
    }else if(e.target.className.includes('place_bid_btn')){
      if(field_select.selectedIndex==0){
        var project=webProjectsList[myArray[1]];
        showPlaceBidDiv(project)
    }else{
        var project=mobileProjectsList[myArray[1]];
        showPlaceBidDiv(project)
    }
    }
  })
 function showFullProjectDiv(project,index){
    var skills="";
    project.skills.forEach(skill => {
      skills+=`<div class="chip">
      ${skill}</div>`
  })
  var layout=`<div class="bg-div"  onclick="closeProfileDiv()"></div>
  <div class="project-bg">
      <div class="title">
      ${project.name}
       </div>
       <div class="description">
       ${project.description}
          </div>
       <div class="skills">
         ${skills}
      </div>
      <div class="bottom-data">
          <span>${project.budget}</span>
          <span>Posted on ${project.postDate}</span>
          <span>10 bids left</span>
          <span class="view-bids-btn ${index}">View Bids</span>
      </div>
  
          <button class="place_bid_btn ${index}">Place Bid</button>
     
  </div>`;
  view_project_div.innerHTML=layout;
  view_project_div.style.transform="scale(1)";
 }
 function closeProfileDiv(){
    view_project_div.style.transform="scale(0)"
}
var currentProject=null;

function showPlaceBidDiv(project){
  currentProject=project;
  view_place_bid_div.style.transform="scale(1)"
}
function closePlaceBidDiv(){
  view_place_bid_div.style.transform="scale(0)"
}
function submitBid(){
  var time=document.getElementById("estimatedTime_ed").value;
  var cost=document.getElementById("estimatedCost_ed").value;
  var approach=document.getElementById("Approach_ed").value;

  if(!time){
    alert("Please mention Estimated Time For Completion!")
    return
  }
  if(!cost){
    alert("Please mention Estimated Cost From Your Side!")
    return
  }
  if(!approach){
    alert("Please mention your Approach For Completion!")
    return
  }

  var fuser=firebase.auth().currentUser;

  var bidData={
       bid:Date.now(),
       userName:fuser.displayName,
       uid:fuser.uid,
       profileIMG:fuser.photoURL,
       estimatedTime:time,
       estimatedCost:cost,
       approach:approach,
       dateTime:getTimeStamp()
  }
  firebase
  .database()
  .ref("projects")
  .child(currentProject.category)
  .child(currentProject.pid)
  .child("bids")
  .child(bidData.bid)
  .set(bidData, (error) => {
    if(error){
      alert(error);
    }else{
      var data={
        bid:bidData.bid,
        pid:currentProject.pid,
        category:currentProject.category,
        estimatedTime:time,
       estimatedCost:cost,
       approach:approach,
       dateTime:bidData.dateTime
      }
      firebase
      .database()
      .ref("users")
      .child("developers")
      .child(fuser.uid)
      .child("bids")
      .child(bidData.bid)
      .set(data, (error) => {
        if(error){
          alert(error);
        }else{
          alert("You have succesfully placed your bid for this Project!")
          closePlaceBidDiv()
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
