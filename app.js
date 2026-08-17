const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


let balance = 0;
let mining = false;
let speed = 0.1;


const user = tg.initDataUnsafe?.user || {};

let username = user.username || "User";


document.getElementById("profile").innerHTML = "👤";



function startMining(){

if(mining){
alert("Mining already started");
return;
}

mining = true;

document.querySelector(".mine-btn").innerHTML="⛏️ Mining Running";


setInterval(()=>{

balance += speed / 60;

document.getElementById("balance").innerHTML =
balance.toFixed(3)+" ITX";


document.getElementById("earned").innerHTML =
balance.toFixed(3);


document.getElementById("speed").innerHTML =
speed+" ITX/H";


},60000);


}



function openPage(page){


let content=document.getElementById("content");


if(page==="tasks"){

content.innerHTML=`

<h3>🎯 Tasks</h3>

<p>Complete tasks and earn ITX</p>

<button onclick="completeTask()">
Complete Task
</button>

`;

}



if(page==="referral"){

content.innerHTML=`

<h3>👥 Referral</h3>

<p>Your referral link</p>

<input value="https://t.me/ITXMiningBot">

`;

}



if(page==="kyc"){

content.innerHTML=`

<h3>🪪 KYC Verification</h3>

<p>Status: Pending</p>

<button>
Submit KYC
</button>

`;

}



if(page==="withdraw"){

content.innerHTML=`

<h3>💸 Withdraw</h3>

<p>KYC approval required before withdrawal.</p>

`;

}


}



function completeTask(){

balance += 1;

document.getElementById("balance").innerHTML =
balance.toFixed(3)+" ITX";


alert("Task Completed +1 ITX");

}
