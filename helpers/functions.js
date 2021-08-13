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
