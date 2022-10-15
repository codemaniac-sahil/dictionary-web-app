// This function will execute when the button is pressed

// const myloader = document.querySelector(".loader");

const myloader = document.querySelector(".lds-ring");


function clearOnFocus(obj) {
  obj.value = "";
}

function getmeaning() {
  let word = document.getElementById("word").value;
  if (!word) {

    document.getElementById("word").placeholder = "Please enter a word to search !!";
    return;
  }
  getdata(word);

    // document.querySelector(".main").innerHTML =
    //   '<h1 id="invalidWord">Please Enter the Word</h1>';
    // return;
  }
  // getdata(word);
  // document.getElementById("word").value = "";



// Enter key functionality
let input = document.getElementById("word");
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});

// This function fetch the data from API and show the data on screen
async function getdata(word) {
  var c = 1; // For counting number of examples
  var f_definition = ""; // initializing the meaning empty string
  var f_example = ""; // initializing the example empty string
  // API URL
  let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
  myloader.style.display = "block"; // Displaying the loader
  const response = await fetch(url);
  const data = await response.json();
  myloader.style.display = "none"; // Hiding the loader
  const statusCode = await response.status;
  if (statusCode != 200) {
    document.querySelector(".main").innerHTML=`
    <h1 id="invalidWord">
    Please enter a valid alphabet or word
    </h1>`;
  } else {
    for(var i=0; i < data[0].meanings.length; i++){
      const partOfSpeech = data[0].meanings[i].partOfSpeech
      // console.log(data[0]);
      // const partOfSpeech = "noun"
      f_definition = 
        f_definition + "<li><h4>" + partOfSpeech + "</h4></li><ol>"
      f_example = 
        f_example + "<li><h4>" + partOfSpeech + "</h4></li><ol>"
      for (var j = 0; j < data[0].meanings[0].definitions.length; j++){
        f_definition = 
          f_definition + "<li>" + data[0].meanings[0].definitions[j].definition + "</li>"

        if (data[0].meanings[0].definitions[j].example == undefined) {
          continue;
          
        } else {
          // Concatening all the examples of the word
          f_example +=
            "<li>" + data[0].meanings[0].definitions[j].example + "</li>";
        }
      }
      f_definition = 
        f_definition + "</ol>"
      f_example = 
        f_example + "</ol>"
        
        
        
        
        if(data[0].meanings[i].antonyms.length!=0){
          f_definition = f_definition + '<div class="antonyms"><h5> Antonyms: </h5>';
          for(var j =0;j<data[0].meanings[i].antonyms.length;j++){
            f_definition = 
            f_definition + data[0].meanings[i].antonyms[j] + ", "
          }
          f_definition = f_definition.slice(0,f_definition.length-2);
          f_definition = 
          f_definition + '</div>';
        }
        if(data[0].meanings[i].synonyms.length!=0){
          f_definition = f_definition + '<div class="synonyms"><h5> Synonyms: </h5>';
          for(var j =0;j<data[0].meanings[i].synonyms.length;j++){
            f_definition = 
            f_definition + data[0].meanings[i].synonyms[j] + ", "
          }
          f_definition = f_definition.slice(0,f_definition.length-2);
          f_definition = 
          f_definition + '</div>';
        }

    }
    // When there is no examples
    if (f_example == "") {
      f_example = f_example + "There are no examples ";
    }
    //Getting The Source Url Of The Word
    var f_url="";
    f_url=data[0].sourceUrls[0];
    // Getting Audio file path
    for (var j = 0; j < data[0].phonetics.length; j++) {
      if (data[0].phonetics[j].audio != "") {
        var audpath = data[0].phonetics[j].audio;
        break;
      }
    }
    let letter = data[0].word;

    document.querySelector(".main").innerHTML = ` 
    <div class="result">
    <div class="word-meaning">
    <div class="word-wrapper">
    <h1 class="word">${letter.charAt(0).toUpperCase() + letter.slice(1)}</h1>
    <img src="./assets/sound-svgrepo-com.svg" id="sound">
    </div>
    <h3>Meaning</h3>
    <div class="definition">
    <ul>
    ${f_definition}
    </ul>
    </div>
    </div>
    <div class="Url">
    <ul>
    <a class ="Urls" href=${f_url}>More Info On Word</a>
    </ul>
    </div>
    <div class="word-example-audio">
    <h3 id="change">Example</h3>
    <div class="example">
    <ul>
    ${f_example}
    <ul>
    </div>

    <div>
    <div class="audio">
    
    </div>
    </div>
    </div>
    `;
    var audio = new Audio(audpath);

    sound = document.getElementById("sound").addEventListener("click", () => {
      audio.play();
    });
  }
}


// scroll to top
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})