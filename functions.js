function resetArray(messageArr){
    messageArr = [];
    return messageArr;
}
function messageAppend(messageArr,message,id){
    if(message.url!==""){
        if(linkValidator(message.url)) {
            checkDup(messageArr, message,id);
            id = idGenerate(id);
            return id;
        }
        return id;
    }
    return id;
}
function checkDup(messageArr,message,id){
    for(let i=0;i<messageArr.length;i++){
        if(messageArr[i].url===message.url){
            messageArr.splice(i,1);
        }
    }
    messageArr.push({id: id, url: message.url});
}
function linkValidator(url){
    if(url.startsWith("https://") || url.startsWith("http://")) return true;
}
function deleteOne(messageArr,id){
    for(let i=0;i<messageArr.length;i++){
        if(messageArr[i].id==id){
            messageArr.splice(i,1);
        }
    }
    return messageArr;
}
function idGenerate(id){
    id++;
    return id;
}
module.exports = {
    resetArray: resetArray,
    messageAppend: messageAppend,
    linkValidator: linkValidator,
    deleteOne: deleteOne,
    idGenerate: idGenerate
};