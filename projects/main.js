const div_mobile_project=document.querySelector('.data-mobile-project');
const div_web_project=document.querySelector('.data-web-project');
const field_select = document.getElementById("field_select");
const view_project_div=document.querySelector('.view-project-div');

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
    
    if (e.target.className.includes('project-div')){
       
        const myArray = e.target.className.split(" ");
        if(field_select.selectedIndex==0){
            var project=webProjectsList[myArray[1]];
            showFullProjectDiv(project,myArray[1])
        }else{
            var project=mobileProjectsList[myArray[1]];
            showFullProjectDiv(project,myArray[1])
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

