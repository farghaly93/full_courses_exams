document.getElementById('sidebarCollapse').onclick=function(){
    let element=document.getElementById('SideBar')
    if(element.classList.contains('active')){
        element.classList.remove('active')
    }else{
        element.classList.add('active')
    }
}