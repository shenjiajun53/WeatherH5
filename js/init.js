/**
 * Created by Administrator on 2016/3/19.
 */
//$(document).ready(function () {
//    $(".button-collapse").sideNav();
//});

window.onload = onInit;

function onInit() {
    //alert("on init");
    $(".button-collapse").sideNav();
    //document.getElementsByClassName("button-collapse").sideNav();

    $('.collapsible').collapsible({
        accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.modal-trigger').leanModal();
    $('.scrollspy').scrollSpy();
}