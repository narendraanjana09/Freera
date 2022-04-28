
var data_div = document.querySelector('.data');


var jobs={
    stars:"⭐",
    total:"0"
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
    joinDate:"",
    jobs_data:jobs
  };

let users = [];


 firebase
  .database()
  .ref("users")
  .child("developers")
  .on("child_added", (data) => {
    var user = data.val();
    users.push(user);
    addData(user,users.length-1);
  });
  function addData(user,index){
      var skills="";
      user.skills.forEach(skill => {
        skills+=`<div class="chip">
        ${skill}</div>`
    })
      var layout=`<div class="div-profile-data ${index}">
      <div class="detail1">
          <div class="image">
          <img  class="profile" src="${user.profileUrl}" alt="Avatar">
          </div>
          <div class="name-field">
              <div class="name">${user.name}</div>
              <div class="field">${user.field}</div>
          </div>  
      </div>
      <div class="skills">
        ${skills}
      </div>
      <div class="jobs">
      ${user.jobs_data.stars} <span> ${user.jobs_data.total} jobs</span>
      </div>    
  </div>`;
    data_div.innerHTML+=layout;
  }

  document.addEventListener('click', (e) => {
    
    if (e.target.className.includes('div-profile-data')){
       
        const myArray = e.target.className.split(" ");
        var user=users[myArray[1]];
        showProfileDiv(user)
    }
  })
  function showProfileDiv(user){
    var skills="";
    user.skills.forEach(skill => {
      skills+=`<div class="chip">
      ${skill}</div>`
  })
    var layout=`<div class="bg-div"  onclick="closeProfileDiv()">
    </div><div class="profile-bg">
    <div class="top-data">
        <div class="detail1">
            <div class="image">
            <img  class="profile" src="${user.profileUrl}" alt="Avatar">
            </div>
            <div class="name-field">
                <div class="name">${user.name}</div>
                <div class="field">${user.field}</div>
            </div>  
        </div>
        <div class="jobs">
            ${user.jobs_data.stars} <br> <span> ${user.jobs_data.total} jobs</span>
        </div>    
    </div>
    <div class="bio-div">
        ${user.bio}
    </div>
    <div class="last-data">
        <div class="skills">
            ${skills}
        </div>
        <button>Message</button>

    </div>
</div>`;
document.querySelector('.view-profile-div').innerHTML=layout;
    document.querySelector('.view-profile-div').style.transform="scale(1)"
}
function closeProfileDiv(){
    document.querySelector('.view-profile-div').style.transform="scale(0)"
}
