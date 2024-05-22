const Uploadbtn = document.getElementById("Uploadbutton");
//const Transcript = document.getElementById("Transcript");
const Summarybtn = document.getElementById("Summarybutton")
const Transcriptshow = document.getElementById("Transcript")
const SummaryOutputshow = document.getElementById("SummaryOutput")
Transcriptshow.style.visibility="hidden"
SummaryOutputshow.style.visibility="hidden"
Transcriptshow.textContent = ""
// Define upload button function: accept input filenmae and transfer the file to server
/* Uploadbtn.onclick = function(){
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
}  */
// Define the upload button function to handle file selection and send it to the server
Uploadbtn.addEventListener('click', function(event) {
  // Prevent any default button click behavior
  event.preventDefault();
  // Create a file input on the fly
  let fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'audio/*'; // Accept any audio file
  fileInput.click(); // Simulate a click on the file input
  
  // Once a file is selected, handle the file upload
  fileInput.onchange = function(e) { // Use 'e' or another variable name instead of 'event'
  let audioFile = e.target.files[0];
  
  // Create a FormData instance and append the selected file
  const formData = new FormData();
  formData.append('audio', audioFile);
  
  // Display a loading message in the Transcript element
  Transcriptshow.textContent = 'Transcribing...';

  Transcriptshow.style.visibility = "visible";
  fetch('http://localhost:8989/test')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(text => {
    console.log('Success:', text);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // Send a POST request to the '/transcribe' endpoint
  fetch('http://localhost:8989/transcribe', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })// Parse the JSON response
  .then(data => {
    
    // Update the transcript with the response from the server
    Transcriptshow.textContent = data.transcript;
    Transcriptshow.style.visibility = "visible";
  })
  .catch(error => {
    console.error('Error:', error);
    Transcriptshow.textContent = 'Failed to transcribe audio.';
  });
}
});
 

Summarybtn.onclick = async function(event){
  event.preventDefault();
  const trans = Transcriptshow.textContent;
  if (trans?.trim() !== ""){ 
    SummaryOutputshow.textContent = 'Summarizing...';
    SummaryOutputshow.style.visibility = "visible";
    await summarize();
  }
  else{
    alert("No transcript to summarize!");
  }
  const text = SummaryOutputshow.textContent;
  
  const data = {
    text,
  };
  if (text?.trim() !== "" && text?.trim() !== "Error while summarizing." && trans?.trim() !== "" &&
  text?.trim() !== "Unexpected response format." &&  text?.trim() !== "Failed to summarize." && 
  text?.trim() !== "The provided context does not contain any paragraph to summarize. Please provide the paragraph for summarization."){
    const url = "http://3.104.75.67:8081/speech-to-text/speech/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Text uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload text.");
    }
  }  
    
};

async function summarize() {
  const prompt = "Please summarize the following paragraph:" + Transcriptshow.textContent;
  // Replace 'YOUR_API_KEY' with your actual API key
  const apiKey = 'Milan please add your API key here';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const requestBody = {
  contents: [
  { parts: [{ text: prompt }] }
  ]
  };
  
  try {
  const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
    const summary = data.candidates[0].content.parts.map(part => part.text).join(' ');
    SummaryOutputshow.textContent = summary;
    SummaryOutputshow.style.visibility = "visible";
  } else {
    console.error('Unexpected response format:', data);
    SummaryOutputshow.textContent = 'Unexpected response format.';
    SummaryOutputshow.style.visibility = "visible";
  }
  
  } catch (error) {
  console.error('Error while summarizing:', error);
  SummaryOutputshow.textContent = 'Error while summarizing.';
  SummaryOutputshow.style.visibility = "visible";
  }
  }
  
