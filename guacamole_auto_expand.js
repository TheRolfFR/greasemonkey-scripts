// ==UserScript==
// @name     Guacamole auto-expand
// @version  1
// @grant    none
// ==/UserScript==

// Ras le bol de déployer à chaque fois donc go le faire auto
if(!document.location.href.includes('guacamole.utbm.fr'))
  return

try {

let interval = undefined

interval = setInterval(function() {
  const group = document.querySelector('.group-list-page')
  if(group) {
    clearInterval(interval)
    deploy(group)
  }
}, 20)

const findEl = function(group, lineSelector, text, iconSelector) {  
 	const line = [ ...group.querySelectorAll(lineSelector)]
  
  const el = line.filter(e => e.innerText.includes(text))[0]
  
  if(!el) {
    console.error('Did not found ' + text + ' in lines ', line)
    return undefined
  }
 
  const icon = el.querySelector(iconSelector)
  
  return icon
}


const criterias = [
  ['.caption', 'Belfort', '.icon.expand'],
  ['.caption', 'H010', '.icon.expand']
]

const deploy = function(group) {
  let el
  criterias.forEach(crit => {
    el = findEl(group, crit[0], crit[1], crit[2])
  
    if(!el)
      return
    
    el.click()
  })
}

} catch(err) {
  console.error(err)
}
