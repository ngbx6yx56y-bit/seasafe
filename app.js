mapboxgl.accessToken = "PASTE_YOUR_MAPBOX_TOKEN_HERE";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  center: [120.98, 14.6],
  zoom: 6
});
async function loadData(){
  const res = await fetch("https://seasafe-backend.onrender.com/live");
  const data = await res.json();
  document.getElementById("statusBar").innerText =
    `Active Rescues: ${data.sos.length} | Units Deployed: ${data.units.length} | Coverage: ${data.coverage}% | Last Sync: ${data.time}`;
  const sosList=document.getElementById("sosList");
  sosList.innerHTML="";
  data.sos.forEach(s=>{
    const li=document.createElement("li");
    li.innerText=`🚨 ${s.name} (${s.severity})`;
    li.onclick=()=>map.flyTo({center:s.location,zoom:9});
    sosList.appendChild(li);
    new mapboxgl.Marker({color:"red"}).setLngLat(s.location).addTo(map);
  });
}
setInterval(loadData,5000);
setInterval(()=>{
  document.getElementById("utcClock").innerText=new Date().toUTCString();
},1000);