
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import "pixi";
import "p2";
import * as Phaser from "phaser-ce";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private game:any;
  private platforms: any;
  private player: any;
  private cursors: any;
  private score = 0;
  private scoreText;
  private bombs;
  private stars: any;
  constructor(public navCtrl: NavController) {
    this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game0', {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      collectStar: this.collectStar.bind(this)
    });
  }

 preload() {

  // game.load.image('logo', 'images/phaser.png');
  this.game.load.image('sky', 'assets/images/sky.png');
  this.game.load.image('ground', 'assets/images/platform.png');
  this.game.load.image('star', 'assets/images/star.png');
  // game.load.image('bomb', 'images/bomb.png');
  this.game.load.spritesheet('dude', 'assets/images/dude.png', 32,48);

  }


  create() {

  // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
  // logo.anchor.setTo(0.5, 0.5);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.add.sprite(0, 0, 'sky');
  //game.add.sprite(0, 0, 'sky');
  this.platforms = this.game.add.group();
  this.platforms.enableBody = true;
  let ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);

  ground.body.immovable = true;

  let ledge = this.platforms.create(200,400, 'ground');


  ledge.body.immovable = true;

  ledge = this.platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  this.player = this.game.add.sprite(100, this.game.world.height - 150, 'dude');
  this.game.physics.arcade.enable(this.player);
  this.player.body.bounce.y = 0.3;
  this.player.body.gravity.y = 300;
  this.player.body.collideWorldBounds = true;
  this.player.animations.add('left', [0,1,2,3 ], 200, true);
  this.player.animations.add('right', [5,6,7,8], 200, true);



  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'black' });

  this.stars = this.game.add.group();

  this.stars.enableBody = true;


  for (var i = 0; i < 12; i++)
  {

 let star = this.stars.create(i * 70, 0, 'star');

  star.body.gravity.y = 7;
  star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }



  }


 update() {
  this.game.physics.arcade.collide(this.player, this.platforms);
  this.player.body.velocity.x = 0;

  if (this.cursors.left.isDown)
  {
  //  Move to the left
  this.player.body.velocity.x = -150;

  this.player.animations.play('left');
  }
  else if (this.cursors.right.isDown)
  {
  //  Move to the right
  this.player.body.velocity.x = 150;

  this.player.animations.play('right');
  }
  else
  {
  //  Stand still
  this.player.animations.stop();

  this.player.frame = 4;
  }

  //  Allow the this.player to jump if they are touching the ground.
  if (this.cursors.up.isDown && this.player.body.touching.down)
  {
  this.player.body.velocity.y = -350;
  }

  this.game.physics.arcade.collide(this.stars, this.platforms);
  this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

  }



  collectStar (player, star) {



  star.kill();


  this.score += 10;
  this.scoreText.text = 'Score: ' + this.score;


}


}
