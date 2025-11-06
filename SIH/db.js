function showSection(id){
  document.querySelectorAll('.content-section').forEach(sec=>sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.sidebar nav ul li').forEach(li=>li.classList.remove('active'));
  event.target.classList.add('active');
}

if(window.location.pathname.endsWith("dashboard.html")){
  const user = JSON.parse(localStorage.getItem("pqmpUser"));
  if(!user) window.location.href="login.html";
  else document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("welcomeUser").textContent=`Welcome, ${user.username} (${user.role})`;
    loadQuestions(); renderChart();
  });
}

function logout(){localStorage.removeItem("pqmpUser"); window.location.href="login.html";}

const questionForm=document.getElementById("questionForm");
if(questionForm){
  questionForm.addEventListener("submit", e=>{
    e.preventDefault();
    const title=document.getElementById("qTitle").value.trim();
    const keywords=document.getElementById("qKeywords").value.trim();
    const dept=document.getElementById("qDept").value;
    const file=document.getElementById("qFile").files[0];
    const question={title,dept,status:"Pending",keywords,fileName:file?file.name:""};
    const existing=JSON.parse(localStorage.getItem("pqmpQuestions"))||[];
    existing.push(question);
    localStorage.setItem("pqmpQuestions",JSON.stringify(existing));
    questionForm.reset(); document.getElementById("filePreview").innerHTML="";
    loadQuestions(); renderChart();
  });
}


document.getElementById("qFile").addEventListener("change", function(){
  const file=this.files[0];
  document.getElementById("filePreview").innerHTML=file?`Selected file: ${file.name}`:"";
});


function loadQuestions(){
  const tbody=document.querySelector("#questionTable tbody");
  tbody.innerHTML="";
  let questions=JSON.parse(localStorage.getItem("pqmpQuestions"))||[];
  const searchValue=document.getElementById("searchInput")?.value.toLowerCase();
  if(searchValue){
    questions=questions.filter(q=>q.title.toLowerCase().includes(searchValue) || q.dept.toLowerCase().includes(searchValue) || q.keywords.toLowerCase().includes(searchValue));
  }
  questions.forEach(q=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${q.title}</td><td>${q.dept}</td><td>${q.status}</td><td>${q.keywords}</td>`;
    tbody.appendChild(tr);
  });
  updateStats(questions);
}


document.getElementById("searchInput")?.addEventListener("input", loadQuestions);

function updateStats(questions){
  const total=questions.length;
  const pending=questions.filter(q=>q.status==="Pending").length;
  const review=questions.filter(q=>q.status==="Under Review").length;
  const answered=questions.filter(q=>q.status==="Answered").length;

  document.getElementById("totalQ").textContent=total;
  document.getElementById("pendingQ").textContent=pending;
  document.getElementById("reviewQ").textContent=review;
  document.getElementById("answeredQ").textContent=answered;


  document.getElementById("totalProgress").style.width=Math.min(total*10,100)+"%";
  document.getElementById("pendingProgress").style.width=Math.min(pending*10,100)+"%";
  document.getElementById("reviewProgress").style.width=Math.min(review*10,100)+"%";
  document.getElementById("answeredProgress").style.width=Math.min(answered*10,100)+"%";
}


function renderChart(){
  const ctx=document.getElementById("statusChart");
  const q=JSON.parse(localStorage.getItem("pqmpQuestions"))||[];
  const data=[q.filter(x=>x.status==="Pending").length,q.filter(x=>x.status==="Under Review").length,q.filter(x=>x.status==="Answered").length];
  new Chart(ctx,{
    type:"doughnut",
    data:{labels:["Pending","Under Review","Answered"],datasets:[{data,backgroundColor:["#E5C95F","#41A67E","#4caf50"]}]},
    options:{responsive:true,cutout:"80%",plugins:{tooltip:{enabled:true},legend:{display:true,position:"bottom"}}}
  });
}
/* 🌙 Dark Mode Toggle */
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("pqmpDarkMode", isDark ? "enabled" : "disabled");
  });

  // Load theme preference
  const savedMode = localStorage.getItem("pqmpDarkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }
}

/* 📂 Sidebar Collapse */
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem("pqmpSidebarCollapsed", sidebar.classList.contains("collapsed"));
  });

  // Load saved state
  if (localStorage.getItem("pqmpSidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
  }
}

/* 📊 Animated Chart.js (Already in renderChart) */
function renderChart() {
  const ctx = document.getElementById("statusChart");
  const q = JSON.parse(localStorage.getItem("pqmpQuestions")) || [];
  const data = [
    q.filter(x => x.status === "Pending").length,
    q.filter(x => x.status === "Under Review").length,
    q.filter(x => x.status === "Answered").length
  ];

  // Destroy existing chart (prevent overlay)
  if (window.statusChartInstance) window.statusChartInstance.destroy();

  window.statusChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Under Review", "Answered"],
      datasets: [{
        data,
        backgroundColor: ["#E5C95F", "#41A67E", "#4caf50"],
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      cutout: "75%",
      animation: {
        duration: 1500,
        easing: "easeOutBounce"
      },
      plugins: {
        tooltip: { enabled: true },
        legend: { display: true, position: "bottom" }
      }
    }
  });
}
