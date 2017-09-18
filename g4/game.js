// the game itself
var game;
// the spinning wheel
var wheel; 
// can the wheel spin?
var canSpin;
// slices (prizes) placed in the wheel
var slices = 8;
// prize names, starting from 12 o'clock going clockwise

var slicePrizes = ["50", "0", "10", "25", "0", "10", "30", "25"];
// the prize you are about to win
var prize;
// text field where to show the prize
var prizeText;

var blaster;
var win;
var fail;
var coins;

var showPoint;
var point = 0;
var cnt = 0;
var showRound ;

var game2;

var sprite;

window.onload = function() {	
     // creation of a 458x488 game
	game = new Phaser.Game( 458, 520, Phaser.AUTO, "","",true);

     // adding "PlayGame" state
     game.state.add("PlayGame",playGame);
     // launching "PlayGame" state
     game.state.start("PlayGame");

}

// PLAYGAME STATE
	
var playGame = function(game){

};

function start() {

    // blaster.fadeOut(3000);
    // blaster.play();

}

playGame.prototype = {
     // function to be executed once the state preloads
     preload: function(){
          // preloading graphic assets
          game.load.image("wheel", "img/wheel3.png");
		  game.load.image("pin", "img/pin2.png");
          game.load.audio('blaster', "5sec.mp3");
         game.load.audio('sf_win', "sf_win2.mp3");
         game.load.audio('sf_fail', "fail.mp3");

         // blaster = game.add.audio('blaster');
         game.load.image("background", "spin.png");

         // http://www.9tana.com/wp-content/uploads/2012/03/LineCard.jpg




     },
     // funtion to be executed when the state is created

    update:function () {
        // console.log(wheel);
    },
  	create: function(){
          // giving some color to background
          // game.stage.backgroundColor = "#ffffff";

        // blaster.addMarker('xxx', 4, 2.7);

        blaster = game.add.audio('blaster');
        win = game.add.audio('sf_win');
        fail = game.add.audio('sf_fail');


        // blaster.allowMultiple = false;
        // blaster.addMarker('charm', 0, 2.7);

        // blaster = game.add.audio('blaster');



        // background = game.add.tileSprite(0, 0, 1000, 600, "background");

       // blaster.play();

        // game.stage.setBackgroundColor('#ffffff');

          // adding the wheel in the middle of the canvas
        // coins = game.add.group();
  		    wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
          // setting wheel registration point in its center



          wheel.anchor.set(0.5);
        // coins.anchor.set(0.5);

        // Phaser.Point.setTo(2, 2);


          // adding the pin in the middle of the canvas
          var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
          // setting pin registration point in its center
          pin.anchor.set(0.5);
            pin.angle = 180;

          // adding the text field
          prizeText = game.add.text(game.world.centerX, 210, "");
          // setting text field registration point in its center
          prizeText.anchor.set(0.5);
            prizeText.fontSize = 60;
            prizeText.fontWeight = 'bold';
            prizeText.font = 'Kanit';
       //   prizeText.stage.fillStyle = 'red';

        prizeText.stroke = '#FFF';
        prizeText.strokeThickness = 6;
        prizeText.fill = '#ff0500';

          // aligning the text to center
          prizeText.align = "center";



        showPoint = game.add.text(game.world.centerX, 450, "");
        showPoint.anchor.set(0.5);
        showPoint.fontSize = 50;
        showPoint.fontWeight = 'bold';
        showPoint.font = 'Kanit';
        showPoint.stroke = '#FFF';
        showPoint.strokeThickness = 6;
        showPoint.fill = '#2bb2ff';
        showPoint.align = "center";


        showRound = game.add.text(game.world.centerX, 30, "");
        showRound.anchor.set(0.5);
        showRound.fontSize = 20;
        showRound.fontWeight = 'bold';
        showRound.font = 'Kanit';
        showRound.stroke = '#FFF';
        showRound.strokeThickness = 5;
        showRound.fill = '#63ff00';
        showRound.align = "center";

          // the game has just started = we can spin the wheel
          canSpin = true;
          // waiting for your input, then calling "spin" function
         game.input.onDown.add(this.spin, this);
      
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.spin, this);
        game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.spin, this);
        // this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



        //  Being mp3 files these take time to decode, so we can't play them instantly
        //  Using setDecodedCallback we can be notified when they're ALL ready for use.
        //  The audio files could decode in ANY order, we can never be sure which it'll be.

        //







	},
     // function to spin the wheel
     spin(){
         // blaster.onDecoded.add(start, this);

          // can we spin the wheel?
          if(canSpin){  
               // resetting text field
              win.stop();

             blaster.onDecoded.add(start, this);
              blaster.play();

               prizeText.text = "";
               if(cnt ==1 ){
                   showPoint.text = "";
                   point = 0;
                   cnt = 1;




                 //  showRound.text = '';
               }else{
                   cnt += 1;

               }
               console.log(cnt);
             // showRound.text = 'ครั้งที่ '+cnt;
             //  sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'pin');
             //
             //  sprite.anchor.setTo(0.5, 0.5);
             //
             //
             //  game.add.tween(sprite).to( {
             //      alpha: 1
             //  }, 1000, Phaser.Easing.Linear.None, true, 0);
          
               // the wheel will spin round from 2 to 4 times. This is just coreography
               var rounds = game.rnd.between(2, 3);
              var rounds = 10;
              // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
               var degrees = game.rnd.between(0, 360);
               // console.log(degrees);
               // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
               prize = slices - 1 - Math.floor(degrees / (360 / slices));
               // now the wheel cannot spin because it's already spinning
             // console.log(prize);
               canSpin = false;
               // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
               // the quadratic easing will simulate friction
               // var spinTween = game.add.tween(wheel).to({
               //      angle: 360 * rounds + degrees
               // }, 5000, Phaser.Easing.Quadratic.Out, true);
               // once the tween is completed, call winPrize function
              var spinTween = game.add.tween(wheel).to({
                  angle: 360 * rounds + degrees
              }, 5000, Phaser.Easing.Quadratic.Out, true);
              
              (spinTween.onComplete.add(this.winPrize, this));


          }
     },
     // function to assign the prize
     winPrize(){
          // now we can spin the wheel again

          canSpin = true;
          // writing the prize you just won
          prizeText.text = slicePrizes[prize] + ' คะแนน';

          // blaster.mute();
         blaster.stop();

        if (slicePrizes[prize] == '0'){
            // blaster.start();

            fail.play('',0,1,false);

        }else{
            win.play('',0,1,false);
        }
        if(slicePrizes[prize] == 'x2'){

            point = point * 2;
        }else{
            point = point + parseInt(slicePrizes[prize]);
        }



        showPoint.text = 'รวม ' + (point) + ' คะแนน';
         // if(cnt == 2){
         //     alert(point);
         // }

         // win.play();
        // win.play('',0,1,false);


         // game.sound.mute = true;
         // blaster.stop();
         // blaster.mute();

        // alert(prizeText.text );

     }
}