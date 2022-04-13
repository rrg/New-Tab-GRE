// Setup HTML elements

var colorsVector = ['#ffdbcc',"#eceae4", "#d4f0f0","#cce2cb","#fee1e8","#ecd5e3","#e2eeff","#ddfffc","#ffffe3"];
document.getElementById('background').style.backgroundColor = colorsVector[Math.floor(Math.random() * colorsVector.length)];

var wordElem = wordlist[Math.floor(Math.random() * wordlist.length)];
var googleSearchStr = "https://www.google.com/search?q=define+"+wordElem.word;

document.getElementById('word').innerHTML = "<a href="+googleSearchStr+">"+wordElem.word+"</a>";
document.getElementById('type').innerHTML = wordElem.type;
document.getElementById('meaning').innerHTML = wordElem.meaning;
document.getElementById('usage').innerHTML = wordElem.usage;

setTimeout(function() {
    document.getElementById("usage").classList.add("animatee");
}, 300);