// Write your JavaScript code here!

window.addEventListener("load", function() {
   const pilotInput = document.querySelector("input[name=pilotName]");
   const copilotInput = document.querySelector("input[name=copilotName]");
   const fuelInput = document.querySelector("input[name=fuelLevel]");
   const cargoInput = document.querySelector("input[name=cargoMass]");
   const launchStat = document.getElementById("launchStatus");
   const faultyVisibility = document.getElementById("faultyItems");
   const fuelStat = document.getElementById("fuelStatus");
   const cargoStat = document.getElementById("cargoStatus");


   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
       response.json().then(function(json) {
          let index = Math.floor(Math.random()*json.length);
          const destination = document.getElementById("missionTarget");
          let selection=json[index];
          destination.innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
            <li>Name: ${selection.name}</li>
            <li>Diameter: ${selection.diameter}</li>
            <li>Star: ${selection.star}</li>
            <li>Distance from Earth: ${selection.distance}</li>
            <li>Number of Moons: ${selection.moons}</li>
         </ol>
         <img src="${selection.image}"></img>      
           `
      });
   });

  let form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
  
     if ( Number(fuelInput.value) < 10000 ) {
         // stop the form submission
         event.preventDefault();
         fuelStat.innerHTML="Fuel level too low for launch";
         launchStat.innerHTML = "Shuttle Not Ready for Launch";
         launchStat.style.color = "red";
         faultyVisibility.style.visibility = "visible";

     } 
     
     if ( Number(cargoInput.value) > 10000 ) {
         event.preventDefault();
         cargoStat.innerHTML="Cargo mass too high for launch";
         launchStat.innerHTML = "Shuttle Not Ready for Launch";
         launchStat.style.color = "red";
         faultyVisibility.style.visibility = "visible";

     } 

     if ( Number(fuelInput.value) >= 10000 && Number(cargoInput.value) <= 10000 ) {
       event.preventDefault();
       launchStat.innerHTML = "Shuttle is ready for launch";
       launchStat.style.color = "green";
       faultyVisibility.style.visibility = "hidden";

     }

     if ( !(isNaN (Number(pilotInput.value))) || !(isNaN (Number(copilotInput.value))) || isNaN (Number(fuelInput.value)) || isNaN (Number(cargoInput.value))  ) {
      event.preventDefault();  
      alert("Make sure to enter valid information for each field!");
      launchStat.innerHTML = "Awaiting Information Before Launch";
      launchStat.style.color = "black";
      faultyVisibility.style.visibility = "hidden";

   }                 

     if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoInput.value === "") {
      event.preventDefault();
      alert("All fields are required!");
      launchStat.innerHTML = "Awaiting Information Before Launch";
      launchStat.style.color = "black";
      faultyVisibility.style.visibility = "hidden";
   }

  });
});
