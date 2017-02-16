var h = document.getElementById("hue");
var s = document.getElementById("saturation");
var l = document.getElementById("luminance");
var brush = document.getElementById("brush");
var color = document.getElementById("selected-color");
var ctx = color.getContext("2d");
var board = document.getElementById("drawing-board");
var boardCtx = board.getContext("2d");
var paintMode = false;
var brushSize = brush.value;


board.addEventListener("mousedown", function(e){
    paintMode = true;
});

board.addEventListener("mouseup", function(e){
    paintMode = false;
})

board.addEventListener('mousemove', function(e){
    paint(e);
})

function paint(e){
    console.log('mouseover');
    if(paintMode){
        var coords = getMousePos(board, e);
        console.log('Mouse position: ' + coords.x + ',' + coords.y);
        boardCtx.fillStyle = HSLColor.toString();
        boardCtx.fillRect(coords.x, coords.y, brushSize, brushSize);
    }
}

board.addEventListener("mouseup", function(e){
    board.removeEventListener("mouseover", paint);
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function updateColor(){
  ctx.fillStyle = HSLColor.toString();
  ctx.fillRect(0, 0, document.body.clientWidth, 50);
  console.log(document.body.clientWidth);
}

function updateSaturationGradient(){
    var style = document.createElement("style");
    document.head.appendChild(style);
    sheet = style.sheet
    sheet.addRule('#saturation::-webkit-slider-runnable-track',`background: linear-gradient(to right, ${HSLColor.toStringMaxSat()}, ${HSLColor.toStringMinSat()});`);
}

function updateLuminanceGradient(){
    var style = document.createElement("style");
    document.head.appendChild(style);
    sheet = style.sheet
    sheet.addRule('#luminance::-webkit-slider-runnable-track',`background: linear-gradient(to right, ${HSLColor.toStringMinLum()}, ${HSLColor.toStringMaxLum()});`);
}


var HSLColor = {
  hue: h.value,
  saturation: s.value,
  luminance: l.value,
  toString: function(){
    return `hsl(${this.hue},${this.saturation}%,${this.luminance}%)`
  },
  toStringMaxSat: function(){
     return `hsl(${this.hue},0%,${this.luminance}%)`
  },
  toStringMinSat: function(){
    return `hsl(${this.hue},100%,${this.luminance}%)`
  },
  toStringMaxLum: function(){
    return `hsl(${this.hue},${this.saturation}%,100%)`
  },
  toStringMinLum: function(){
    return `hsl(${this.hue},${this.saturation}%,0%)`
  }
}

updateSaturationGradient();
updateLuminanceGradient();

h.addEventListener('mouseup', function(e){
  console.log(e.currentTarget.value);
  HSLColor.hue = e.currentTarget.value;
  console.log(HSLColor.toString());
  updateColor();
  updateSaturationGradient();
  updateLuminanceGradient();
})

s.addEventListener('mouseup', function(e){
  console.log(e.currentTarget.value + '%');
  HSLColor.saturation = e.currentTarget.value;
  console.log(HSLColor.toString());
  updateColor();
  updateSaturationGradient();
  updateLuminanceGradient();
})

l.addEventListener('mouseup', function(e){
  console.log(e.currentTarget.value + '%');
  HSLColor.luminance = e.currentTarget.value;
  console.log(HSLColor.toString());
  updateColor();
  updateSaturationGradient();
  updateLuminanceGradient();
});

brush.addEventListener('mouseup', function(e){
    brushSize = brush.value;
})

function respondCanvas(){
      color.setAttribute('height', 60);
      color.setAttribute('width', document.body.clientWidth); //max width
      board.setAttribute('width', document.body.clientWidth);
      board.setAttribute('height', document.body.clientHeight);
      //Call a function to redraw other content (texts, images etc)
      updateColor();
      updateSaturationGradient();
      updateLuminanceGradient();
  }

respondCanvas();

window.onresize = function(e){
    respondCanvas();
}
