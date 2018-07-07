/*
$("#submit_hit_form").on('submit',function(ev){
    document.write("Hello")
    worker_id = document.getElementById('workerId').value;
    ev.preventDefault();
    // Check that there are actually 5 annotations from this guy
    var num_added=0;
    var len = AnnotatedData.length()
    var Nimages = document.getElementsByClassName("mySlides");
    if (len == Nimages.length){
    save(false, true)
    $("#amt_submit").submit()
    }
    else{
    $('#submit_result').html('<span class="alert alert-error" role="alert">Cannot submit: Only ' + (len) + ' images were annotated by you</span>');
    }
});
*/

