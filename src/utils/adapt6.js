/* eslint-disble */
let docEl = document.documentElement
export function getSize () { // 获取屏幕的宽度
  function getWdith () {
    let myWidth = 0
    if (typeof (window.innerWidth) === 'number') {
      // Non-IE
      myWidth = window.innerWidth
    } else if (document.documentElement && (document.documentElement.clientWidth)) {
      // IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth
    } else if (document.body && (document.body.clientWidth)) {
      // IE 4 compatible
      myWidth = document.body.clientWidth
    }
    return parseInt(screen.width > 640 ? myWidth : screen.width)
  }
  let screenWidth = getWdith()

  if(screenWidth>750){
    docEl.style.fontSize = '22px'
  }else{
    docEl.style.fontSize = screenWidth / (750 / 40) + 'px'
  }
 
  
}

window.onresize = function () {
  getSize()
}


