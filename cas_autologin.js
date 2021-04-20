// ==UserScript==
// @name     UTBM CAS Auto-login
// @version  1
// @grant    none
// ==/UserScript==

let interval
let launching = false
const login = function() {
  if(launching)
    return
  
  launching = true
  
  const errorMessage = document.querySelector('form .alert')
  
  if(errorMessage) {
    clearInterval(interval)
    return
  }
  
  
  const form = document.querySelector('form')
  const usernameInput = document.getElementById('username')
  const passwordInput = document.getElementById('password')
  
  if(!form || !usernameInput || !passwordInput) {
    clearInterval(interval)
    return
  }
  
  const username = usernameInput.value.trim()
  const password = passwordInput.value.trim()
  
  // check if non empty fields
  if(username && password) {
    clearInterval(interval)
    launching = false
    form.submit()
  }
}

window.onload = login
document.addEventListener('DOMContentLoaded', login)
setInterval(login, 2)
