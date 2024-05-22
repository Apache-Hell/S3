const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const keyword = document.getElementById("keywordInput");
  let searchKeyword = keyword.value;
  if (searchKeyword.trim() === "") {
    alert("Please enter a keyword to search");
    return;
  }
  let url = `http://3.104.75.67:8081/speech-to-text/search/?text=${searchKeyword.trim()}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Success:", result);
    const para = document.getElementById("transcriptResult");

    const output = document.getElementById("transcriptInput");
    if (result?.length === 0) {
      para.innerHTML = "No results found";
      output.value = "No content found";
      output.classList.remove("textarea-height");
    }
    if (result?.length === 1) {
      para.innerHTML = "1 Result found";
      output.value = result[0].text;
      output.classList.add("textarea-height");
    }
    if (result?.length > 1) {
      para.innerHTML = `${result.length} Results found`;
      let text = "";
      result.forEach((element, index) => {
        text += `${index + 1}. ${element.text}\n\n`;
      });
      output.value = text;
      output.classList.add("textarea-height");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to search for text.");
  }
  // const response = await fetch(
});
