// ==UserScript==
// @name     Moodle Mes Cours
// @version  1
// @grant    none
// ==/UserScript==

if(!this.location.href.includes("moodle.utbm.fr"))
  return;

const mescours = ['SM57', 'LR01', 'LO53', 'MG07', 'TO52', 'MI52'].sort()

console.log(mescours)

window.onload = function() {

  const list = [ ...document.querySelectorAll('.tree_item.branch.canexpand + ul > li')]
  
  const mes = []
  mescours.forEach(cour => mes.push(''))
  
  list.forEach(el => {
    for(let i = 0; i < mescours.length; ++i) {
      if(el.innerText.includes(mescours[i]))
        mes[i] = el
    }
  })  
  
  const autres = list.filter(el => {
    for(let i = 0; i < mescours.length; ++i) {
      if(el.innerText.includes(mescours[i])) return false;
    }
    return true;
  })
  
  autres.sort((a, b) => (a.innerText < b.innerText ? -1 : 1))
  
  const listElement = document.querySelector('.tree_item.branch.canexpand + ul');
  listElement.innerHTML = '';
  
  mes.forEach(m => listElement.appendChild(m))
  listElement.innerHTML += '<hr>'
  autres.forEach(m => listElement.appendChild(m))
}
