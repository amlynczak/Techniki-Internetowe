const form = document.getElementById("form");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const perimeterResult = document.getElementById("obw");

function isRectangle(x1, y1, x2, y2, x3, y3, x4, y4){
    if(
        x1 >= 0 && x1 <= canvas.width && x2 >= 0 && x2 <= canvas.width &&
        x3 >= 0 && x3 <= canvas.width && x4 >= 0 && x4 <= canvas.width &&
        y1 >= 0 && y1 <= canvas.height && y2 >= 0 && y2 <= canvas.height &&
        y3 >= 0 && y3 <= canvas.height && y4 >= 0 && y4 <= canvas.height){
        //sprawdzam czy punkty sa w obrebie plotna

        const s1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const s2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
        const s3 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
        //sprawdzam czy jet prostokatem za pomoca twierdzenia pitagorasa
        if(Math.pow(s1, 2)+Math.pow(s2, 2) == Math.pow(s3, 2)){
            const s4 = Math.sqrt(Math.pow(x4 - x1, 2) + Math.pow(y4 - y1, 2));
            const s5 = Math.sqrt(Math.pow(x3 - x4, 2) + Math.pow(y3 - y4, 2));
            const s6 = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
            //sprawdzam czy jet prostokatem za pomoca twierdzenia pitagorasa (drugi trojkat)
            if(Math.pow(s4, 2)+Math.pow(s5, 2) == Math.pow(s6, 2)){
                return true;
            }
        }
    }
    return false;
}

function drawSVGQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4) {
    const polygon = document.getElementById("polygon");
    polygon.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);
    const x3 = parseFloat(document.getElementById("x3").value);
    const y3 = parseFloat(document.getElementById("y3").value);
    const x4 = parseFloat(document.getElementById("x4").value);
    const y4 = parseFloat(document.getElementById("y4").value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isRectangle(x1, y1, x2, y2, x3, y3, x4, y4)) {
        //rysuje za pomoca canvas
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        ctx.stroke();

        //liczenie obwodu
        const side1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const side2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
        const perimeter = 2*(side1 + side2);
        perimeterResult.textContent = perimeter.toFixed(2);

        //rysowanie za pomoca svg
        drawSVGQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4);

    } else {
        perimeterResult.textContent = "Podane punkty nie tworzą prostokąta lub znajduja się poza powierzchnią płótna";
        clearSVG();
    }
});