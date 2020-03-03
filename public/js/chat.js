const socket = io()

//Elements
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute("disabled","disabled") // Buton disabled oluyor.

    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute("disabled")
        if(error){
            return console.log(error)
        }
    })
})

document.querySelector("#send-location").addEventListener("click", () => {
    if(!navigator.geolocation)
        return alert("Geolocation is not supported by your browser")
    
        navigator.geolocation.getCurrentPosition((positon) =>{
            socket.emit("sendLocation", {
                latitude:positon.coords.latitude,
                longitude:positon.coords.longitude
            })
    })
})