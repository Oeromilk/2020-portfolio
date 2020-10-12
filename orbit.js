

var isLightMode = false;

var canvas, width, height, ctx;

canvas = document.getElementById("space-time");

var darkColor = window.getComputedStyle(document.documentElement).getPropertyValue('--dark-color');
var lightColor = window.getComputedStyle(document.documentElement).getPropertyValue('--light-color');

var bodies = [];

var moveInFromRight = [
    {transform: 'translateX(0px)'},
    {transform: 'translateX(-432px)'}
]

var slideInFromRight = [
    {transform: 'scale(0)', transformOrigin: '200% 50%'},
    {transform: 'scale(1)'}
]

var slideUp = [
    {transform: 'translateY(100%)'}
]

var slideIn = [
    {transform: 'scale(0)', opacity: '0'},
    {transform: 'scale(1)', opacity: '1'}
]

var slideOut = [
    {transform: 'scale(1)', opacity: '1'},
    {transform: 'scale(0)', opacity: '0'}
]

var projectClose = document.getElementById("project-close");

var planetOneButton = document.getElementById("planet-one-text");
var planetOneInfo = document.getElementById("planet-one-info");
var closeOne = document.getElementById("close-one");

var imagesContainer = document.getElementById("images-container");

console.log(imagesContainer.children);

function animateImages(){
    for(i = 0; imagesContainer.children.length < i; i++){
        console.log(imagesContainer.children[i]);
        imagesContainer.children[i].animate(
            slideUp,
            {
                easing: "ease-in-out"
            }
        )
    }
}

document.getElementById("twitter").onclick = function(){
    location.href = "https://twitter.com/AgedMcNugget";
}
document.getElementById("github").onclick = function(){
    location.href = "https://github.com/Oeromilk";
}
document.getElementById("linkedin").onclick = function(){
    location.href = "https://www.linkedin.com/in/alexanderjmccomb/";
}
document.getElementById("youtube").onclick = function(){
    location.href = "https://www.youtube.com/watch?v=2WtiKh7HMak";
}

var nasaPhotoContainer = document.getElementById("nasa-photo-container");
var planetTwoButton = document.getElementById("planet-two-text");
var planetThreeButton = document.getElementById("planet-three-text");
var planetFourButton = document.getElementById("planet-four-text");
var planetOneInfo = document.getElementById("planet-one-info");
var closeOne = document.getElementById("close-one");
var lightDarkSwitch = document.getElementById("light-dark-switch");
var infoSwitch = document.getElementById("info-switch");
var projectContainer = document.getElementById("project-container");
var playButton = document.getElementById("play-button");
var creatorContainer = document.getElementById("creator-container")
var creatorClose = document.getElementById("creator-close");
var createPlanet = document.getElementById("create-planet-button");
var resetUniverse = document.getElementById("reset-universe");
var planetListContainer = document.getElementById("planet-list");
var playText = document.getElementById("play-text");
lightDarkSwitch.style.display = "none";
var lightSwitch = lightDarkSwitch.children[0];
var darkSwitch = lightDarkSwitch.children[1];
var lightInfo = infoSwitch.children[0];
var darkInfo = infoSwitch.children[1];
var lightProjectClose = projectClose.children[1];
var darkProjectClose = projectClose.children[0];
lightInfo.style.display = "none";
darkSwitch.style.display = "none";
darkInfo.style.display = "none";
lightProjectClose.style.display = "none";

function closeInfo(){
    projectContainer.animate(
        moveInFromRight,
        {
            duration: 250,
            easing: "ease-out",
            direction: "reverse",
            fill: "forwards"
        }
    )
}

planetOneButton.addEventListener("click", function(){
    closeInfo();
    planetOneInfo.style.display = "grid";
    planetOneInfo.animate(
        slideInFromRight,
        {
            duration: 500,
            easing: "ease-in",
            fill: "forwards"
        }
    )
    
})

closeOne.addEventListener("click", function(){
    planetOneInfo.animate(
        slideInFromRight,
        {
            duration: 500,
            easing: "ease-in",
            direction: "reverse",
            fill: "forwards"
        }
    )
})

playButton.addEventListener("click", function(){
    closeInfo();
    creatorContainer.animate(
        moveInFromRight,
        {
            duration: 500,
            easing: "ease-in",
            fill: "forwards"
        }
    )
});

creatorClose.addEventListener("click", function(){
    creatorContainer.animate(
        moveInFromRight,
        {
            duration: 250,
            easing: "ease-out",
            direction: "reverse",
            fill: "forwards"
        }
    )
});

createPlanet.addEventListener("click", function(event){
    event.preventDefault();

    let x = getRandomInt(width / 1.5);
    let y = getRandomInt(height / 1.5);
    let v = getRandomInt(1000);
    let a = Math.random();
    let m = getRandomInt(100);
    let r = getRandomInt(50);
    let c = getRandomColor();
    let t = ((getRandomInt(2) === 1) ? true : false);
    
    addBody(x, y, v, a, m, r, c, t);
});

resetUniverse.addEventListener("click", function(event){
    event.preventDefault();
    clearBodiesAndReset();
})

for(i = 0; i < projectClose.children.length; i++){
    projectClose.children[i].addEventListener("click", function(){
        closeInfo();
    })
}

for(i = 0; i < infoSwitch.children.length; i++){
    infoSwitch.addEventListener("click", function(){
        projectContainer.animate(
            moveInFromRight,
            {
                duration: 500,
                easing: "ease",
                fill: "forwards"
            }
        )
    })
}

for(i = 0; i < lightDarkSwitch.children.length; i++){
    lightDarkSwitch.children[i].addEventListener("click", function(){
        isLightMode = !isLightMode;
        if(isLightMode === true){
            lightInfo.style.display = "none";
            darkInfo.style.display = "block";
            lightSwitch.style.display = "none";
            darkSwitch.style.display = "block";
            lightProjectClose.style.display = "block";
            darkProjectClose.style.display = "none";
            document.body.style.backgroundColor = "#e0e0e0";
            canvas.style.backgroundColor = "#e0e0e0";
            projectContainer.style.backgroundColor = "#1a1a1c";
            playText.style.color = "#fff";
        } else {
            lightInfo.style.display = "block";
            darkInfo.style.display = "none";
            darkSwitch.style.display = "none";
            lightSwitch.style.display = "block";
            lightProjectClose.style.display = "none";
            darkProjectClose.style.display = "block";
            document.body.style.backgroundColor = "#1a1a1c";
            canvas.style.backgroundColor = "#1a1a1c";
            projectContainer.style.backgroundColor = "#e0e0e0";
            playText.style.color = "#1a1a1c";
        }
    })
}

var welcomeBanner = document.getElementById("welcome-banner");
welcomeBanner.style.height = window.innerHeight;

welcomeBanner.addEventListener("animationend", function(){
    init();
    lightDarkSwitch.style.display = "block";
    lightInfo.style.display = "block";
    welcomeBanner.style.display = "none";
});

setTimeout(animateWelcomeBanner, 2000);

function animateWelcomeBanner(){
    welcomeBanner.classList.add("fade-out");
}

function clearBodiesAndReset(){
    bodies = [];
    removeAllChildNodes(planetListContainer);
    init();
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

async function getNASAPhoto(){
    let response = await fetch("https://api.nasa.gov/planetary/apod?api_key=g3HcAW1d5aVYKVeXMNkNMvXzpRQWagkX55n6pp7S");
    let image = document.createElement("img");
    let data = await response.json();
    image.src = data.url;
    image.setAttribute("style", "object-fit: cover; width: 100%; height: 100%;")
    nasaPhotoContainer.append(image);
    return response;
}

function setNASAPhoto(){
    let image = document.createElement("img");
    image.src = getNASAPhoto();
    image.width = "100%";
    nasaPhotoContainer.append(image);
}

function addPlanetElement(body, i){
    let planetContainer = document.createElement("div");
    let pContainer = document.createElement("div");
    let xContainer = document.createElement("div");
    let yContainer = document.createElement("div");
    let vContainer = document.createElement("div");
    let aContainer = document.createElement("div");
    let mContainer = document.createElement("div");
    let rContainer = document.createElement("div");
    let cContainer = document.createElement("div");
    let tContainer = document.createElement("div");

    planetContainer.id = i;
    planetContainer.classList.add("planet-stats-body"); 

    pContainer.classList.add("p-stat");
    pContainer.innerHTML = "O";
    xContainer.classList.add("x-stat");
    xContainer.innerHTML = "X: " + `<span style="font-weight: 800;">${Math.round(body.x)}</span>`;
    yContainer.classList.add("y-stat");
    yContainer.innerHTML = "Y: " + `<span style="font-weight: 800;">${Math.round(body.y)}</span>`;
    vContainer.classList.add("v-stat");
    vContainer.innerHTML = "Velocity: " + `<span style="font-weight: 800;">${body.v}</span>`;
    aContainer.classList.add("a-stat");
    aContainer.innerHTML = "Angle: " + `<span style="font-weight: 800;">${Math.round(body.a * 100) / 100}</span>`;
    cContainer.classList.add("c-stat");
    cContainer.innerHTML = "Color: " + `<span style="font-weight: 800;">${body.c}</span>`;
    rContainer.classList.add("r-stat");
    rContainer.innerHTML = "Radius: " + `<span style="font-weight: 800;">${body.r}</span>`;
    mContainer.classList.add("m-stat");
    mContainer.innerHTML = "Mass: " + `<span style="font-weight: 800;">${body.m}</span>`;
    tContainer.classList.add("t-stat");
    tContainer.innerHTML = "Tail: " + `<span style="font-weight: 800;">${body.t}</span>`;

    planetContainer.append(pContainer);
    planetContainer.append(xContainer);
    planetContainer.append(yContainer);
    planetContainer.append(vContainer);
    planetContainer.append(aContainer);
    planetContainer.append(cContainer);
    planetContainer.append(rContainer);
    planetContainer.append(mContainer);
    planetContainer.append(tContainer);

    planetListContainer.append(planetContainer);
    planetListContainer.scrollTop = planetListContainer.scrollHeight - planetListContainer.clientHeight;
}

function init(){
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    getNASAPhoto();
    createBodies();

    for(i = 0; i < bodies.length; i++){
        addPlanetElement(bodies[i], i);
    }

    setInterval(function(){
        updateSystem();
        updateBodies(0.01);
        ctx.clearRect(0, 0, width, height);
        drawBodies();
        
    }, 10);
}

function addBody(x, y, v, a, m, r, c, t){
    bodies.push(new Body(x, y, v, a, m, r, c, t));
    let last = bodies.length;
    addPlanetElement(bodies[last - 1], last);
}

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor(){
    let randomValue = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomValue;
}

function createBodies(){
    bodies.push(new Body((this.width / 2), (this.height / 2) - 450, 200, 0, 5, 20, "#6517e3", true));
    bodies.push(new Body((this.width / 2), (this.height / 2) - 300, 250, 0, 2, 15, "#1798e3", true));
    bodies.push(new Body((this.width / 2), (this.height / 2) - 200, 300, 0, 1, 10, "#14c71d", true));
    bodies.push(new Body((this.width / 2), (this.height / 2) - 125, 400, 0, 1, 5, "#de2d16", true));
    bodies.push(new Body(this.width / 2, this.height / 2, 0, 0, 1000000, 30, "#FF8501", false)); //sun
}

function drawBodies(){
    for(var i = 0; i < bodies.length; i++){
        bodies[i].draw(ctx);
    }
}

function updateBodies(dt){
    for(var i = 0; i < bodies.length; i++){
        bodies[i].update(dt);
    }
}

function updateSystem(){
    var G = 10;
    for(var i = 0; i < bodies.length; i++){
        for(var j = 0; j < bodies.length; j++){
            if(i === j) continue;
            var b1 = bodies[i];
            var b2 = bodies[j];

            var dist = Math.sqrt((b1.x - b2.x) * (b1.x - b2.x) + (b1.y - b2.y) * (b1.y - b2.y));
            var force = G * (b1.m * b2.m) / dist / dist;
            var nx = (b2.x - b1.x) / dist;
            var ny = (b2.y - b1.y) / dist;

            b1.ax += nx * force / b1.m;
            b1.ay += ny * force / b1.m;

            b2.ax -= nx * force / b2.m;
            b2.ay -= ny * force / b2.m;
        }
    }
}

function Body(x, y, v, angle, mass, radius, color, hasTail){
    this.x = x;
    this.y = y;
    this.v = v;
    this.a = angle;
    this.r = radius;
    this.c = color;
    this.t = hasTail;
    this.vx = v * Math.cos(angle);
    this.vy = v * Math.sin(angle);
    this.m = mass;
    this.radius = radius;
    this.color = color;
    this.ax = 0;
    this.ay = 0;

    if(hasTail){
        this.tail = new Tail(50);
    }

    this.update = function(dt){
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.ax = 0;
        this.ay = 0;

        if(this.tail){
            this.tail.addPoint({x: this.x, y: this.y});
        }
    }

    this.draw = function(ctx){
        ctx.strokeStyle = ((isLightMode === false) ? "#e0e0e0" : "#1a1a1c");
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        if(this.tail){
            this.tail.draw(ctx);
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 6.28);
        ctx.fill();
    }
}

function Tail(maxLength){
    this.points = [];
    this.maxLength = maxLength;
    this.addPoint = point => {
        this.points = [point].concat(this.points).slice(0, this.maxLength);
    }
    this.draw = function(ctx){
        for(var i = 1; i < this.points.length; i++){
            ctx.beginPath();
            if(i < maxLength - 20){
                ctx.globalAlpha = (this.maxLength - i) / 20;
            }
            ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y);
            ctx.lineTo(this.points[i].x, this.points[i].y);
            ctx.stroke();
        }
        ctx.globalAplha = 1;
    }
}