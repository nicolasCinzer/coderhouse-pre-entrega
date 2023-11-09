const socket = io()

const userName = document.getElementById('name')
const form = document.getElementById('form')
const inputMessage = document.getElementById('message')
const chat = document.getElementById('chat')

let user = ''
Swal.fire({
  title: 'Welcome!',
  text: 'Introduce your name',
  input: 'text',
  inputValidator: value => {
    if (!value) {
      return 'Name is required'
    }
  },
  confirmButtonText: 'Enter'
}).then(input => {
  user = input.value
  userName.innerText = `Bienvenido ${input.value}!`
  socket.emit('newUser', user)
})

socket.on('newUserConnected', user => {
  Toastify({
    text: `New user Connected! ${user}`,
    className: 'info',
    duration: 3000
  }).showToast()
})

form.onsubmit = e => {
  e.preventDefault()

  const infoMessage = {
    user,
    message: inputMessage.value
  }

  socket.emit('newMessage', infoMessage)
}

socket.on('chat', messages => {
  let html = ''

  messages.forEach(({ user, message }) => {
    html += `
      <div>
        <h3>${user}</h3>
        <p>${message}</p>
      </div>
    `
  })

  chat.innerHTML = html
})
