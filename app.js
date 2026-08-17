const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


let balance = 0;
let mining = false;
let speed = 0.1;

let kycVerified = false;


const user = tg.initDataUnsafe?.user || {};

let username = user.username || "User";
let telegramId = user.id || "0";



document.getElementById("profile").innerHTML = "👤";


// =====================
// Mining System
// =====================

function startMining(){

if(mining){
alert("Mining already running");
return;
}

mining = true;

document.querySelector(".mine-btn").innerHTML =
"⛏️ Mining Running";


setInterval(()=>{

balance += speed / 60;

updateBalance();


},60000);


}


// =====================
// Balance Update
// =====================

function updateBalance(){

let bal = document.getElementById("balance");

let earned = document.getElementById("earned");

let sp = document.getElementById("speed");


if(bal)
bal.innerHTML = balance.toFixed(3)+" ITX";


if(earned)
earned.innerHTML = balance.toFixed(3);


if(sp)
sp.innerHTML = speed+" ITX/H";


}


// =====================
// Pages
// =====================


function openPage(page){

let content =
document.getElementById("content");



if(page==="tasks"){

content.innerHTML=`

<h3>🎯 Tasks</h3>

<p>Watch videos and complete ads</p>

<div class="task">

<h4>YouTube Video 1</h4>

<button onclick="completeTask()">
Complete +0.1 ITX
</button>

</div>


<div class="task">

<h4>YouTube Video 2</h4>

<button onclick="completeTask()">
Complete +0.1 ITX
</button>

</div>


<div class="task">

<h4>Direct Ads</h4>

<button onclick="completeTask()">
Complete +0.1 ITX
</button>

</div>

`;

}




if(page==="referral"){

let link =
"https://t.me/ITXMiningBot?start="+telegramId;


content.innerHTML=`

<h3>👥 Referral</h3>

<p>Your Referral Link</p>

<input value="${link}" readonly>

`;

}




if(page==="kyc"){


content.innerHTML=`

<h3>🪪 KYC Verification</h3>

<p>Status:
${kycVerified ? "Verified ✅":"Pending ⏳"}
</p>


<button onclick="verifyKYC()">
Submit KYC
</button>

`;

}




if(page==="withdraw"){


if(!kycVerified){

content.innerHTML=`

<h3>💸 Withdraw</h3>

<p>
KYC verification required
</p>

`;

}

else{


content.innerHTML=`

<h3>💸 Withdraw</h3>

<p>
Available Balance:
${balance.toFixed(3)} ITX
</p>


<button>
Request Withdraw
</button>

`;

}


}


}




// =====================
// Task Reward
// =====================


function completeTask(){

balance += 0.1;

updateBalance();


alert("Task Completed +0.1 ITX");


}




// =====================
// KYC
// =====================

function verifyKYC(){

alert("KYC Submitted");

}
