
let formbtn = document.querySelector('#submit');

formbtn.addEventListener('click',function () {
    console.log("УСё");
    console.log(require('./main').isAuth);
    require('./main').isAuth = true;
});


