
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    //var data = ev.dataTransfer.getData("text");
    console.log(data)
}

function drop(ev) {
    ev.preventDefault();
    //console.log("hello")
    //var data = ev.dataTransfer.getData("text");
    for (dat in data){
    transferred_data.push(data[dat]);
    console.log(data[dat])
    data_dup = [];
    //annotated_cluster[data.replace('drag_', '')] = Number(ev.target.id.replace('liclus',''))
    li_id = ev.target.id
    if (li_id.match(/drag/g) !=null){
    ev.target.parentNode.appendChild(document.getElementById(data[dat]));
    li_id = ev.target.parentNode.id;
    console.log(li_id)}
    else{
    ev.target.appendChild(document.getElementById(data[dat]));}
    annotated_cluster.push({key:data[dat].replace('drag_', ''), value:Number(li_id.replace('liclus',''))});
    data_dup = data[dat].replace('drag_', '').replace(/_/g,' ');
    if (cluster_filenames.hasOwnProperty(li_id)){
	ex_data = cluster_filenames
	data_dup = ex_data.push(data_dup)
    }
    cluster_filenames.push({key:li_id, value:data_dup});
    console.log(annotated_cluster)
    console.log(cluster_filenames) 
    }
    $(".selectOption").removeClass("selected")
    data=[]
    if (document.getElementById('liclus'+(Number(li_id.replace('liclus',''))+1).toString())===null){
    	$(".spawn").click()
    }
    pre_select=0
}

function undo(){
    obj = annotated_cluster.pop()
    transferred_data.pop()
    src_id = 'liclus'+ obj["value"].toString()
    target_id = 'drag_' + obj["key"]
    var elem = document.getElementById(target_id);
    elem.parentNode.removeChild(elem);
    var img = document.getElementById(obj["key"])
    img.appendChild(elem);
}
