export function currencyStyle(val, decimals = 2) {
  return parseFloat(val).toLocaleString(
      'pt-br',
      {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: decimals
      }
  )
}

export function onlyAttrNotEmpty(obj){
  let notEmpty = {}
  
  for (var propName in obj) {
    if (obj[propName] != ""){
      notEmpty[propName] = obj[propName]
    }
  }
  return notEmpty;
}

export function detectBrowser() { 
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
      return 'Opera';
  } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
      return 'Chrome';
  } else if(navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
  } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
      return 'Firefox';
  } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
      return 'IE';//crap
  } else {
      return 'Unknown';
  }
} 