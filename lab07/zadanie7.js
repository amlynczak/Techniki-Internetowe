function sendRequest(event) {
    event.preventDefault();

    var myDiv = document.getElementById("wykres");
    var url = "../../cgi-bin/lab07/task/zadanie7.py";
    var info = document.getElementById('pory');
    var inputData = [];

    var selectedOption;
    var options = document.getElementsByName('wybor');
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedOption = options[i].value;
            break;
        }
    }
    console.log("Wybrana opcja:", selectedOption);

    fetch(url, {method: 'post', 
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'wybor=' + selectedOption})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.pory_roku.length; i++) {
                inputData[i] = data.pory_roku[i].ilosc;
            }
            chart(inputData);
        })
        .catch(error => console.log("Error", error));
}

function chart(data) {
    var canvas = document.getElementById("e");
    var ctx = canvas.getContext("2d");
    var canvasWidth = 500;
    var x_from = 40;
    var step = Math.round(canvasWidth / data.length) - 5;
    var colours = ['green', 'yellow', 'orange', 'blue'];
    var pory = ["Wiosna", "Lato", "Jesień", "Zima"];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < data.length; i++) {
        var x_next = x_from + (i * step) - 20;
        ctx.fillStyle = colours[i];
        ctx.fillRect(x_next, 150, 100, -data[i]);
        ctx.fillStyle = 'black';
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(pory[i]+": "+data[i], x_next, 170);
    }
}
