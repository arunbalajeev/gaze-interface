var BASE64_MARKER = ';base64,';
function convertDataURIToBinaryBuffer(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  //var buf = Buffer.from(base64, 'base64');
  return base64;
}
function savevideo1(submit){
	if (typeof(submit)==='undefined') {
        	submit=false;
    	}
	var fmkey_count=0
	for (var pair of video_blob.keys()) {
    		fmkey_count=fmkey_count+1;
	}
	console.log(fmkey_count)
	if (fmkey_count!=xbox.length)
	{
	document.getElementById('quali_text').innerHTML ='Submission Failed. Click and Gaze all the '+xbox.length.toString()+' boxes.<br/> '+fmkey_count.toString()+' boxes have been clicked and gazed.<br/> Please ensure all objects are gazed. Please use <b>Next</b> button to iterate over the objects.';
	$('#quali_info').modal('show');
	console.log('hehe')
    }
    else{
		click_record=1;
		x=document.getElementById('save_video');
		x.style.display='none';
		var ablob = new window.FileReader();
		var sblob = new window.FileReader();
		var fmkey_count=0;
		for (var pair of video_blob.keys()) {
	    		fmkey_count=fmkey_count+1;
		}
		console.log(fmkey_count)
		selfie.push(convertDataURIToBinaryBuffer(selfie_lefttop));selfie.push(convertDataURIToBinaryBuffer(selfie_righttop));selfie.push(convertDataURIToBinaryBuffer(selfie_leftbottom));selfie.push(convertDataURIToBinaryBuffer(selfie_rightbottom));
		function readFile(index) {
		    if( index >= fmkey_count ) return;

		    ablob.onload = function(e) {  
		        var base64dat = ablob.result; 
			str_arr.push(base64dat.substr(base64dat.indexOf(',')+1))
			if(index==fmkey_count-1){
				out_data = {blob:str_arr,selfie:selfie,submitted: submit,};
				console.log("qwerty0_0");console.log(str_arr);console.log(out_data);
				execute_ajax(out_data)
			}
		        readFile(index+1)
		    }
		    console.log(video_blob.getAll('videofile_'+index.toString()))
		    ablob.readAsDataURL(video_blob.getAll('videofile_'+index.toString())[0]);
		}
		
		readFile(0);
		function execute_ajax(out_data){
		console.log("qwerty");console.log(out_data);console.log(str_arr);
		$.ajax({
	      	type: "POST",
	      	//dataType: 'json',
	      	url: endpoint + 'savevideo1/',
	      	data: JSON.stringify(out_data),
	      	contentType:"application/json; charset=utf-8",
		//processData: false,
	      	success: function(data) {
		//alert("Hello")
			document.getElementById('quali_text').innerHTML ='Congratulations! The task is Completed.';
	      	}},'json').fail(function(jqXHR, textStatus, errorThrown) {
		console.log("error submitting ");
		document.getElementById('quali_text').innerHTML ='Congratulations! The task is Completed. Click Submit HIT now';
		$('#quali_info').modal('show');
		document.getElementById("submit_hit").style.visibility="visible";
		console.log(errorThrown);
		console.log(textStatus);
		console.log(jqXHR);
		});
		}
	}
}
