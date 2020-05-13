const checkForm = ()=>{
    const formContent = document.getElementsByName('newTask')[0].value;
    if('' === formContent){
        alert('タスク内容入れて欲しいやで');
        return false;
    }else{
        return true;
    }
}