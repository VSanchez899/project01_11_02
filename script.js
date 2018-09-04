/*  Project 01_11_02

    Author: Vincent Sanchez
    Date:   9.4.18

    Filename: script.js
*/

"use strict";
//global varibles
var httpRequest = false;
var entry = "^IXIC";

//function to get request object
function getRequestObject() {
    try {
        httpRequest =new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    return httpRequest;
}

//function to disable defaults
function stopSubmittion(evt) {
    if (evt.preventDefault) {
        evt.preventDefault;
    }
    else{
        evt.returnValue = false;
    }
    getQuote();
}

//function to restock quote data
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName(input)[0].value;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

//function to check the state of the request object
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest === 200) {
        var stockResults = httpRequest.responceText;
        console.log(stockResults)
    }
}

//temp event handler
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmittion, false);
    window.addEventListener("load", getQuote, false);
}
else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmittion)
    window.attachEvent("onload", getQuote);
}
