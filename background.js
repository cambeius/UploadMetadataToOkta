function createMyButton(){
    var toolbar = document.querySelector("#backbone-container > div > div.saml-wizard-header > h1"),
        nextButton = document.querySelector("#form38 > div.o-form-button-bar > input.button.button-primary"),
        newdiv = document.createElement("div"),
        newInput = document.createElement("input"),
        emptySpace = document.createElement("p"),
        domParser = new DOMParser(),
        entityID, Location, X509,
        Attributes = [];
    
    emptySpace.style.width = "20px";
    newdiv.innerHTML = "Upload Metadata";
    newdiv.className = "link-button";
    newInput.type = "file";
    newInput.style.display = "none";

    newInput.onchange = e => {
        var metadata = e.target.files[0],
            reader = new FileReader();
        reader.readAsText(metadata, "UTF-8");

        reader.onload = e => {
            var content = e.target.result,
            parsedMeta = domParser.parseFromString(content,"text/xml")
            SSOinput = document.getElementById("input102"),
            Audience = document.getElementById("input140");
            
            entityID = parsedMeta.getElementsByTagName("md:EntityDescriptor")[0].getAttribute("entityID");
            Location = parsedMeta.getElementsByTagName("md:AssertionConsumerService")[0].getAttribute("Location");

            SSOinput.value = Location;
            Audience.value = entityID;

            console.log("Location: " + Location); console.log("entityID: " + entityID);
        }

        console.log(reader.result);
    }

    newdiv.addEventListener("click",() => {
        newInput.click();
    });

    nextButton.addEventListener("click",()=>{
        toolbar.appendChild(emptySpace);
        toolbar.appendChild(newdiv);
        toolbar.appendChild(newInput);
        console.log("it loaded the new button");
    })

}

var checker = setInterval(() => {
    if(document.readyState === "complete"){
        console.log("the button has loaded");
        clearInterval(checker);
        createMyButton();
        
    }
    else{console.log("not yet");}
 }, 1000);