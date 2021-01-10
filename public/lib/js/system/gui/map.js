"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class Map extends GUI {
	
	/*
	 ** Title: Constructor
	 ** Description: Builds the Map.
	 */
	constructor(scene, emitter, mapWidth, mapHeight, draggable) {
		super(scene, emitter); // Import existing properties.
		
		// Map Data
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.tileSize = 75;
		this.tileBorder = 0;
		this.spacing = this.tileSize + this.tileBorder;
		this.draggable = draggable;
		
		this.renMap(); // Initial Render
	}
	
	/*
	 ** Title: Render the map.
	 ** Description: Renders and updates the map.
	 */
	renMap() {

		// Construct a new tile for each width count.
		let alphabet = ['A',' B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    	for (let x = 0; x <= this.mapWidth - 1; x++) {
    		
    		// Count a new tile for each height count.
    		for (let y = 0; y <= this.mapHeight-1; y++) {
    			let hexX = x * this.spacing - (x*(this.spacing/3.58));
    			let hexY = y * (this.spacing - this.spacing/5);
    			
    			// Even tile columns, offset them down word.
    			if (x % 2 === 1) {
    				hexY+= (this.spacing / 2) - (this.spacing/10);
    			}
    			
    			// Set the ID.
    			let xID = Number(x / alphabet.length).toFixed() + alphabet[x % alphabet.length];
    			let yID = y;
    			
    			 // Create and add the tile to the map.
    			this.addTile(hexX, hexY, xID + yID);
    		}
    	}
	}
	
	/*
	 ** Title: Add Tile.
	 ** Description: Creates and appends a tile to the GUI container.
	 */
	addTile(hexX, hexY, id) {
		
			// Create a hex shape and add it to the container to render.
			let tile = new HexTile(this.scene, this.emitter, id);
			tile.setCords(hexX, hexY);

			// Set tile as draggable.
			let map = this;
			tile.onClick(function(e) {
				let mouseClick = e.event.which; // 1, 2 or 3 for a mouse click.
				
	    		// On left click, enter movement mode for a unit.
	    		if (mouseClick === 1 && this.scene.data.list['mode'] === 'View') {
	    			
	    			// Check if unit exists. If it does, enter movement mode. Otherwise, do nothing.
	    			if ( tile.units.infantry.length > 0 ) {
	    				if ( tile.units.infantry[0].faction === this.scene.data.list['activeFaction'] ) {
		    				this.emitter.emit('moveMode'); // Change the mode to move.
		    				this.scene.data.list['selectedHex'] = tile; // Set the selected tile.
	    				}
	    			}
	    		}
	    		
	    		// On left click while in movement mode, move the unit where it needs to go.
	    		else if (mouseClick === 1 && this.scene.data.list['mode'] === 'Move') {
	    			
	    			// Move unit to the new hex if a unit does not exist there.
	    			if ( tile.units.infantry.length == 0 ) {
	    				let old_tile = this.scene.data.list['selectedHex'];
	    				old_tile.transferUnit( old_tile.units.infantry[0], tile );
	    				this.emitter.emit('mode');
	    				this.scene.data.list['selectedHex'] = false;
	    			}
	    		}

	    		// On right click, add or remove units.
	    		else if (mouseClick === 3 && this.scene.data.list['mode'] === 'Add') {
	    			
	    			// If the box doesn't have a unit, add it, otherwise remove it.
	    			if ( tile.units.infantry.length == 0) {
	    				let newUnit =  new Infantry( this.scene.data.list['activeFaction'] );
	    				tile.addUnit(newUnit);
	    			}
	    			else {
	    				if ( this.scene.data.list['activeFaction'] === tile.faction) {
	    					tile.removeUnit( tile.units.infantry[0] );	
	    				}
	    			}
	    		}
			});
			
			//Enable Tile Dragging.
			if (this.draggable) {
				tile.onDragStart(function(pointer) {
					map.container.setData("x_start", map.x);
					map.container.setData("y_start", map.y);
				});
				tile.onDrag(function(pointer, dragX, dragY) {
					let mapX = map.container.getData("x_start") + dragX;
					let mapY = map.container.getData("y_start") + dragY;
					map.setCords(mapX, mapY);
				});
			}
			
			// Add tile to the map.
			this.addChild(tile);
	}
	
	// Update All Hex Tiles.
	updateMap() {
		for (let idx = 0; idx < this.innerGUI.length; idx++) {
			let childGUI = this.innerGUI[idx]; // Retrieve the child GUI.
			if ( childGUI instanceof HexTile ) {
				childGUI.swapGUIDisplay();
			}
		}
	}
}