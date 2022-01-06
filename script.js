var keyStrokeVol = 0.1;
var bgmVol = 0.3;
var fontList = ["Courier New","Lucida Handwriting","Times New Roman", "Georgia, serif"]
var keyStrokeList = [["mec",10]];
var bgmList = [["Deep Meditation",".mp3"],["Lake",".mp3"],["Peaceful Pino",".mp3"],["Rain",".mp3"],["River and Birds",".wav"],["Thunder and Rain",".mp3"],["Thunderstorm",".mp3"]];
//var bgmAud = document.getElementById("bgmAud");
//var keyDiv = document.getElementById("keyStrokes");
var isKeySound = false;
var bgNumber = 5;
var numKey = 0;
var clicked = false;

function populateKeyLib(){
	var htmlAppend ="";
	for(let i=1; i <= keyStrokeList.length; i++){
		htmlAppend += '<button class="btn" onclick="keyElement('+(i-1)+')"><p>'+i+'</p></button>';
	}
	document.getElementById("keySoundLib").innerHTML = htmlAppend;
}

function keyElement(id){
	var htmlAppend ="";
	for (let i = 1; i <= keyStrokeList[id][1]; i++) {
		htmlAppend += '<audio id="key'+i+'" controls >\n <source src="Audio/Keys/'+keyStrokeList[id][0]+'/'+keyStrokeList[id][0]+i+'.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>'
	};
	document.getElementById("keyStrokes").innerHTML = htmlAppend;
	isKeySound = true;
	numKey = keyStrokeList[id][1];
}

function stopKeySound(){
	document.getElementById("keyStrokes").innerHTML = '';
	isKeySound = false;
	numKey = 0;
}

function selectKeyStrokes(){
	var elem = document.getElementById("key"+(Math.floor(Math.random() * (numKey) + 1)));
	elem.volume = keyStrokeVol;
	//console.log("playing sound");
	elem.play();
}

function populateBgmLib(){
	var htmlAppend = "";
	for(let i=1; i <= bgmList.length; i++){
		htmlAppend += '<button class="btn" title="'+bgmList[i-1][0]+'" onclick="bgmElement('+(i-1)+')"><p>'+i+'</p></button>';
	}
	document.getElementById("bgmLib").innerHTML = htmlAppend;
}

function bgmElement(id){
	var htmlAppend = "";
	htmlAppend = '<audio id="bgmAud" controls loop>\n <source src="Audio/Music/'+bgmList[id][0]+bgmList[id][1]+'" type="audio/mpeg">Your browser does not support the audio element.</audio>'
	document.getElementById("bgm").innerHTML = htmlAppend;
	var bgmAud = document.getElementById("bgmAud");
	bgmAud.volume = bgmVol;
	document.getElementById("bgmAud").play();
}

function volCtrl(act, obj){
	if(obj == "key"){
		keyStrokeVol = Math.max(0, (keyStrokeVol+ Number(act)));
	}
	if(obj == "bgm"){
		var bgmAud = document.getElementById("bgmAud");
		bgmVol = Math.min(1,Math.max(0, (bgmVol+Number(act))));
		//console.log(bgmVol);
		bgmAud.volume = bgmVol;
	}
}

function stopBgm(){
	var bgmAud = document.getElementById("bgmAud");
	bgmAud.pause();
	bgmAud.currentTime = 0;
}

function changeFont(num){
	textArea.style["font-family"] = fontList[num];
}

function populateFontLib(){
	//console.log("font");
	var htmlAppend = "";
	for(let i=0; i < fontList.length; i++){
		//console.log();
		htmlAppend += '<button class="btn" onclick="changeFont('+i+')"><p style="font-family:'+fontList[i]+'">T</p></button>'
	}
	//console.log(htmlAppend);
	document.getElementById("fontLib").innerHTML = htmlAppend;
}

function clipCommand(cmd){
	textArea.select();
	textArea.setSelectionRange(0, 999999999);
	document.execCommand(cmd);
}

function toggleDisplay(){
	if(document.getElementById("ButtonArea").style["display"]== ''){
		
		document.getElementById("ButtonArea").style["display"] = 'none';
	}		
	else{
		document.getElementById("ButtonArea").style["display"] = '';
	}
}

function populateBgList(){
	var htmlAppend = "";
	for(let i=1; i <= bgNumber; i++){
		//console.log();
		htmlAppend += '<button class="btn" onclick="changeBg('+i+')"><p>'+(i)+'</p></button>';
	}
	//console.log(htmlAppend);
	document.getElementById("bgList").innerHTML = htmlAppend;
}

function changeBg(i){
	document.body.style.backgroundImage = "url('images/bg"+i+".jpg')";
}

function saveFile() {
	var anchor = document.createElement('a');
	var file;
	var data = textArea.value;
	var properties = {type: 'text/plain;charset=utf-8'}; // Specify the file's mime-type.
	file = new Blob([data]);
	var url = URL.createObjectURL(file);
	anchor.setAttribute('href', url);
	anchor.setAttribute('download', "Write Upp.txt");
	anchor.style.display = 'none';
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	localStorage.backup = '';
}

function loadFunction(){
	populateBgmLib();
	populateFontLib();
	populateKeyLib();
	populateBgList();
	data = localStorage.getItem('textCache');
	document.getElementById("keySoundLib").firstChild.click();
	//document.getElementById("bgmLib").firstChild.click();
}
function loadBackup(){
	if(!localStorage.backup || localStorage.backup==''){
	}
	else{
		if(confirm("Restore Last Session?")){
			textArea.value = localStorage.backup;
			//console.log(localStorage.backup);
		}
		else{
			localStorage.backup = '';
		}
	}
}
