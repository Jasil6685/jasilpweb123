var data = [
  {
    AboutDevTypeText:
      "<span>About jasilpweb<br/><br/>jasilp web under construction.</span><br/><br/><br/><span>Are you a developer?<br/> Y / N</span><br/>"
  }
];

var allElements = document.getElementsByClassName("typing");
for (var j = 0; j < allElements.length; j++) {
  var currentElementId = allElements[j].id;
  var currentElementIdContent = data[0][currentElementId];
  var element = document.getElementById(currentElementId);
  var devTypeText = currentElementIdContent;

  // type code
  var i = 0,
    isTag,
    text;

  function type() {
    text = devTypeText.slice(0, ++i);
    if (text === devTypeText) {
      addInputListener(); // Add input event listener after typing is complete
      return;
    }
    element.innerHTML = text + `<span class='blinker'>&#32;</span>`;
    var char = text.slice(-1);
    if (char === "<") isTag = true;
    if (char === ">") isTag = false;
    if (isTag) return type();
    setTimeout(type, 60);
  }

  type(); // Start typing animation

  function addInputListener() {
    let input = "";
    let typing = true;

    document.addEventListener("keydown", function (event) {
      if (!typing) return;

      var key = event.key.toLowerCase();
      if (key === "y" || key === "n") {
        input += key;
        element.innerHTML += key;
      } else if (event.code === "Enter") {
        processInput(input);
        input = ""; // Reset input for the next interaction
        simulateEnter();
      }
    });

    // Handle clicking outside the input field on mobile
    document.addEventListener("click", function (event) {
      if (event.target !== element && typing) {
        input = ""; // Clear input if user clicks outside
      }
    });
  }

  function processInput(input) {
    typing = false; // Stop further typing
    if (input === "y") {
      reply(" You entered 'Y'");
    } else if (input === "n") {
      reply(" You entered 'N'");
    } else {
      reply(" Respond 'Y' or 'N'");
    }
  }

  function reply(message) {
    element.innerHTML += message;
  }

  function simulateEnter() {
    typing = false; // Stop further typing
    setTimeout(function () {
      var lineBreak = document.createElement('br');
      element.appendChild(lineBreak);
      type(); // Continue typing after the Enter key
    }, 500);
  }
}
