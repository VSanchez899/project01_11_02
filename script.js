/*  Project 01_11_02

    Author: Vincent Sanchez
    Date:   9.4.18

    Filename: script.js
*/

"use strict";
//global varibles
var httpRequest = false;
var entry = "MSFT";

//function to get request object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    return httpRequest;
}



//function to disable defaults
function stopSubmittion(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    getQuote();
}

//function to restock quote data
function getQuote() {
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    else{
        document.getElementsByTagName("input")[0].value = entry;
    }
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
    clearTimeout(updateQuote);
    var updateQuote = setTimeout('getQuote()', 10000);
}

//function to check the state of the request object
function displayData() {
    console.log(httpRequest.readyState + " " + httpRequest.status);
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        var stockItems = stockResults.split(/,|\"/);
        for (var i = stockItems.length - 1; i >= 0; i--) {
            if (stockItems[i] === "") {
                stockItems.splice(i, 1);

            }
            document.getElementById("ticker").innerHTML = stockItems[0];
            document.getElementById("openingPrice").innerHTML = stockItems[6];
            document.getElementById("lastTrade").innerHTML = stockItems[1];
            document.getElementById("lastTradeDT").innerHTML = stockItems[2] + "," + stockItems[3]
            document.getElementById("change").innerHTML = stockItems[4];
            document.getElementById("range").innerHTML = (stockItems[8] * 1).toFixed(2) + "&ndash;" + (stockItems[7] * 1).toFixed(2);
            document.getElementById("volume").innerHTML = (stockItems[9] * 1).toLocaleString();
        }

    }

}

// function for stock data
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.background = "#9FE098";
    }
}


//temp event handler
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmittion, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmittion);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}