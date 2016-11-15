window.onload = function(){

    //Global Vars
    var firstTime = true;

    var WIDTH = 600;
    var HEIGHT = (WIDTH/12)*9;
    var canvas;
    var ctx;

    canvas = document.createElement('canvas');
    var container = document.getElementById("mcnt");
    container.appendChild(canvas);
            
    ctx = canvas.getContext('2d');
                
    //Styling
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
            
    canvas.style.width = '43.923865300146414%';
            
    canvas.style.borderRadius = "7px";

    ctx.fillStyle = "#2D7891";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#222";
    ctx.fillRect(150, 150, 300, 150);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 40pt Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Start", (WIDTH/2), (HEIGHT/1.9))
    ctx.textAlign = "left";

    ctx.fillStyle = "#272727";
    ctx.lineWidth = 10;
    ctx.strokeRect(150, 150, 300, 150);

     function require(a,b){var c;c=b===!0?".js":"";var d=document.createElement("script");d.src=a+c,d.type="text/javascript",document.head.appendChild(d)}
    //https://code.jquery.com/jquery-3.1.0.min
    require("https://code.jquery.com/jquery-3.1.0.min", true);

    function vert(){   
        $("#thing").hide();
        $("#menu").hide();
        $("#logo_img").hide();
        $("br").hide();
        $("span").hide();

        document.body.style.backgroundColor = "#000";
        document.body.style.margin = "0px";

        var c = document.getElementsByTagName("canvas")[0];
        c.style.borderRadius = "0px";
        c.style.margin = "auto";
        c.style.position = "absolute";
        c.style.left = "0%";
        c.style.right = "0%";
        c.style.bottom = "0%";
        c.style.top = "0%";
        c.style.height = "";
        c.style.width = "63.93362591508053%"; 
    }

    function revert(){
        $("#thing").fadeIn();
        $("#menu").fadeIn();
        $("#logo_img").fadeIn();
        $("br").fadeIn();
        $("span").fadeIn();

        document.body.style.backgroundColor = "#FFF";
        var c = document.getElementsByTagName("canvas")[0];
        c.style.borderRadius = "7px";
        c.style.margin = "";
        c.style.position = "";
        c.style.left = "";
        c.style.right = "";
        c.style.top = "";
        c.style.bottom = "";
        c.style.height = '58.59375%';
        c.style.width = '43.923865300146414%';
    }
    var full_screen = false;
    window.addEventListener('keyup', function(evt){
        if(evt.keyCode == 69){ //keyCode 69 = E
            if(full_screen){
                revert();
                full_screen = false;
            } else {
                vert();
                full_screen = true;
            }
        }
    })

    function ready(){
        firstTime = false;

        //Music
        var bg_music = new Audio();
        bg_music.src = 'Sounds_of_Madrid.wav';
        bg_music.autoplay = true;
        bg_music.loop = true;

        function start_music(){
            bg_music.play();
        }

        function stop_music(){
             bg_music.pause();
        }

        var start_music_dom = document.getElementById('start_music');
        var stop_music_dom = document.getElementById('stop_music');

        start_music_dom.addEventListener('click', start_music);
        stop_music_dom.addEventListener('click', stop_music);
        

        //Global Vars
        ctx;
        var keystate;
        var LEFT = 37;
        var RIGHT = 39;
        var SPACE = 32;
        var canvas_bg = "#3A6E85";
        var color_test = true;
        
        //Statistics
        var score;
        var level;
        var hearts;
        var speed;
        
        //Images
        var heart_img = new Image();
        heart_img.src = "heart.png";
        
        var bolt_img = new Image();
        bolt_img.src = "bolt.png";
        
        var bomb_img = new Image();
        bomb_img.src = "bomb.png";
        
        var apple_img = new Image();
        apple_img.src = "apple.gif";
        
        //Objs
        var bas = {
            x: null,
            y: null,
            width: 90,
            height: 30,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    		    this.x = Math.max(Math.min(this.x, WIDTH-this.width-9), 9);
            },
            
            draw: function(){
                ctx.fillStyle = 'black';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.y = -100;
            }
        };
        
        var bas2 = {
            x: null,
            y: null,
            width: 108,
            height: 30,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    		    this.x = Math.max(Math.min(this.x, WIDTH-this.width), 0);
            },
            
            draw: function(){
                ctx.fillStyle = '#AD691B';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.y = -100;
            }
        };
        
        var player = {
            x: null,
            y: null,
            width: 108,
            height: 64,
            speed: 3,
            color: "#AD691B",
            
            vannish: function(){
                this.x = -1000000000000;
                this.y = -1000000000000;
            },
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width), 0);
                
                speed = player.speed;
                
                if(keystate[SPACE] && color_test === false){
                    location.reload();
                };
            },
            
            draw: function(){
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.y = -100;
            }
        };
        
        //Sides
        var vert1 = {
            x: null,
            y: null,
            width: 1,
            height: 64,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width-107.9), 0);
            },
            
            draw: function(){
                ctx.fillStyle = "#AD691B";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
               this.x = -1000000000000;
               this.y = -1000000000000;
            }
        };
        
        var vert2 = {
            x: null,
            y: null,
            width: 1,
            height: 64,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width), 107.9);
            },
            
            draw: function(){
                ctx.fillStyle = "#AD691B";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.y = -100;
            }
        };
        
        var hor1 = {
            x: null,
            y: null,
            width: 9,
            height: player.height,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width-99), 0);
            },
            
            draw: function(){
                ctx.fillStyle = "#AD691B";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.x = -1000000000000;
                this.y = -1000000000000;
            }
        };
        
        var hor2 = {
            x: null,
            y: null,
            width: 9,
            height: player.height,
            speed: 3,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width), 99);
            },
            
            draw: function(){
                ctx.fillStyle = "#AD691B";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.x = -1000000000000;
                this.y = -1000000000000;
            }
        };
        
        var col_mark = {
            x: null,
            y: null,
            width: 52,
            height: 10.5,
            speed: 3,
            bool: true,
            
            update: function(){
                if(keystate[LEFT]){this.x -= this.speed};
                if(keystate[RIGHT]){this.x += this.speed};
                
                this.y = Math.max(Math.min(this.y, HEIGHT-this.height), (0)-this.height);
    			this.x = Math.max(Math.min(this.x, WIDTH-this.width-4), 4);
            },
            
            draw: function(){
                ctx.fillStyle = "black";
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            
            vannish: function(){
                this.bool = false;
                this.x = -1000000000000;
                this.y = -1000000000000;
            }
        };
        
        //Items
        var apple = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 1.5,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var apple2 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 2,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var apple3 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 2.5,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var apple4 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 3,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var apple5 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 3.5,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var apple6 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 4,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -50;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(apple_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var bolt = {
            x: null,
            y: null,
            side: 48,
            r: Math.random(),
            speed: 4.13,
            timer: 8,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -10000;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
                
            },
            
            draw: function(){
                ctx.drawImage(bolt_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var bomb = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 1.8,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -800;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(bomb_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var bomb2 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 2.8,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -800;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(bomb_img, this.x, this.y, this.side, this.side);
            }
        };
        var bomb3 = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 3.8,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -800;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(bomb_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var heart = {
            x: null,
            y: null,
            side: 32,
            r: Math.random(),
            speed: 2.75,
            
            update: function(){
                this.r = Math.random();
                this.y += this.speed;
                
                if(this.y > HEIGHT){
                    this.y = -6000;
                    this.x = (Math.random()*WIDTH)
                    if(this.x > WIDTH-32){this.x -= 32}
                    else
                    if(this.x < 32){this.x += 32};
                    this.r = Math.random();
                };
            },
            
            draw: function(){
                ctx.drawImage(heart_img, this.x, this.y, this.side, this.side);
            }
        };
        
        var level_Control = {
            timer: 500,
            max_timer: 500,
            
            update: function(){
                if(col_mark.bool){
                
                    this.timer--;

                    if(this.timer < 0){
                        level++;
                        this.max_timer += 100;
                        this.timer = this.max_timer;

                        //Make obj's faster
                        apple.speed += 0.25;
                        apple2.speed += 0.25;
                        apple3.speed += 0.25;
                        apple4.speed += 0.25;
                        apple5.speed += 0.25;
                        apple6.speed += 0.25;

                        bomb.speed += 0.25;
                        bomb2.speed += 0.25;
                        bomb3.speed += 0.25;

                    };
                };
            }
        };
        
        //Collision
        var con = {
            update: function(){ //Check Collisions
    				var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh){
    					return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
    				};
                
                if(col_mark.bool){
                

    				if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple.x, apple.y, apple.side, apple.side)){
                        apple.y = -50;
                        apple.x = (Math.random()*WIDTH)
                        if(apple.x > WIDTH-32){apple.x -= 32}
                        else
                        if(apple.x < 32){apple.x += 32};
                        apple.r = Math.random();
    					score += 7;
    				};
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple2.x, apple2.y, apple2.side, apple2.side)){
                        apple2.y = -50;
                        apple2.x = (Math.random()*WIDTH)
                        if(apple2.x > WIDTH-32){apple2.x -= 32}
                        else
                        if(apple2.x < 32){apple2.x += 32};
                        apple2.r = Math.random();
    					score += 7;
    				};
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple3.x, apple3.y, apple3.side, apple3.side)){
                        apple3.y = -50;
                        apple3.x = (Math.random()*WIDTH)
                        if(apple3.x > WIDTH-32){apple3.x -= 32}
                        else
                        if(apple3.x < 32){apple3.x += 32};
                        apple3.r = Math.random();
    					score += 7;
    				};
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple4.x, apple4.y, apple4.side, apple4.side)){
                        apple4.y = -50;
                        apple4.x = (Math.random()*WIDTH)
                        if(apple4.x > WIDTH-32){apple4.x -= 32}
                        else
                        if(apple4.x < 32){apple4.x += 32};
                        apple4.r = Math.random();
    					score += 7;
    				};
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple5.x, apple5.y, apple5.side, apple5.side)){
                        apple5.y = -50;
                        apple5.x = (Math.random()*WIDTH)
                        if(apple5.x > WIDTH-32){apple5.x -= 32}
                        else
                        if(apple5.x < 32){apple5.x += 32};
                        apple5.r = Math.random();
    					score += 7;
    				};
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, apple6.x, apple6.y, apple6.side, apple6.side)){
                        apple6.y = -50;
                        apple6.x = (Math.random()*WIDTH)
                        if(apple6.x > WIDTH-32){apple6.x -= 32}
                        else
                        if(apple6.x < 32){apple6.x += 32};
                        apple6.r = Math.random();
    					score += 7;
    				};
                
                    if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, bomb.x, bomb.y, bomb.side, bomb.side)){
                        bomb.y = -1000;
                        bomb.x = (Math.random()*WIDTH)
                        if(bomb.x > WIDTH-32){bomb.x -= 32}
                        else
                        if(bomb.x < 32){bomb.x += 32};
                        bomb.r = Math.random();
    					hearts -= 1;
                        if(hearts < 1){
                            lose();
                        };
    				};
                if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, bomb2.x, bomb2.y, bomb2.side, bomb2.side)){
                        bomb2.y = -1000;
                        bomb2.x = (Math.random()*WIDTH)
                        if(bomb2.x > WIDTH-32){bomb2.x -= 32}
                        else
                        if(bomb2.x < 32){bomb2.x += 32};
                        bomb2.r = Math.random();
    					hearts -= 1;
                        if(hearts < 1){
                            lose();
                        };
    				};
                if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, bomb3.x, bomb3.y, bomb3.side, bomb3.side)){
                        bomb3.y = -1000;
                        bomb3.x = (Math.random()*WIDTH)
                        if(bomb3.x > WIDTH-32){bomb3.x -= 32}
                        else
                        if(bomb3.x < 32){bomb3.x += 32};
                        bomb3.r = Math.random();
    					hearts -= 1;
                        if(hearts < 1){
                            lose();
                        };
    				};
                
                if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, heart.x, heart.y, heart.side, heart.side)){
                        heart.y = -10000;
                        heart.x = (Math.random()*WIDTH)
                        if(heart.x > WIDTH-32){heart.x -= 32}
                        else
                        if(heart.x < 32){heart.x += 32};
                        heart.r = Math.random();
    					hearts += 1;
    				};
                if(AABBIntersect(col_mark.x, col_mark.y, col_mark.width, col_mark.height, bolt.x, bolt.y, bolt.side, bolt.side)){
                        bolt.y = -10000;
                        bolt.x = (Math.random()*WIDTH)
                        if(bolt.x > WIDTH-32){bolt.x -= 32}
                        else
                        if(bolt.x < 32){bolt.x += 32};
                        bolt.r = Math.random();
                        score += 100;
                    
                        player.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        bas.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        bas2.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        col_mark.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        vert1.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        vert2.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        hor1.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
                        hor2.speed += Math.round(0.25*10000000000000000000000000000)/10000000000000000000000000000;
    				};
                };
            }
        };
        
        //Text Objs
        var heartWrite = {
            x: null,
            y: null,
            
            vannish: function(){
                this.x = -10990;
                this.y = 3489473;
            },
            
            draw: function(){
                ctx.fillStyle = 'black';
    		    ctx.font = "13.93px Arial";
    			ctx.fillText('Lives: ' + hearts, 10, 15);
                
                if(color_test === false){
                    this.vannish();
                };
            }
        };
        
        var scoreWrite = {
            x: null,
            y: null,
            
            draw: function(){
                if(color_test){
                
                    ctx.fillStyle = 'black';
                    ctx.font = "13.93px Arial";
                    ctx.fillText('Level: ' + level, 80, 15);
                
                };
                
                if(color_test === false){
                    ctx.fillStyle = '#D44F33';
    		        ctx.font = "13.93px Arial";
    			    ctx.fillText('Your score was: ' + score, (WIDTH/2)-80, (HEIGHT/2)+58);
                }
            }
        };
        
        var levelWrite = {
            x: null,
            y: null,
            
            draw: function(){
                if(color_test){
                    
                    ctx.fillStyle = 'black';
                    ctx.font = "13.93px Arial";
                    ctx.fillText('Score: ' + score, 250, 15);
                    
                };
                
                if(color_test === false){  
                    ctx.fillStyle = '#D44F33';
    		        ctx.font = "13.93px Arial";
    			    ctx.fillText('Your highest level was: ' + level, (WIDTH/2)-80, (HEIGHT/2)+84);
                };
            }
        };
        
        var speedWrite = {
            x: null,
            y: null,
            
            draw: function(){
                if(color_test){
                    
                    ctx.fillStyle = 'black';
                    ctx.font = "13.93px Arial";
                    ctx.fillText('Speed: ' + speed, 160, 15);
                    
                };
                
                if(color_test === false){
                    ctx.fillStyle = '#D44F33';
    		        ctx.font = "13.93px Arial";
    			    ctx.fillText('Your speed was: ' + speed, (WIDTH/2)-80, (HEIGHT/2)+30);
                };
            }
        };
        
        var youLose = {
            x: null,
            y: null,
            
            draw: function(){
                ctx.fillStyle = '#0088ff';
    		    ctx.font = "36px Arial";
    			ctx.fillText('You Lose', (WIDTH/2)-80, (HEIGHT/2)-58);
            }
        };
        
        var restartKeyWrite = {
            x: null,
            y: null,
            
            draw: function(){
                ctx.fillStyle = '#4776B1';
    		    ctx.font = "14px Arial";
    			ctx.fillText('Press Spacebar to restart', (WIDTH/2)-80, (HEIGHT/2)-36);
            }
        };
        
        var stats = {
            x: null,
            y: null,
            
            draw: function(){
                ctx.fillStyle = '#D44F33';
    		    ctx.font = "14px Arial";
                ctx.fillText('Stats:', (WIDTH/2)-80, (HEIGHT/2)+10);
            }
        };
        
        //Functions
        var lose = function(){
            color_test = false;
            
            player.vannish();
            bas.vannish();
            bas2.vannish();
            hor1.vannish();
            hor2.vannish();
            vert1.vannish();
            vert2.vannish();
            col_mark.vannish();
        };
        
        var main = function(){
            
            //Set Stats
            score = 0;
            hearts = 3;
            level = 1;

            window.addEventListener("keydown", function(e) {
                // space and arrow keys
                if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                     e.preventDefault();
                }
            }, false);
            
            keystate = {};
            
            window.addEventListener("keydown", function(evt){
                keystate[evt.keyCode] = true;
            });
            window.addEventListener("keyup", function(evt){
                delete keystate[evt.keyCode];
            });
            
            init();
            
            var loop = function(){
                update();
                draw();
                
                window.requestAnimationFrame(loop, canvas);
            };
            
            window.requestAnimationFrame(loop, canvas);
        };
        
        var init = function(){
            
            //Basket
            player.x = (WIDTH/2)-(player.width/2);
            player.y = HEIGHT-player.height;
            
            bas.x = (WIDTH/2)-(bas.width/2);
            bas.y = HEIGHT-(player.height-5);
            
            bas2.x = (WIDTH/2)-(bas2.width/2);
            bas2.y = HEIGHT-(player.height-35);
            
            //sides
            vert1.x = (WIDTH/2)-(player.width/2);
            vert1.y = HEIGHT-player.height;
            
            vert2.x = ((WIDTH/2)+(player.width/2));
            vert2.y = HEIGHT-player.height;
            
            hor1.x = (WIDTH/2)-(player.width/2);
            hor1.y = HEIGHT-player.height;
            
            hor2.x = ((WIDTH/2)+(player.width/2))-hor2.width;
            hor2.y = HEIGHT-player.height;
            
            col_mark.x = (WIDTH/2)-(col_mark.width/2);
            col_mark.y = HEIGHT-(player.height-49);
            
            //Apples
            apple.y = -200;
            apple.x = (Math.random()*WIDTH);
            if(apple.x > WIDTH-32){apple.x -= 32}
            else
            if(apple.x < 32){apple.x += 32};
            apple.r = Math.random();
            
            apple2.y = -200;
            apple2.x = (Math.random()*WIDTH);
            if(apple2.x > WIDTH-32){apple2.x -= 32}
            else
            if(apple2.x < 32){apple2.x += 32};
            apple2.r = Math.random();
            
            apple5.y = -200;
            apple5.x = (Math.random()*WIDTH);
            if(apple5.x > WIDTH-32){apple5.x -= 32}
            else
            if(apple5.x < 32){apple5.x += 32};
            apple5.r = Math.random();
            
            apple3.y = -200;
            apple3.x = (Math.random()*WIDTH);
            if(apple3.x > WIDTH-32){apple3.x -= 32}
            else
            if(apple3.x < 32){apple3.x += 32};
            apple3.r = Math.random();
            
            apple4.y = -200;
            apple4.x = (Math.random()*WIDTH);
            if(apple4.x > WIDTH-32){apple4.x -= 32}
            else
            if(apple4.x < 32){apple4.x += 32};
            apple4.r = Math.random();
            
            apple6.y = -200;
            apple6.x = (Math.random()*WIDTH);
            if(apple6.x > WIDTH-32){apple6.x -= 32}
            else
            if(apple6.x < 32){apple6.x += 32};
            apple6.r = Math.random();

            
            //Bombs
            bomb.y = -800;
            bomb.x = (Math.random()*WIDTH);
            if(bomb.x > WIDTH-32){bomb.x -= 32}
            else
            if(bomb.x < 32){bomb.x += 32};
            bomb.r = Math.random();
            
            bomb2.y = -800;
            bomb2.x = (Math.random()*WIDTH);
            if(bomb2.x > WIDTH-32){bomb2.x -= 32}
            else
            if(bomb2.x < 32){bomb2.x += 32};
            bomb2.r = Math.random();
            
            bomb3.y = -800;
            bomb3.x = (Math.random()*WIDTH);
            if(bomb3.x > WIDTH-32){bomb3.x -= 32}
            else
            if(bomb3.x < 32){bomb3.x += 32};
            bomb3.r = Math.random();
            
            
            //Heart
            heart.y = -10000;
            heart.x = (Math.random()*WIDTH);
            if(heart.x > WIDTH-32){heart.x -= 32}
            else
            if(heart.x < 32){heart.x += 32};
            heart.r = Math.random();
            
            //bolt
            bolt.y = -15000;
            bolt.x = (Math.random()*WIDTH);
            if(bolt.x > WIDTH-32){bolt.x -= 32}
            else
            if(bolt.x < 32){bolt.x += 32};
            bolt.r = Math.random();
        };
        
        var update = function(){
            player.update();
            bas.update();
            
            con.update();
            
            //sides
            vert1.update();
            vert2.update();
            hor1.update();
            hor2.update();
            
            col_mark.update();
            
            apple.update();
            apple2.update();
            apple3.update();
            apple4.update();
            apple5.update();
            apple6.update();
            
            bomb.update();
            bomb2.update()
            bomb3.update();
            
            heart.update();
            
            bolt.update();
            
            bas2.update();
            
            level_Control.update();
        };
        
        var draw = function(){
            ctx.fillStyle = canvas_bg;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            
            ctx.save();
            
            col_mark.draw();
            player.draw();
            bas.draw();
            
            //sides
            vert1.draw();
            vert2.draw();
            
            apple.draw();
            apple2.draw();
            apple3.draw();
            apple4.draw();
            apple5.draw();
            apple6.draw();
            
            bomb.draw();
            bomb2.draw();
            bomb3.draw();
            
            heart.draw();
            
            bolt.draw();
            
            hor1.draw();
            hor2.draw();
            
            bas2.draw();
            
            ctx.fillStyle = '#B3C1AF';
            ctx.fillRect(0, 0, WIDTH, 32);
            
            scoreWrite.draw();
            heartWrite.draw();
            levelWrite.draw();
            speedWrite.draw();
            
            if(color_test === false){
                ctx.fillStyle = "#333";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);
                
                youLose.draw();
                restartKeyWrite.draw();
                stats.draw();
                speedWrite.draw();
                levelWrite.draw();
                scoreWrite.draw();
            };
            
            ctx.restore();
        };
        
        main();
    };

    canvas.addEventListener('click', function(){
        if(firstTime){
            ready();
        }
    });
}

var load = function(){

    var colors = ["#55bbaa", "#99aacc", "#00ccff", "#1fcc3e", "#24809e", "#3f9e51", "#49c6e5", "#2Ceaa3", "#7cfef0", "#a9ddd6"];
    var rc = colors[Math.round(Math.random()*(colors.length-1))];

    var WIDTH = 268;
    var HEIGHT = 698;
    var canvas;
    var ctx;

    var r = 18.3684211;
    var pi = Math.PI;

    var main = function(){
        canvas = document.getElementById('thing');
        ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        draw();
    }

    var draw = function(){

        //Row 1 => 7
        for(var i = 0; i < 7; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), r, r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 2 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*3), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 3 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*5), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 4 => 4
        for(var i = 0; i < 4; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*7), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 5 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*9), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 6 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*11), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 7 => 2
        for(var i = 0; i < 2; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*13), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 8 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*15), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 9 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*17), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }


        //Row 10 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*19), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 11 => 4
        for(var i = 0; i < 4; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*21), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 12 => 7
        for(var i = 0; i < 7; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*23), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 13 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*25), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 14 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*27), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 15 => 6
        for(var i = 0; i < 6; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*29), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 16 => 4
        for(var i = 0; i < 4; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*31), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 17 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*33), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 18 => 5
        for(var i = 0; i < 5; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*35), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }

        //Row 19 => 2
        for(var i = 0; i < 2; i++){
            ctx.beginPath();
            ctx.arc(WIDTH-r-(2*r*i), (r*37), r, 0, 2 * pi);
            ctx.fillStyle = rc;
            ctx.fill();
            rc = colors[Math.round(Math.random()*(colors.length-1))];
        }
    }

    main();
    
    $("#menu").hide().delay().fadeIn(200);
    $("#logo_img").hide().delay(250).fadeIn(200);
    $("#mcnt").hide().delay(500).fadeIn(200);
    $('#slogan').hide().delay(500).fadeIn(200);
    $("section").hide().delay(750).fadeIn(200);
}

$(document).ready(load);
