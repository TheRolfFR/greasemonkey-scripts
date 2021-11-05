// ==UserScript==
// @name     Moodle To CAS
// @version  1
// @grant    none
// ==/UserScript==
if(!window.location.href.includes('moodle.utbm.fr'))
  return

function moodleHomeToCAS() {
  // find connexion link
  const el = document.querySelector('.usermenu .login a')
  if(!el)
    return
  
  console.log(el)
  
  // verify text content
  if(el.innerText !== 'Connexion')
    return

  // redirect you bastard
	const redirect = 'https://cas.utbm.fr/login?service=https://moodle.utbm.fr/login/index.php?authCAS=CAS'
  window.location.href = redirect
}

function indexToCAS() {
  // find connexion link
  let el = [ ...document.querySelectorAll('#page .card a')]  
  el = el.filter(e => e.innerText.trim() === 'Authentification UTBM')
  if(!el || el.length !== 1)
    return
  
  const link = el[0].href
  window.location.href = link
}

window.addEventListener('load', function() {
  moodleHomeToCAS()
  indexToCAS()
})
