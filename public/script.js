(function (window, document, undefined) {
    // code that should be taken care of right away
    window.addEventListener("load", () => {reqNum("myNumRefresh")});
  
    window.onload = init;
  
    function init() {
      // the code to be called when the dom has loaded
      // #document has its nodes
  
      const button = document.getElementById("myBtn");
      button.addEventListener("click", () => {reqNum("myNum")});
      const buttonRefresh = document.getElementById("myBtnRefresh");
      buttonRefresh.addEventListener('click', () => {window.location.reload()});
    }
  })(window, document, undefined);
  
  function reqNum(elementToWriteID) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = () => {
      document.getElementById(elementToWriteID).innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "randomNum", true);
    xhttp.send();
  }
  