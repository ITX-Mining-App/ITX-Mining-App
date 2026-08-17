// ===============================
// ITX MINING APP
// ===============================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();


// Supabase

const SUPABASE_URL = "https://dxdhoykekdbsdrnvxxdo.supabase.co";

const SUPABASE_KEY = "তোর Publish Key এখানে বসাবি";


const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// User

const tgUser = tg.initDataUnsafe?.user || {};

const telegram_id = tgUser.id || 0;

const username = tgUser.username || "User";


let balance = 0;
let speed = 0.1;
let mining = false;



document.getElementById("profile").innerHTML =
"👤 " + username;



// ===============================
// USER LOAD
// ===============================

async function loadUser(){

let {data}= await db
.from("users")
.select("*")
.eq("telegram_id",telegram_id)
.single();



if(data){

balance = data.balance || 0;
speed = data.mining_speed || 0.1;

}

else{


await db
.from("users")
.insert({

telegram_id:telegram_id,
username:username,
balance:0,
mining_speed:0.1

});


}


updateBalance();


}


loadUser();



// ===============================
// BALANCE
// ===============================

function updateBalance(){

document.getElementById("balance").innerHTML =
balance.toFixed(3)+" ITX";


document.getElementById("earned").innerHTML =
balance.toFixed(3);


document.getElementById("speed").innerHTML =
speed+" ITX/H";


}



// ===============================
// MINING
// ===============================

function startMining(){


if(mining){

alert("Mining Running");

return;

}


mining=true;


document.querySelector(".mine-btn").innerHTML =
"⛏️ Mining Running";



setInterval(async()=>{


balance += speed/60;


updateBalance();



await db
.from("users")
.update({

balance:balance,
is_mining:true

})
.eq("telegram_id",telegram_id);



},60000);



}
// ===============================
// TASK SYSTEM
// ===============================


async function loadTasks(){

let {data,error}= await db
.from("tasks")
.select("*")
.eq("status",true);



let html = `

<h3>🎯 Tasks</h3>

<p>Complete tasks and earn ITX</p>

`;



data?.forEach(task=>{


html += `

<div class="task">

<h4>${task.title}</h4>

<p>Reward: ${task.reward} ITX</p>

<button onclick="completeTask('${task.id}')">

Complete

</button>


</div>


`;


});



document.getElementById("content").innerHTML = html;


}



// ===============================
// COMPLETE TASK
// ===============================


async function completeTask(id){



let {data:task}= await db
.from("tasks")
.select("*")
.eq("id",id)
.single();



if(!task){

alert("Task not found");

return;

}



balance += Number(task.reward);


updateBalance();



await db
.from("task_completions")
.insert({

telegram_id:telegram_id,

task_id:id,

reward:task.reward

});



await db
.from("users")
.update({

balance:balance

})
.eq("telegram_id",telegram_id);



alert(
"Task Complete +"+task.reward+" ITX"
);



}




// ===============================
// PAGE SYSTEM
// ===============================


function openPage(page){



if(page==="tasks"){

loadTasks();

}




if(page==="referral"){


let link =
"https://t.me/ITXMiningBot?start="+telegram_id;



document.getElementById("content").innerHTML=

`

<h3>👥 Referral</h3>

<p>Your Referral Link</p>

<input value="${link}" readonly>


`;

}



if(page==="kyc"){


document.getElementById("content").innerHTML=

`

<h3>🪪 KYC Verification</h3>

<p>Status: Pending</p>

<button>

Submit KYC

</button>

`;

}



if(page==="withdraw"){


document.getElementById("content").innerHTML=

`

<h3>💸 Withdraw</h3>

<p>KYC verification required before withdrawal.</p>


`;

}



}
