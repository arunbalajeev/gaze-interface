var input;
var analyzer;

function setup() {
  var mycanvas= createCanvas(30, 100);
  mycanvas.parent('mic_thresh');
  //background(255);

  // Create an Audio input
  //if(mic_activated==1){
  input = new p5.AudioIn();
  input.start();
  //}
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  var volume = input.getLevel();
  volume=volume_level*volume;

  // If the volume > 0.1,  a rect is drawn at a random location.
  // The louder the volume, the larger the rectangle.
  var threshold = 0.25;
  if (volume > threshold) {
    stroke(0);
    fill(0, 100);
    //rect(random(40, width), random(height), volume*50, volume*50);
	if(recorder_no==0 && active==1){
    		$('#micthresh-list_0').html("<font color='green'></font>");approval0=1;
	}
	if(recorder_no==1 && active==1){
    		$('#micthresh-list_1').html("<font color='green'></font>");approval1=1;
	}
	if(recorder_no==2 && active==1){
    		$('#micthresh-list_2').html("<font color='green'></font>");approval2=1;
	}
	if(recorder_no==3 && active==1){
    		$('#micthresh-list_3').html("<font color='green'></font>");approval3=1;
	}
	if(recorder_no==4 && active==1){
    		$('#micthresh-list_4').html("<font color='green'></font>");approval4=1;
	}
  }

  // Graph the overall potential volume, w/ a line at the threshold
if(mic_activated==1){
  var y = map(volume, 0, 1, height, 0);
  var ythreshold = map(threshold, 0, 1, height, 0);

  noStroke();
  fill(175);
  rect(0, 0, 20, height);
  // Then draw a rectangle on the graph, sized according to volume
  fill(0);
  rect(0, y, 20, y);
  stroke(0);
  line(0, ythreshold, 19, ythreshold);
  }
}

function approval(){
  $('#micthresh-list_0').html("<font color='green'>Approved</font>");
}
