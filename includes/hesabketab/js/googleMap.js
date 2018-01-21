                    /*maps script*/
function initialize() {
   
    var myLatlng = new google.maps.LatLng(35.6891975,51.388973599999986);
  var mapProp = {
    center:myLatlng,
    zoom:13,
    mapTypeId:google.maps.MapTypeId.ROADMAP
      
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: '',
      draggable:true  
  });
    document.getElementById('lat').value= "";
    document.getElementById('lng').value= "";
    // marker drag event
    google.maps.event.addListener(marker,'drag',function(event) {
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('lng').value = event.latLng.lng();
    });

    //marker drag event end
    google.maps.event.addListener(marker,'dragend',function(event) {
        document.getElementById('lat').value = event.latLng.lat();
        document.getElementById('lng').value = event.latLng.lng();
        
        
        //alert("lat=>"+event.latLng.lat());
        //alert("long=>"+event.latLng.lng());
    });
}