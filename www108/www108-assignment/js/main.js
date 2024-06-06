// alert("Files connected - JS working.");

// SETTING VARIABLES
// Instructions for User
const instructions = document.querySelector(" #instructions");
// Character
const character = document.querySelector(" .character");
const characterName = document.querySelector(" .character-name");
const characterImage = document.querySelector(" .character-image");
const characterBio = document.querySelector(" .character-bio");
const nicknames = document.querySelector(" .nicknames");
// Coven
const coven = document.querySelector(" .coven");
const covenName = document.querySelector(" .coven-name");
const covenImage = document.querySelector(" .coven-image");
const covenBio = document.querySelector(" .coven-bio");
// Palisman
const palisman = document.querySelector(" .palisman");
const palismanName = document.querySelector(" .pal-name");
const palismanImage = document.querySelector(" .pal-image");
const palismanBio = document.querySelector(" .pal-bio");

// Anchor Link Buttons
const cta = document.querySelector(" #learn-more");
const anchor1 = document.querySelector(" .anchor-1");
const anchor2 = document.querySelector(" .anchor-2");

// JSON file
const urlJSON = "owl-house.json"; // Pathname relative to html file

const characters = document.querySelectorAll(" .character-nav a");
console.log(characters);

for (const selected of characters){
    // Go through options and figure out which one was clicked on

    selected.onclick = function(e){
        e.preventDefault();

        // Which one was clicked on?
        console.log(selected);

        // We can now pull the data-selection attribute and its value from our markup. It was data-selection = ""
        const profile = this.dataset.selection; // dataset attribute. provides read/write access to custom data attributes (data-*) on elements. https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        console.log(profile);

        // Now that we have the value of the data-selection attribute, we can fetch the data in the JSON file, and match it to the corresponding record              
        fetch(urlJSON)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // Do stuff with the data by using a loop
            for(const record of data){
                // Test if the index number in the JSON file matches the data-selection attribute stored in the variable called profile
                if(profile == record.index){
                    console.log(`The selected profile is ${profile}, ${record.name}, record number ${record.index}.`); // profile and recordID are going to be the same (this will only work if they match, and the return will display both matching numbers)

                    // Change content according to selected link
                    // Character
                    characterName.innerHTML = record.name;
                    characterBio.innerHTML = record.bio;
                    nicknames.innerHTML = `<h3 class="h5">Nicknames:</h3><p>${record.nicknames[0]} and ${record.nicknames[1]}</p>`;
                    characterImage.src = record.characterImg;
                    characterImage.alt = record.name;
                    // Coven
                    covenName.innerHTML = record.track.coven;
                    covenBio.innerHTML = record.track.description;
                    covenImage.src = record.track.sigil;
                    covenImage.alt = record.track.name;
                    covenImage.classList.remove("img-adjust-2");
                    // Palisman
                    palismanName.innerHTML = record.palisman.name;
                    palismanBio.innerHTML = record.palisman.bio;
                    palismanImage.src = record.palisman.palImg;
                    palismanImage.alt = record.palisman.name;
                    palismanImage.classList.remove("img-adjust-1");
                    palisman.classList.remove("flex-column");

                    // Change text before anchor links to match each character's pronouns
                    cta.innerHTML = `Learn more about ${record.pronouns}:`;

                    // When in light mode, add and change border color based on character chosen
                    // When in dark mode, add colourful glow to cards based on character chosen
                    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
                    if (!darkMode.matches && record.name == "Luz Noceda") {
                        character.style.border = `5px solid orange`;
                        coven.style.border = `5px solid orange`;
                        palisman.style.border = `5px solid orange`;
                    } else if (!darkMode.matches && record.name == "Willow Park") {
                        character.style.border = `5px solid seagreen`;
                        coven.style.border = `5px solid seagreen`;
                        palisman.style.border = `5px solid seagreen`;
                    } else if (!darkMode.matches && record.name == "Augustus Porter") {
                        character.style.border = `5px solid steelblue`;
                        coven.style.border = `5px solid steelblue`;
                        palisman.style.border = `5px solid steelblue`;
                    } else if (!darkMode.matches && record.name == "Amity Blight") {
                        character.style.border = `5px solid darkmagenta`;
                        coven.style.border = `5px solid darkmagenta`;
                        palisman.style.border = `5px solid darkmagenta`;
                    } else if (darkMode.matches) {
                        character.style.boxShadow = `2px 2px 20px var(--glow-${record.glow})`;
                        coven.style.boxShadow = `2px 2px 20px var(--glow-${record.glow})`;
                        palisman.style.boxShadow = `2px 2px 20px var(--glow-${record.glow})`;
                    } 
                }
                // Change text on anchor link buttons from plural to singular when characters are selected
                anchor1.innerHTML = "Coven Track";
                anchor2.innerHTML = "Palisman";
            }
        })
        .catch(function(error){
            // If there is an error, do the following
            console.log(error);
            // alert("Sorry, cannot retrieve character information at this time. Please try again later.");
            instructions.innerHTML = "Sorry, cannot retrieve character information at this time. Please try again later.";
            instructions.style.backgroundColor = "firebrick";
        });
    }
}

document.querySelector(".reset-button").onclick = function(){
    // console.log("RESET!");
    window.location.reload(); // refresh page and reset cards when user clicks reset button
}