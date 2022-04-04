var socket = io();
  
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
const messageboox = document.querySelector('#messageboox');
var audio = new Audio("/ting.mp3");

function scrollToBottom() {
  const container = document.getElementById('container');
  container.scrollTop = container.scrollHeight + 50000;
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
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if(message != ""){ 
    scrollToBottom()
    append(`${message}`, "sent");
    socket.emit("send", message);
    messageInput.value = ""; 
  }
  
});

const name = prompt("Enter your name to join");
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
  scrollToBottom()
  append(`${name} joined the chat`, "received");
});
socket.on("receive", (data) => {
    scrollToBottom()
  append(`${data.name} : ${data.message}`, "received");
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
    scrollToBottom()
  append(`${name} left the chat`, "received");
});




