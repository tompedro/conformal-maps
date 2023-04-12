let dx = 1, dy1=1, dy2=1;

function fun(x,y) {return math.pow(math.complex(x,y),2)}

function draw() {
    let canvas = document.getElementById("canvas");
    if (null==canvas || !canvas.getContext) return;

    let axes={}, ctx=canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
    axes.scale = parseInt(document.getElementById("range").value);                 // 40 pixels from x=0 to x=1
    axes.doNegativeX = true;

    dy1 = parseFloat(document.getElementById("precise").value)
    dy2 = dy1

    showAxes(ctx,axes);
    funGraph(ctx,axes,(x,y) => fun(x,y).re,(x,y) => fun(x,y).im,"rgb(11,153,11)","rgb(0,0,255)",0.5); 
}

function funGraph (ctx,axes,funcX,funcY,color1,color2,thick) {
    let xx, yy, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    let iMax = Math.round((ctx.canvas.width-x0)/dx);
    let iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;


    for(let j=iMin;j<=iMax;j += dy1){
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.lineWidth = thick;
        ctx.strokeStyle = color1;
        for (let i=iMin;i<=iMax;i++) {
            xx = scale*funcX(dx*i/scale, j); 
            yy = scale*funcY(dx*i/scale, j);
            ctx.arc(x0+xx,y0-yy,0.5, 2 * Math.PI, false);
        }
        ctx.stroke();
    }
    

    for(let j=iMin;j<=iMax;j += dy2){
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.lineWidth = thick;
        ctx.strokeStyle = color2;
    
        for (let i=iMin;i<=iMax;i++) {
            xx = scale*funcX(j, dx*i/scale); 
            yy = scale*funcY(j, dx*i/scale);
            ctx.arc(x0+xx,y0-yy,0.5, 2 * Math.PI, false);
        }
        ctx.stroke();
    }
}

function showAxes(ctx,axes) {
    const x0=axes.x0, w=ctx.canvas.width;
    const y0=axes.y0, h=ctx.canvas.height;
    const scale = axes.scale
    let correction = 1
    const xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)"; 
    ctx.lineWidth = 1;
    ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
    ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis

    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.2;

    if(scale > 100){
        correction = scale/40;
    }

    for(let i = h/2; i >= 0; i -= scale/correction){
        const label = (Math.round((i-h/2)/scale * 100)/100).toString()
        ctx.moveTo(xmin,i); ctx.lineTo(w,i);
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(label, w/2+5, i);
    }

    for(let i = h/2; i <= h; i += scale/correction){
        const label = (Math.round((i-h/2)/scale * 100)/100).toString()
        ctx.moveTo(xmin,i); ctx.lineTo(w,i);
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(label, w/2+5, i);
    }

    for(let i = w/2; i >= 0; i -= scale/correction){
        const label = (Math.round((i-w/2)/scale * 100)/100).toString()
        ctx.moveTo(i,0); ctx.lineTo(i,h);
        if(label != '0'){
            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(label, i, h/2+13);
        } 
    }

    for(let i = w/2; i <= w; i += scale/correction){
        const label = (Math.round((i-w/2)/scale * 100)/100).toString()
        ctx.moveTo(i,0); ctx.lineTo(i,h);
        if(label != '0'){
            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(label, i, h/2+13);
        } 
    }

    ctx.stroke();
}