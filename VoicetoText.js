const clicktoconvert = document.getElementById('clicktoconvert'); // Start the speech recognition
const converttext = document.getElementById('converttext'); // Display the converted text
const stop = document.getElementById('stop');  // Stop the speech recognition
const download = document.getElementById('download');  // Download the text as a file   
/*clicktoconvert.addEventListener('click', function(){
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    //recognition.addEventListener('result', e => {
    //    const transcript = Array.from(e.results)
    //        .map(result => result[0])
    //        .map(result => result.transcript)
    //        converttext.innerHTML = transcript;

    //    })
    
    recognition.start();
   
    recognition.onresult = function(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            converttext.innerHTML = transcript;
    }        
})*/
window.SpeechRecognition = window.webkitSpeechRecognition; // Create a new instance of the SpeechRecognition object
const recognition = new SpeechRecognition();// Create a new instance of the SpeechRecognition object

// Start the speech recognition when the 'clicktoconvert' button is clicked
clicktoconvert.addEventListener('click', function() {
     
    recognition.interimResults = true;
    recognition.lang = 'en-US';
// Display the converted text
    recognition.addEventListener('result', e => {  
        const transcript = Array.from(e.results)   
            .map(result => result[0])   
            .map(result => result.transcript)     
            .join('');

        converttext.innerHTML = transcript;
    });
    
    recognition.continuous = true;
    recognition.start();
    
    /*recognition.onend = function() { // Restart the speech recognition when it ends
        recognition.start();
    } */  
    
});

stop.addEventListener('click', function() {
    recognition.continuous = false;
    recognition.stop();
});
download.addEventListener('click', function() {
    const text = converttext.innerHTML;
    const fileNameInput = document.createElement('input');// Create an input element for the file name
    fileNameInput.type = 'text';
    fileNameInput.placeholder = 'Enter file name';// Prompt the user to enter a file name
    fileNameInput.style.marginRight = '10px';// Add some margin to the right of the input element
    fileNameInput.style.width = '100%'; // Make the input container 2 times larger
    fileNameInput.style.height = '100%'; // Make the input container 30px high
    fileNameInput.style.borderRadius = '5px';// Add some border radius to the input element
    fileNameInput.style.padding = '5px 5px';// Add some padding to the input element
    fileNameInput.style.fontSize = '1rem';// Set the font size of the input element to 16px
    const confirmButton = document.createElement('button');//  Create a button element for the confirm button
    confirmButton.textContent = 'Confirm';
    confirmButton.style.padding = '5px 5px';// Add some padding to the button
    confirmButton.style.height = '80%';
    confirmButton.style.cursor = 'pointer';// Change the cursor to a pointer when hovering over the button
    confirmButton.style.borderRadius = '5px';// Add some border radius to the button
    confirmButton.style.marginRight = '10px';
    const cancelButton = document.createElement('button');
    cancelButton.style.height = '80%';
    cancelButton.textContent = 'Cancel';
    cancelButton.style.padding = '5px 5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.borderRadius = '5px';
    const container = document.createElement('div');

    container.appendChild(fileNameInput);
    container.appendChild(confirmButton);
    container.appendChild(cancelButton);
    container.style.display = 'flex';
    container.style.marginTop = '10px';
    container.style.alignItems = 'center';
    container.style.width = '25%';
    container.style.height = '5%';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    confirmButton.addEventListener('click', function() {
        const fileName = fileNameInput.value;
        if (fileName) {
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(url);
        }
        document.body.removeChild(overlay);
    });

    cancelButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
});

/*
download.addEventListener('click', function() {
    const text = converttext.innerHTML;
    const fileName = prompt('Please input file name!','Transcript.txt');
    if (fileName) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    }
});
*/