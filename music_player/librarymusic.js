 Music player
Plays a directory of music

Plays songs in a subdirectory of the sketch called music

Put any songs you want in the music subdirectory, then
copy the list of song names into the songs[] array.

created by Tom Igoe
5 Feb 2017

Serial communication code added from the ITP Physical Computing lab examples.
New Code to add the robot sound/button sound feedback added by Jamie Ruddy
along with the fabulous 80s musical choices. 
*/

var serial; // variable to hold instance of serial library port
var portName = '/dev/cu.usbmodemHIDP1'; //fill in the port from app
var inData; // for incoming serial data

var song;		// the sound file to be played
var robot;   // the sound of the button press

// the list of songs:
var songs = ['WhiteWedding.m4a', 'Rio.m4a', 'SundayBloodySunday.m4a', 'IwontBackDown.mp3', 'RaspberryBeret.m4a', 'LikeAVirgin.m4a'];

var songCount = songs.length; // number of songs in the music dir
var currentSong = 0;          // current song number

function preload() {          // load the first song on preload
 song = loadSound('music/' + songs[currentSong]);
 robot = loadSound('robot.mp3');
}

function setup() {
  createCanvas(400, 300);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList); //st a callback function for the serialport list
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); //callback for the port opening
  serial.on('data', serialEvent); //callback for when new data arrives
  serial.on('close', portClose); //callback for the port closing

  serial.list();  // list the serial ports
  serial.open(portName); //open a serial port
}

function serverConnected() {
	println('connected to server.');
}

function portOpen() {
	println('the serial port opened.')
}

function serialEvent() {
	inData = Number(serial.read());
}

function serialError(err) {
	println('Something went wrong with the serial port. ' + err)
}

function portClose() {
	println('The serial port closed.')
}

function draw() {
  background(30, 20, 180);
  fill(255);
  // draw the song's name and current time in seconds:
  text(songs[currentSong], 20, 50);
  text(song.currentTime().toFixed(3), 20, 100);
  //text("sensor value: " + inData, 200, 200);
}

function controlSound(input) {
  switch(input) {
    case 49:   // start/stop, press 1
      if (song.isPlaying()){
       robot.play();
       robot.onended(song.stop());
        
      } else {
       robot.play();
       robot.onended(song.play());
      }
      break;
    case 50:   // play/pause, press 2
      if (song.isPlaying()){
       robot.play();
       robot.onended(song.pause());
      } else {
       robot.play();
       robot.onended(song.play());
      }
      break;
    case 51:    // skip ahead, press 3
      // make sure the song number is valid, and increment:
      if (currentSong < songs.length-1) {
        currentSong++;
      } else {
        currentSong = 0;
      }
      // get new song:
      getSong(currentSong);
      break;
    case 52:    // skip back, press 4
      // in the first second, just rewind the current track:
      if (song.currentTime() > 1.0) {
        robot.play();
        robot.onended(song.jump(0));
      // if more than a second has elapsed, then
      // make sure the song number is valid, and decrement:
      } else {
        if (currentSong > 0) {
          currentSong--;
        } else {
          currentSong = songs.length-1;
        }
        // get new song:
        getSong(currentSong);
      }
      break;
    case 53:    // fast forward, press 5
        robot.play();
        robot.onended(song.rate(2.0));   // double the play speed
      if (!song.isPlaying()){
        song.play();56
      }
      break;
    case 54:    // random song, press 6
      currentSong = Math.round(random(songCount));  // get a new song number
      getSong(currentSong);             // play it
      break;
  }
}

function getSong(songNumber) {
  if (songNumber < songs.length) {   // if the song number is in range
    if (song.isPlaying()) {
        song.stop();
    }
    // load a new song:
    song = loadSound('music/'+ songs[currentSong], resumePlay);
    return true;
  } else {        // if the song number was out of range, return false
    return false;
  }
}

function resumePlay() {
  // if the song isn't playing, play it
  if (song.isPlaying()){
   robot.play();
   robot.onended(song.stop());
  } else {
   robot.play();
   robot.onended(song.play());
  }
}

function keyReleased() {
  controlSound(keyCode);    // send the ASCII number of the key
}