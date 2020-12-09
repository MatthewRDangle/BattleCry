"use strict"; // Execute JavaScript file in strict mode.

class WarSim extends Phaser.Scene {
	
    constructor() {
        super('WarSim');
    }
    
    preload() {
    	
    	// Load start button.
    	this.load.image('GermanFlag', 'lib/assets/GermanFlag.png');
    	this.load.image('USAFlag', 'lib/assets/USAFlag.png');
    	this.load.image('FinishTurn', 'lib/assets/FinishTurn.png');
    	this.load.image('EndGame', 'lib/assets/EndGame.png');
    }
    
    create() {
    	
    	// Create Base Object Handlers.
    	let emitter = new Phaser.Events.EventEmitter();
    	
    	// Create the game board to be rendered.
    	let gameboard = new Map(this, emitter, 24, 18, 5, 5);
    	
    	
    	// Build the top bar.
    	let topbar = new GUI(this, emitter);
    	topbar.setDimensions(window.innerWidth, 40);
    	topbar.setDepth(2);
    	topbar.setInteractive(true);
    	topbar.setTextString('World War');
    	topbar.setPadding(15, 10, 0, 0);
    	topbar.setBackgroundColor(0x151A1E);
//    	let topBar = this.add.container(0,0);
//    	topBar.depth = 2;
//		let tb_bck = this.add.rectangle(0, 0, window.innerWidth, 40, 0x151A1E);
//    	tb_bck.setInteractive();
//		tb_bck.setOrigin(0, 0);
//		topBar.add(tb_bck);
//		let ww = this.add.text(10, 10, 'World War', { font: '16px Arial', fill: '#FFFFFF'} );
//		topBar.add(ww);
		
		// Builds the stats bar. 0x151A1E
		let rightBar = this.add.container(window.innerWidth - 570, 40);
		rightBar.depth = 2;
		let rb_bck = this.add.rectangle(0, 0, 570, window.innerHeight, 0x151A1E);
		rb_bck.setInteractive();
		rb_bck.setOrigin(0, 0);
		rightBar.add(rb_bck);

		let scenrio_bck = this.add.rectangle(5, 0, 560, 20, 0x404040);
		scenrio_bck.setOrigin(0,0);
		rightBar.add(scenrio_bck);
		let scenrio = this.add.text(220, 0, 'Operation Overlord', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(scenrio);
		let scenrio_descr = this.add.text(120, 50, 'Capture the Airfields and hold them for one turn.', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(scenrio_descr);
		
		let vsHeader_bck = this.add.rectangle(5, 170, 560, 20, 0x404040);
		vsHeader_bck.setOrigin(0,0);
		rightBar.add(vsHeader_bck);
		let vsHeader = this.add.text(260, 170, 'Armies', { font: '16px Arial', fill: '#FFFFFF'} );
		rightBar.add(vsHeader);
		
		let germanStar = this.add.star(70, 257, 5, 5, 10, 0xFFFFFF);
		germanStar.setOrigin(0, 0);
		rightBar.add(germanStar);
		
		let germanFlag = this.add.image(100, 230, 'GermanFlag');
		germanFlag.setOrigin(0, 0);
		rightBar.add(germanFlag);
		
		let usaStar = this.add.star(320, 257, 5, 5, 10, 0xFFFFFF, 0.25);
		usaStar.setOrigin(0, 0);
		rightBar.add(usaStar);
		
		let usaFlag = this.add.image(350, 230, 'USAFlag');
		usaFlag.setOrigin(0, 0);
		rightBar.add(usaFlag);
		
		let bar = this.add.rectangle(75, 350, 430, 30, 0x3C5442);
		bar.setOrigin(0, 0);
		rightBar.add(bar);
		
		let finishTurn = this.add.image(210, 400, 'FinishTurn');
		finishTurn.setOrigin(0, 0);
		rightBar.add(finishTurn);
		
		// Add barrier to the left of the screen.
		let leftBar = this.add.container(0, 40);
		leftBar.depth = 2;
		let lb_bck = this.add.rectangle(0, 0, 20, window.innerHeight - 40, 0x151A1E);
		lb_bck.setInteractive();
		lb_bck.setOrigin(0, 0);
		leftBar.add(lb_bck);
		
		// build bottom bar for exiting the game.
		let bottomBar = this.add.container(0, window.innerHeight - 100);
		bottomBar.depth = 2;
		let bb_bck = this.add.rectangle(0, 0, window.innerWidth, 100, 0x151A1E);
		bb_bck.setInteractive();
		bb_bck.setOrigin(0, 0);
		bottomBar.add(bb_bck);
		
		let EndGame = this.add.image(5, 5, 'EndGame');
		EndGame.setOrigin(0, 0);
		bottomBar.add(EndGame);
    }
}