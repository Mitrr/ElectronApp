const obj = {
    name:'Unknown soldier'
};

defi.on(obj,'change:name', function () {
   console.log("typing");
});

defi.calc(obj,'username',['name'], (name) => `${name}`);

defi.bindNode(obj, {
    name: '.name',
    username: '.username'
});

// just to use obj at console tab
window.obj = obj;

$('#store span').on('click',function (e) {
    e.preventDefault();
    $("#store_sub").toggleClass('active_sub_menu');
});
$('.auth_btn').on('click',function () {
    $('.auth_modal').css({"display":"block"});
});
$('.close').on('click',function () {
   $('.auth_modal').css({"display":"none"}) ;
});

