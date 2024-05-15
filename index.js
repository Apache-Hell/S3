const Uploadbtn = document.getElementById("Uploadbutton");
//const Transcript = document.getElementById("Transcript");
const Summarybtn = document.getElementById("Summarybutton")
const Transcriptshow = document.getElementById("Transcript")
const SummaryOutputshow = document.getElementById("SummaryOutput")
Transcriptshow.style.visibility="hidden"
SummaryOutputshow.style.visibility="hidden"

// Define upload button function: accept input filenmae and transfer the file to server
Uploadbtn.onclick = function(){
    const reader = new FileReader();
    reader.onload = function(event) {
        const Transcript = document.getElementById('Transcript');
        Transcript.textContent = event.target.result;
        Transcript.style.visibility="visible"
    };


    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.csv';
    fileInput.click();
    fileInput.onchange = function(event) {
        let filename = event.target.files[0];
        reader.readAsText(filename);
        
        //Transcript.value = filename ? filename.name : "Transcript...";
    }
}

Summarybtn.onclick = function(){
    const reader = new FileReader();
    reader.onload = function(event) {
        const Transcript = document.getElementById('SummaryOutput');
        Transcript.textContent = event.target.result;
        Transcript.style.visibility="visible"
    };


    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.csv';
    fileInput.click();
    fileInput.onchange = function(event) {
        let filename = event.target.files[0];
        reader.readAsText(filename);
        
        
        
    }
}

/*
fetch('https://apis.ecan.govt.nz/waterdata/observations/graphql', {
  method: 'POST', 
  headers: { 
    'Content-Type': 'application/json', 
    'Ocp-Apim-Subscription-Key': 'ec9a031b4a674316b1bb21d9479f4595'
  }, 
  body: JSON.stringify({ query: `
    query { 
      getObservations { 
        locationId 
        name
         
      } 
    }` 
  }), 
}) 
.then(res => res.json()) 
.then(data => { const names = [...new Set(data.data.getObservations.map(observation =>  observation.name.split(' at ')[0]))]; // Split the name at "at" and take the first part 
const transcript = document.getElementById('Transcript'); transcript.textContent = names.join(',\n'); 
transcript.style.visibility = 'visible'; }) .catch(error => { console.error('Error:', error); });*/

