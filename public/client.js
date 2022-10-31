const socket = io()
let firstname;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area')

do {
    firstname = prompt("Please enter your first name: ")
    
} while (!firstname)


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: firstname,
        message: message.trim()

    }

    appendMessage(msg, 'outgoing')
    textarea.value= ''
    scrollToBottom()


    //Websocket connection from npm
    socket.emit('message', msg); // emit an event to the socket

}



function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}



// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

