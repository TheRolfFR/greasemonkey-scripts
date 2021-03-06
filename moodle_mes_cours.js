// ==UserScript==
// @name     Moodle Mes Cours
// @version  1
// @grant    none
// ==/UserScript==

if(!this.location.href.includes("moodle.utbm.fr"))
  return;

const MES_COURS_TITLE = 'Mes cours'
const AUTRES_COURS_TITLE = 'Autres cours'
const mescours = ['DA50', 'DA51', 'DA52', 'DA53', 'DA54', 'LE07'].sort()
mescours.unshift(MES_COURS_TITLE)

const COURS_EMPTY = undefined

const LIST_ELEMENT_SELECTOR = '#nav-drawer .list-group > ul'
const LIST_ITEM_SELECTOR = LIST_ELEMENT_SELECTOR + ' > li'
const LIST_ELEMENT_TEXT_SELECTOR = '.media-body'

window.onload = function() {
  try {
    const list = [ ...document.querySelectorAll(LIST_ITEM_SELECTOR)]
    let mes = mescours.map(el => COURS_EMPTY)

    const autres = []
    let added
    list.forEach(el => {
      added = false
      
      for(let i = 0; i < mescours.length; ++i) {
        if(mes[i] === COURS_EMPTY && el.innerText.includes(mescours[i]) && (el.innerText === MES_COURS_TITLE || (el.children[0].classList.contains('list-group-item-action') && el.previousElementSibling != null))) {
          mes[i] = el
          added = true
        }
      }
      
      if(!added) {
          autres.push(el)
      }
      else if(el.innerText === MES_COURS_TITLE) {
        const autreCours = el.cloneNode(true)
        autreCours.querySelector(LIST_ELEMENT_TEXT_SELECTOR).innerText = AUTRES_COURS_TITLE;
        autres.push(autreCours)
      }
    })

    console.log(mes, autres)

    const listElement = document.querySelector(LIST_ELEMENT_SELECTOR)
    listElement.innerHTML = ''

    
   	console.log(mes)
    mes = mes.filter(e => e !== COURS_EMPTY)
    mes.forEach(m => listElement.appendChild(m))
    autres.forEach(m => listElement.appendChild(m))
  } catch(err) {
    console.error(err)
    throw err
  }
}
