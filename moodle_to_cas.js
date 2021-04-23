// ==UserScript==
// @name     Moodle To CAS
// @version  1
// @grant    none
// ==/UserScript==
if(!window.location.href.includes('moodle.utbm.fr'))
  return

window.addEventListener('load', function() {
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
})
