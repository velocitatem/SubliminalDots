// can be changed from console
var glob = {
  "count"    : 20,
  "radius"   : 2,
  "duration" : 500,
  "split"    : true
}

function start() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d')
  var xcon = canvas.width,
      ycon = canvas.height;
  var props = getCounts(glob.count);
  var pn = props[0]/glob.count;
  while(pn <= 0.4 || pn >= 0.6) {
    props = getCounts(glob.count);
    pn = props[0]/glob.count;
  }
  for(var i = 0; i < props[0] ; i+=1) {
    var pos = getRandomPosition(xcon, ycon, "left");
    drawDot(ctx, pos, "red")
  }
  for(var i = 0; i < props[1] ; i+=1) {
    var pos = getRandomPosition(xcon, ycon, "right");
    drawDot(ctx, pos, "blue")
  }
  setTimeout(()=> {
    console.debug("clearing canvas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
        var res = prompt("Which color had more? [r/b]")
        res = res.trim();
        var truthVec = pn > 0.5 ? [1,0] : [0,1];
        var inputVec = [res=="r"?1:0, res=="b"?1:0];
        console.log(truthVec, inputVec);
        if(evalVectors(truthVec, inputVec)) {
          alert("Correct");
        }
        else {
          alert("Incorrect");
        }
    }, 800)
  }, glob.duration);
}


function evalVectors(va, vb) {
  if(va[0] == vb[0]) {
    return true;
  }
  else {
    return false;
  }
}

function drawDot(ctx, pos, color) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, glob.radius, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill();
}

function getRandomPosition(xc, yc, side) {
  var x,y;

  if(glob.split) {
    if (side == "left") {
        x = Math.random() * xc/2;
        y = Math.random() * yc;
    }
    else {
        x = (xc/2) + (Math.random() * xc/2);
        y = Math.random() * yc;
    }
  }
  else {
    x = Math.random() * xc;
    y = Math.random() * yc;
  }


  return {
    "x": x,
    "y": y
  }
}

function getCounts(size) {
  var seed = Math.random();
  var pa = parseInt(size*seed);
  var pb = size-pa;
  return [pa, pb]
}
