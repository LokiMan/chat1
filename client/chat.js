;(function () {
  function $(id) {
    return document.getElementById(id)
  }

  const chatNameEl = $('chatName')
  const userListEl = $('userList')
  const chatInputEl = $('chatInput')
  const chatOutEl = $('chatOut')

  chatNameEl.onkeydown = (e) => {
    if (e.key === 'Enter') {
      enter()
    }
  }

  $('chatEnter').onclick = enter

  function enter() {
    $('form1').style.display = 'none'

    const name = chatNameEl.value
    const catchRegExp = new RegExp(`@${name}`)

    const socket = io('', { transports: ['websocket'], auth: { name } })

    const userNames = {}

    function addUserName(name) {
      const nameDiv = document.createElement('div')
      nameDiv.innerText = name
      userNames[name] = nameDiv

      userListEl.append(nameDiv)
    }

    socket.on('init', (userList, messages) => {
      userList.forEach(addUserName)

      chatOutEl.innerHTML = messages.map((m) => `<div>${m}</div>`).join('')

      $('form2').style.display = 'block'
      chatInputEl.focus()
    })

    socket.on('enter', addUserName)

    socket.on('leave', (name) => {
      const nameDiv = userNames[name]
      nameDiv.parentNode.removeChild(nameDiv)
    })

    socket.on('message', (message) => {
      chatOutEl.innerHTML += `<div>${message}</div>`

      if (catchRegExp.test(message)) {
        alert(`Caught: '${message}'!`)
      }
    })

    chatInputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        send()
      }
    }

    function send() {
      socket.emit('message', chatInputEl.value)

      chatInputEl.value = ''
    }

    $('chatSend').onclick = send
  }
})()
