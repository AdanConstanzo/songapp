// numbers of bars around circle
	// Premade code to remove an element 
Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for(var i = this.length - 1; i >= 0; i--) {
				if(this[i] && this[i].parentElement) {
						this[i].parentElement.removeChild(this[i]);
				}
		}
}
// Premade code to remeove an elmenet in an Array 
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
// Premade code to shuffe the elements in an Array
function shuffle(a) {
		var j, x, i;
		for (i = a.length; i; i -= 1) {
				j = Math.floor(Math.random() * i);
				x = a[i - 1];
				a[i - 1] = a[j];
				a[j] = x;
		}
};
//numbers of bars
var FFTSIZE = 256;
var playlist = 
		["media/donkeykong_64-001.mp3" ,'media/halo_3-001.mp3',"media/fzero_nes-001.mp3", "media/legend_twi-001.mp3", "media/mariokart_64-001.mp3", "media/pokemon_alpha-001.mp3", "media/ssbm_m-001.mp3", "media/starfox_64-001.mp3"];

var currentNumber = 0;

var audio = new Audio();

shuffle(playlist)
audio.src = playlist[0];
audio.proceed = true;

audio.playIt = function(){
	 audio.playing = true;
	  // Show loading animation.
		var playPromise = audio.play();

		if (playPromise !== undefined) {
			playPromise.then(_ => {
				// Automatic playback started!
				// Show playing UI.
			})
			.catch(error => {
				// Auto-play was prevented
				// Show paused UI.
				console.log(error)
				audio.playIt();
			});
		}
}

audio.stop = function(){
	 audio.pause();
}

audio.next = function(){
	 currentNumber += 1
	 console.log(currentNumber);
	 audio.src = playlist[currentNumber]
	 audio.playIt();
}

var currentSong = function(){
		return playlist[currentNumber].replace('media/','').replace('.mp3','').split("-").shift()+'-';
}

var nextSong = function(){
		var tempPlaylist = playlist;
		var tempNumber = currentNumber;
		return tempPlaylist[tempNumber+=1].replace('media/','').replace('.mp3','').split("-").shift()+'-';
}

var whatIsMyImgSource = function(img){
		return img.src.split("/").pop().split(".").shift();
}


/*  * A function that changes the image sources    */    
var  alterImagesSource = function(img1,im2,img3,img4){
		/*  * an array of game titles   */
		var imgSrc = ['donkeykong_64-','fzero_nes-','halo_3-','legend_twi-','mariokart_64-','pokemon_alpha-','ssbm_m-','starfox_64-'];

		/*  * a function that finds the next element of the current song from the array about   */
		function findElementNext(){

				for(var i =0 ; i < imgSrc.length; i++){
								if(imgSrc[i]== nextSong()){
												 return i;
										 }
								}
		}
		/*  * I have not idea LOL   */
		function findElementCurrent(){

				for(var i =0 ; i < imgSrc.length; i++){
						if(imgSrc[i]== currentSong()){
										 return i;
								 }
				}
		}
		/*  * an if else that removes the elements   */
		var tempImgSrc = imgSrc;
		
		tempImgSrc.remove(findElementCurrent());
		

		shuffle(tempImgSrc);
		/*  * a random number to randmonly set our image   */
		var x = Math.floor((Math.random() * 4));
		/*  * cases based off of x   */
		if(x== 0){
				img1.src ="Images/"+currentSong()+".png"
				img2.src="Images/"+tempImgSrc[0]+".png"
				img3.src="Images/"+tempImgSrc[1]+".png"
				img4.src="Images/"+tempImgSrc[2]+".png"
		}else if (x==1){
				img1.src="Images/"+tempImgSrc[0]+".png"
				img2.src="Images/"+currentSong()+".png"
				img3.src="Images/"+tempImgSrc[1]+".png"
				img4.src="Images/"+tempImgSrc[2]+".png"
		}else if ( x==2){
				img1.src="Images/"+tempImgSrc[0]+".png"
				img2.src="Images/"+tempImgSrc[1]+".png"
				img3.src="Images/"+currentSong()+".png"
				img4.src="Images/"+tempImgSrc[2]+".png"
		}else if(x==3){
				img1.src="Images/"+tempImgSrc[0]+".png"
				img2.src="Images/"+tempImgSrc[1]+".png"
				img3.src="Images/"+tempImgSrc[2]+".png"
				img4.src="Images/"+currentSong()+".png"
		}

}; //end of alterImageSource

function doThings(img1,img2,img3,img4){
		audio.next();
		alterImagesSource(img1,img2,img3,img4);
		fadeIt();
		addScore();
};
		/*  * just a collection of functions   */
function doOtherThings(img){
		$(img).slideUp();
		console.log("this is the song " + currentSong());
		console.log("this is what you clicked "+ whatIsMyImgSource(img));
		subtractScore();
};

// border thickness of the circle
var BORDER_SIZE = 0;
// number of bars around the circle Do not modify this value. Change FFTSIZE instead, to 32 <= value=2^n <= 2048.
var NUM_BARS = FFTSIZE / 2;
/* space between 2 consecutives bars. This value modify the width of the bars.
			0: no space between 2 consecutive bars. The bars has the maximum width.
			1: between 2 consecutive bars there is enough space for another bar.
			> 1: the bar width decrease.
	*/

//----------------
// spacing between bars.... adds a huge difference!
//----------------
var SPACING = 0.3;
// diameter size: % in respect to the width
var D_PERC = 0.75;
// minimum height of the bars. If zero, the bars will be invisible with low amplitude frequency value. 
var MIN_HEIGHT = 1;
// frequency increase from 0 to Max in ccw (counter clock wise) direction or cw (clock wise) direction.
var DIRECTION = "ccw";
// boolean value. If true, the vertical diameter of the circle will be a symmetry plane.
var SYMMETRY = false;



var body = document.body;
var picSet1 = document.createElement('div');
var picSet2 = document.createElement('div');
picSet1.id = 'picSet1';
picSet2.id = 'picSet2';
body.appendChild(picSet1);
body.appendChild(picSet2);

var img1 = document.createElement('img'),
		img2 = document.createElement('img'),
		img3 = document.createElement('img'),
		img4 = document.createElement('img'),
		heart1 = document.createElement('img'),
		mid = document.createElement('img'),
		life = document.createElement('div');

img1.id = 'img1';
img2.id = 'img2';
img3.id = 'img3';
img4.id = 'img4';
mid.id = 'mid';
life.id = 'hearts';


heart1.src = 'Images/heart.png'

picSet1.appendChild(img1);
picSet1.appendChild(img2);
picSet2.appendChild(img3);
picSet2.appendChild(img4);
body.appendChild(mid);
body.appendChild(life);
//---------------------------
// Repeate function yet to be added
//---------------------------
		/*var repeat = document.createElement('img');
		repeat.id='repeat';
		repeat.src="Images/repeat.png"*/

//------------------------------------------------------------------------------
//              Going to add our jQuery Logic right here
//------------------------------------------------------------------------------
$(img1).bind('click',function(){
		if(currentSong()==whatIsMyImgSource(img1)){
				mid.src = 'Images/decals/'+whatIsMyImgSource(img1).split("_").shift()+'-d.png';
				doThings(img1,img2,img3,img4);
		}else{
				doOtherThings(img1);
		}
});

$(img2).bind('click',function(){
		if(currentSong()==whatIsMyImgSource(img2)){
				mid.src = 'Images/decals/'+whatIsMyImgSource(img2).split("_").shift()+'-d.png';
				doThings(img1,img2,img3,img4);
		}else{
				doOtherThings(img2);
		}
});

$(img3).bind('click',function(){
		if(currentSong()==whatIsMyImgSource(img3)){
				mid.src = 'Images/decals/'+whatIsMyImgSource(img3).split("_").shift()+'-d.png';
				doThings(img1,img2,img3,img4);
		}else{
				doOtherThings(img3);
		}
});

$(img4).bind('click',function(){
		if(currentSong()==whatIsMyImgSource(img4)){
				mid.src = 'Images/decals/'+whatIsMyImgSource(img4).split("_").shift()+'-d.png';
				doThings(img1,img2,img3,img4);
		}else{
				doOtherThings(img4);
		}
});




//-------------------------
//   ANIMATION
//-------------------------
var canvas = document.getElementById('myCanvas'); 

var processing = new Processing(canvas, function(p){
		
		var w = canvas.offsetWidth;
		var h = canvas.offsetHeight;

		var d1, cx1, cy1, len;
		var wb, hb, angle_incr;

		window.addEventListener('resize', function(){
				p.setup();
		});
		var color = "";
		
	p.setup = function(){
			var x = Math.floor((Math.random() * 3) + 1);
			if(x==1){
					color="blue";
			}
			else if (x==2){
					color ="red";
			}
			else if(x==3){
					color="green";
			}
			d1 = w * D_PERC;
			cx1 = w / 2;
			cy1 = h / 2;
			len = Math.PI * d1;

			// bar width
			wb = len / ((1 + SPACING) * NUM_BARS);
			angle_incr = 2 * Math.PI / NUM_BARS;
			if (DIRECTION == "ccw") {

					angle_incr *= -1;
			}
			hb = (w - d1) / 2;

			p.size(w, h);
			//p.frameRate(20);
			p.smooth();  // use anti-aliasing
			p.background(255, 0); // set to transparent background
			p.noStroke();
	};

	p.draw = function() {
			p.background(255, 0); // set to transparent background

			// Move the coordinate system to the center of the screen
			p.translate(cx1, cy1);
			p.rotate(Math.PI);

			// draw bars
			if (audio.proceed){

					drawBars();
			} else {

					drawDefaultBars(NUM_BARS, wb, angle_incr);
			}

			// draw disk
			p.smooth();  // use anti-aliasing
			p.stroke(50);
			p.fill(50, 100);
			if (BORDER_SIZE > 0) {

					p.strokeWeight(BORDER_SIZE);
			} else {

					p.noStroke();
			}
			p.ellipse(0, 0, d1, d1);
			
	};
		
	function drawBars() {
			var freqDomain = new Uint8Array(audio.analyser.frequencyBinCount);
			
			audio.analyser.getByteFrequencyData(freqDomain);
			
			if (!SYMMETRY) {
					if (!audio.playing) {
						drawDefaultBars(NUM_BARS, wb, angle_incr);
					}
					else {
							for (var i = 0; i < audio.analyser.frequencyBinCount; i++) {
								var value = freqDomain[i] / 255;
								p.rotate(angle_incr);
								p.noStroke();
								if(color =="blue"){
										p.fill(i,i*2,i*8);
								}
								else if(color=="red"){
										p.fill(i*8,i*2,i);
								}
								else if(color =='green'){
										p.fill(i,i*8,i*2);
								}
								
								var hBar = hb * value;
								
								if (hBar < MIN_HEIGHT) {
										hBar = MIN_HEIGHT;
								}
								p.rect(-wb / 2, d1 / 2, wb, hBar);
							}
					}
			} 
			else {
					if (!audio.playing) {
						drawDefaultBars(FFTSIZE, wb / 2, angle_incr / 2);
					}
					else {
							for (var i = 0; i < 2*audio.analyser.frequencyBinCount; i++) {
									var value;
									if (i < audio.analyser.frequencyBinCount) {
											value = freqDomain[i] / 255;
									} 
									else {
											value = freqDomain[2 * audio.analyser.frequencyBinCount - i - 1] / 255;
									}
									p.rotate(angle_incr / 2);
									p.noStroke();
									p.fill(255);
									var hBar = hb * value;
									if (hBar < MIN_HEIGHT) {
											hBar = MIN_HEIGHT;
									}
									if (!audio.playing) {
											hBar = MIN_HEIGHT;
									}
									p.rect(-wb / 2, d1 / 2, wb / 2, hBar);
							}
					}
			}
	}



	function drawDefaultBars(nRect, wRect, angleIncr){
			for (var i = 0; i < nRect; i++) {
					p.rotate(angleIncr);
					p.noStroke();
					p.fill(255);
					p.rect(-wb / 2, d1 / 2, wRect, MIN_HEIGHT);
		}
	};
		
}); 


// care b/c it's a gloabl now 
var number = 0;
function addScore(){
		number++;
		if(number == 5){
				number = 0;
				var temp =  document.createElement('img');
				life.appendChild(temp);
				body.appendChild(life);
				temp.src="Images/heart.png";
		}
}; // end of add score
function subtractScore(){
		number = 0;
		life.removeChild(life.childNodes[0]);
		if(!life.childNodes[0]){

				audio.pause();
				$(img1).unbind('click');
				$(img2).unbind('click');
				$(img3).unbind('click');
				$(img4).unbind('click');
				// remove visualizer
				document.getElementById('myCanvas').remove();
				
				//---------------------------
				// Repeate function yet to be added
				//---------------------------
					/*  document.getElementById('body').appendChild(repeat);
						$(repeat).bind('click',function(){
								shuffle(playlist.audio)
								visual()
								$(repeat).unbind('click')
						})*/

		}
}; // end of subtractScore

/*  * function to do some jquery magic   */
function fadeIt(){
		
		var x = Math.floor((Math.random() * 4) + 1);
		
		if(x==1){
				DIRECTION = 'ccw';
				processing.setup();
				MotionUI.animateIn(mid, 'scale-in-down');
				MotionUI.animateIn(img1, 'slide-in-left');
				MotionUI.animateIn(img2, 'slide-in-right');
				MotionUI.animateIn(img3, 'slide-in-left');
				MotionUI.animateIn(img4, 'slide-in-right');
		}
		else if(x==2){
				DIRECTION = 'cw';
				processing.setup();
				MotionUI.animateIn(mid, 'scale-in-up');
				MotionUI.animateIn(img1, 'slide-in-down');
				MotionUI.animateIn(img2, 'slide-in-down');
				MotionUI.animateIn(img3, 'slide-in-up');
				MotionUI.animateIn(img4, 'slide-in-up');
		}
		else if(x==3){
				DIRECTION = 'ccw';
				processing.setup();
				MotionUI.animateIn(mid,'hinge-in-from-top')
				MotionUI.animateIn(img1, 'hinge-in-from-left');
				MotionUI.animateIn(img2, 'hinge-in-from-right');
				MotionUI.animateIn(img3, 'hinge-in-from-left');
				MotionUI.animateIn(img4, 'hinge-in-from-right');
		}
		else if(x==4){
				DIRECTION = 'cw';
				processing.setup();
				MotionUI.animateIn(mid,'hinge-in-from-bottom')
				MotionUI.animateIn(img1, 'hinge-in-from-middle-x');
				MotionUI.animateIn(img2, 'hinge-in-from-middle-y');
				MotionUI.animateIn(img3, 'hinge-in-from-middle-x');
				MotionUI.animateIn(img4, 'hinge-in-from-middle-y');
		}
		
		

};

//-----------------------------------------
// checks to see wheter web audio api works 
// and does other stuff
//-----------------------------------------
try {
		// More info at http://caniuse.com/#feat=audio-api
		window.AudioContext = window.AudioContext ||window.webkitAudioContext;
		audio.context = new window.AudioContext();
		audio.analyser = audio.context.createAnalyser();
		audio.analyser.fftSize = FFTSIZE;
		audio.source = audio.context.createMediaElementSource(audio)
		audio.source.connect(audio.analyser);
		audio.analyser.connect(audio.context.destination);
		for(var i =0; i < 3 ;  i ++){
				var heart = document.createElement('img');
				heart.src = 'Images/heart.png';
				life.appendChild(heart);
		}
		alterImagesSource(img1,img2,img3,img4);
		audio.playIt();
		
} catch(e) {
		audio.proceed = false;
		alert('Web Audio API not supported in this browser.');
}