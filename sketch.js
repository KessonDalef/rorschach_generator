var points1 = [];
var points2 = [];
var points3 = [];
var points4 = [];

var pos;
var npos;

var pg;

var maxPoints;
var maxDist;
var maxSize;

var font;
var showFont = true;

function preload() {
      font = loadFont("https://dl.dropboxusercontent.com/u/96815471/chaos/assets/SourceCodePro-ExtraLight.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    reset();
 
    textFont(font);
    
    textAlign(CENTER, CENTER);
    fill(0);
    text("[rorschach generator]\n\nHit r for random noise\nhit p for perlin noise\nhit s to download the image", width/2, height*0.85);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(windowWidth, windowHeight);
    reset();
    showFont = true;
    
    textAlign(CENTER, CENTER);
    fill(0);
    text("[rorschach generator]\n\nHit r for random noise\nhit p for perlin noise\nhit s to download the image", width/2, height*0.85);
}

function draw() {
    //
}

function reset() {
  background(255);

  points1 = [];
  points2 = [];
  points3 = [];
  points4 = [];

  pos = createVector(width/2, height/2);
  npos = createVector(random(10), random(10));

  maxPoints = floor(random(128, 1024));
  maxDist = floor(random(50, 250));
  maxSize = floor(random(width/40, width/80));
}

function randomGenerator() {
  if (points1.length < maxPoints) {
    for (var j = 0; j < maxPoints/20; j++) {
      append(points1, createVector(pos.x, pos.y));
      append(points2, createVector(width - pos.x, pos.y));
      append(points3, createVector(width - pos.x, height - pos.y));
      append(points4, createVector(pos.x, height - pos.y));
      for (var i = 0; i < points1.length; i++) {
        
        if (dist(pos.x, pos.y, points1[i].x, points1[i].y) < maxDist) {
          stroke(0, 25);
          line(pos.x, pos.y, points1[i].x, points1[i].y);
        }
        
        if (dist(width - pos.x, pos.y, points2[i].x, points2[i].y) < maxDist) {
          stroke(0, 25);
          line(width - pos.x, pos.y, points2[i].x, points2[i].y);
        }
        
        if (dist(width - pos.x, height - pos.y, points3[i].x, points3[i].y) < maxDist) {
          stroke(0, 25);
          line(width - pos.x, height - pos.y, points3[i].x, points3[i].y);
        }
        
        if (dist(pos.x, height - pos.y, points4[i].x, points4[i].y) < maxDist) {
          stroke(0, 25);
          line(pos.x, height - pos.y, points4[i].x, points4[i].y);
        }
        
      }
      pos.x += random(-maxSize, maxSize);
      pos.y += random(-maxSize, maxSize);
      
      if (pos.x < width*0.1 || pos.x > width*0.9) {
        pos.x = width/2;
      }
      
      if (pos.y < height*0.1 || pos.y > height*0.9) {
        pos.y = height/2;
      }
      
      npos.x += 0.1;
      npos.y += 0.1;
    }
  }
}

function noiseGenerator() {
  if (points1.length < maxPoints) {
    for (var j = 0; j < maxPoints/20; j++) {
      append(points1, createVector(pos.x, pos.y));
      append(points2, createVector(width - pos.x, pos.y));
      append(points3, createVector(width - pos.x, height - pos.y));
      append(points4, createVector(pos.x, height - pos.y));
      for (var i = 0; i < points1.length; i++) {
        
        if (dist(pos.x, pos.y, points1[i].x, points1[i].y) < maxDist) {
          stroke(0, 25);
          line(pos.x, pos.y, points1[i].x, points1[i].y);
        }
        
        if (dist(width - pos.x, pos.y, points2[i].x, points2[i].y) < maxDist) {
          stroke(0, 25);
          line(width - pos.x, pos.y, points2[i].x, points2[i].y);
        }
        
        if (dist(width - pos.x, height - pos.y, points3[i].x, points3[i].y) < maxDist) {
          stroke(0, 25);
          line(width - pos.x, height - pos.y, points3[i].x, points3[i].y);
        }
        
        if (dist(pos.x, height - pos.y, points4[i].x, points4[i].y) < maxDist) {
          stroke(0, 25);
          line(pos.x, height - pos.y, points4[i].x, points4[i].y);
        }
        
      }
      pos.x += map(noise(npos.x), 0, 1, -maxSize, maxSize);
      pos.y += map(noise(npos.y), 0, 1, -maxSize, maxSize);
      
      if (pos.x < width*0.1 || pos.x > width*0.9) {
        pos.x = width/2;
      }
      
      if (pos.y < height*0.1 || pos.y > height*0.9) {
        pos.y = height/2;
      }
      
      npos.x += 0.1;
      npos.y += 0.1;
    }
  }
}

function keyPressed() {
  if (key == 'R') {
    reset();
    randomGenerator();
    showFont = false;
  } else if (key == 'P') {
    reset();
    noiseGenerator();
    showFont = false;
  } else if (key == 'S') {
    save("rorschach.png");
  }
}