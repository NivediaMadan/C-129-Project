song1 ="";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_status = "";
scoreLeftWrist = 0;

function preload() {
    song1 = ("beauty_beast.mp3");
    song2 = ("headwing's theme.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    fill("#4B0D85");
    stroke("#4B0D85");

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        song1.stop();

        if(song2_status == flase) {
            song2.play();
            document.getElementById("song").innerHTML = "playing - beauty and the beast song";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.setSpeed(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftwristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}