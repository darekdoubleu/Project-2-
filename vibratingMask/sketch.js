let song;

function setup() {
	createCanvas(windowWidth, windowHeight);
	song = loadSound('assets/aura.mp3');
	background(255, 0, 0);
}

function draw() {

}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}