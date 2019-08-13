const formatTime = (date,format) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
if(format){
  var newtime="";
  for (var item of format){
      switch(item){
        case "y":
          newtime += year;break;
        case "m":
          newtime += formatNumber(month); break;
        case "d":
          newtime += formatNumber(day); break;
        case "h":
          newtime += formatNumber(hour); break;
        case "i":
          newtime += formatNumber(minute); break;
        case "s":
          newtime += formatNumber(second); break;
          default:
          newtime += item; break;
      }
  }
  return newtime;
}else{
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
