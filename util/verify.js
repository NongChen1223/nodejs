export  function  vaerifyTimestamp(timestamp){
    let reg = /^\d{13}$/
    if(!timestamp) return false
    if(reg.test(timestamp) && timestamp.length == 13){
        return  true
    }else return  false
}