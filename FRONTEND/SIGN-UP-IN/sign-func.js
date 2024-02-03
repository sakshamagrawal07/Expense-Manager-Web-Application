const upCoverButton=document.querySelector('#sign-up');
const inCoverButton=document.querySelector('#sign-in');
const upCover=document.querySelector('#up-cover');
const inCover=document.querySelector('#in-cover');
const upInput=document.querySelector('#up-input');
const inInput=document.querySelector('#in-input');

upCoverButton.addEventListener('click',
    function(){
        inInput.style.display="none";
        inCover.style.display="flex";
        upCover.style.display="none";
        upInput.style.display="flex";
})

inCoverButton.addEventListener('click',
    function(){
        inInput.style.display="flex";
        inCover.style.display="none";
        upCover.style.display="flex";
        upInput.style.display="none";
})