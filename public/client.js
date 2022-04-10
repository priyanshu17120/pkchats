var socket = io();
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const messageboox = document.querySelector('#messageboox');
var audio = new Audio("/ting.mp3");

function scrollToBottom() {
  const container = document.getElementById('container');
  container.scrollTop = container.scrollHeight;
}
function remove_my_name(){
  localStorage.removeItem('thenameofpersoninpkschatomg');
  location.reload();
}
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("conversation");
  messageElement.classList.add("conversation-container");
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "received") {
    scrollToBottom()
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if(message != ""){
    append(`${message}`, "sent");
    socket.emit("send", message);
    messageInput.value = ""; 
    scrollToBottom()
  }
  
});

if(!localStorage.getItem('thenameofpersoninpkschatomg')){
  alert("The name you enter will be saved and then you dont have to enter the name again.");
  const name = prompt("Enter your name to join");
  let length = name.length;
  if(length >= 15){
    window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
  localStorage.setItem('thenameofpersoninpkschatomg',name)
  main(name)
}
else{
  const name = localStorage.getItem('thenameofpersoninpkschatomg')
  main(name)
}

function main(name){
  socket.emit("new-user-joined", name);
async function aa(){
  const usersonline = document.getElementById("usersonline");
  const userorusers = document.getElementById("userorusers");
  var sas = await fetch('/onlineusers')
  var sus = await (sas).text()
  usersonline.innerText = parseInt(sus)+1;
  if(usersonline.innerText == 1){
    userorusers.innerText = 'user'
  }
  else{
    userorusers.innerText = 'users'
  }
}
aa()

append(`Hey,${name} Welcome To Pk's Chat`, "received");
socket.on("user-joined", (name) => {
  async function aa(){
    const usersonline = document.getElementById("usersonline");
    const userorusers = document.getElementById("userorusers");
    var sas = await fetch('/onlineusers')
    var sus = await (sas).text()
    usersonline.innerText = sus;
    if(usersonline.innerText == 1){
      userorusers.innerText = 'user'
    }
    else{
      userorusers.innerText = 'users'
    }
  }
  aa()
  append(`${name} joined the chat`, "received");
  scrollToBottom()
});
socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "received");
  scrollToBottom()
});
socket.on("delete-the-name", () => {
  console.log(somsa);
  localStorage.removeItem('thenameofpersoninpkschatomg')
});

socket.on("left", (name) => {
  async function aa(){
    const usersonline = document.getElementById("usersonline");
    const userorusers = document.getElementById("userorusers");
    var sas = await fetch('/onlineusers')
    var sus = await (sas).text()
    usersonline.innerText = parseInt(sus);
    if(usersonline.innerText == 1){
      userorusers.innerText = 'user'
    }
    else{
      userorusers.innerText = 'users'
    }
  }
  aa()
  append(`${name} left the chat`, "received");
  scrollToBottom()
});
}


