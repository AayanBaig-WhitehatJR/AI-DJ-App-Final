song = ""
speed = ""
volume = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
storeLeftWrist = 0; 
storeRightWrist = 0;
function preload(){
song = loadSound("music.mp3")
}
function setup(){
canvas = createCanvas(600, 500)
canvas.center()
video = createCapture(VIDEO)
video.hide()
poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotResult)
}
function modelLoaded(){
    console.log("Model has been loaded.")
}
function gotResult(results){
    if(results.length > 0){
        console.log(results)
        storeLeftWrist = results[0].pose.keypoints[9].score
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Left Wrist X: " + leftWristX + " | Left Wrist Y: " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x 
    rightWristY = results[0].pose.rightWrist.y
    storeRightWrist = results[0].pose.keypoints[10].score 
console.log("Right Wrist X: " + rightWristX + " | Right Wrist Y: " + rightWristY)    
}    
}
function draw(){
image(video, 0, 0, 600, 500)
if(storeLeftWrist > 0.2){
fill("#e3c7bf")
stroke("#ffcdbf")
circle(leftWristX, leftWristY, 20)
leftWristYDecimal = Number(leftWristY)
leftWristYNoDecimal = floor(leftWristYDecimal)
volume = leftWristYNoDecimal / 500 
document.getElementById("h3volume").innerHTML = "Volume ^ : " + volume;
song.setVolume(volume)
}
if(storeRightWrist > 0.2){
fill("#e3c7bf")
stroke("#ffcdbf")
circle(rightWristX, rightWristY, 20)
if(rightWristY > 0 && rightWristY <= 100){
    document.getElementById("h3speed").innerHTML = "Speed ^ : 0.5x" 
    song.rate(0.5)
}
else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("h3speed").innerHTML = "Speed ^ : 1x" 
    song.rate(1)
}
else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("h3speed").innerHTML = "Speed ^ : 1.5x" 
    song.rate(1.5)
}
else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("h3speed").innerHTML = "Speed ^ : 2x" 
    song.rate(2)
}
else if(rightWristY > 400 && rightWristY <= 500){
    document.getElementById("h3speed").innerHTML = "Speed ^ : 2.5x" 
    song.rate(2.5)
}
}
}
function play(){
song.play()
song.rate(1)
}
function stop(){
    song.stop()
}