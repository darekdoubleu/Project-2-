let song;

var slider;


function setup() {
    createCanvas(200, 200);
    song = loadSound('song1.mp3', loaded);
    button = createButton("play");
    button.mousePressed(togglePlaying);
    button.position(75, 125);
    slider = createSlider(0, 1, .5, 0.01);
    slider.position(75, 75);
    slider.style('width', '80px');
}


function loaded() {
    song.play();
}

function togglePlaying() {
    if (!song.isPlaying()) {
        song.play();
        button.html("pause");
    } else {
        song.pause();
        button.html("play");
    }
}

function draw() {
    song.setVolume(slider.value());
    background('#222222');
}
