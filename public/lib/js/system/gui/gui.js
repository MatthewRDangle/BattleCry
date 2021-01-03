"use strict"; // Execute JavaScript file in strict mode.

/*
 ** Title: ???.
 ** Description: ???.
 */
class GUI {
	
	constructor(scene, emitter) {
		// Add options parameter? How?
		
	   	// Scene Data
    	this.scene = scene;
    	this.emitter = emitter;
    	
    	// GEO Data
    	this.x = 0;
    	this.y = 0;
    	this.z = 0;
    	
    	// Interactive Data
    	this.interactive = false;
    	
    	// Render Data
    	this.parent = undefined;
    	this.container = this.scene.add.container(this.x, this.y);
    	this.innerGUI = [];
    	
    	// Size Data
    	this.width = 0;
    	this.height = 0;
    	this.padding = { left: 0, top: 0, right: 0, bottom: 0 };
    	this.scale = 1;
    	
    	// Text Content Data
    	this.textPoly = undefined;
    	this.textString = undefined;
    	this.textColor = '#FFFFFF';
    	this.textSize = '16px';
    	this.textFamily = 'Arial';
    	this.textHAlign = 'left'; // left, center, right;
    	this.textVAlign = 'top'; // top, middle, bottom.
    	this.textAlpha = 1;
    	
    	// Background Data
    	this.backgroundPoly = undefined;
    	this.backgroundColor = undefined;
    	this.backgroundImage = undefined;
    	this.backgroundShape = 'rectangle';
    	this.backgroundHAlign = 'left'; // left, center, right;
    	this.backgroundVAlign = 'top'; // top, middle, bottom.
    	this.backgroundBorderColor = undefined;
    	this.backgroundBorderSize = undefined;
    	this.backgroundAlpha = 1;
    	
    	// Event Handlers.
    	this.event = {
    			onclick: undefined,
    			ondragstart: undefined,
    			ondrag: undefined,
    			update: []
    	}
	}
	
	/*
	 ** Title: Add Child.
	 ** Description: Add a GUI child to this GUI. This will automatically add it to the container.
	 *
	 * @param gui - GUI - required - The GUI to attach as a child to this GUI.
	 */
	addChild(child_gui) {
		child_gui.parent = this;
		this.innerGUI.push(child_gui);
		this.container.add(child_gui.container);
	}
	
	/*
	 ** Title: Remove Child.
	 ** Description: Remove a GUI child from this GUI. This will automatically remove it to the container.
	 *
	 * @param gui - GUI - required - The inner GUI to remove.
	 */
	removeChild(child_gui) {
		let index = this.innerGUI.indexOf(child_gui);
		this.innerGUI.splice(index, 1);
		child_gui.destroy();
	}
	
	/*
	 ** Title: Destroy.
	 ** Description: Destroys the instance of this object.
	 */
	destroy() {
		if (this.textPoly)
			this.textPoly.destroy();
		if (this.backgroundPoly)
			this.backgroundPoly.destroy();
		if (this.container)
			this.container.destroy();
	}
	
	
	
	/*
	 ** Title: Ren Background
	 ** Description: Render the background polygon or update it if it already exists. 
	 */
	renBackground() {
		
		// Set the shape to build the compare.
		let shape = this.backgroundShape;
		
		// If the shape changes, redraw the polygon.
		if (this.backgroundPoly && this.backgroundPoly.type) {
			if (this.backgroundPoly.type.toLowerCase() != shape) {
				this.backgroundPoly.destroy();
				this.backgroundPoly = undefined;
			}
		}
		
		// If the BackgroundAlign attributes are set, figure how the x and y cords and origins.
		let x = 0; // Default x cord and origin for text. textHAlign = left.
		let xorg = 0;
		let y = 0; // Default y cord and origin for text. textVAlign = top.
		let yorg = 0;
		if (this.backgroundHAlign === 'center') {
			x = this.width / 2;
			xorg = 0.5;
		}
		else if (this.backgroundHAlign === 'right') {
			x = this.width;
			xorg = 1;
		}
		if (this.backgroundVAlign === 'middle') {
			y = this.height / 2;
			yorg = 0.5;
		}
		else if (this.backgroundVAlign === 'bottom') {
			y = this.height;
			yorg = 1;
		}
		
		// Render the polygon based on shape.
		if (!this.backgroundPoly) {
			if (shape === 'rectangle')
				this.backgroundPoly = this.scene.add.rectangle(x, y, this.width, this.height, this.backgroundColor, this.backgroundAlpha);
			else if (shape === 'star')
				this.backgroundPoly = this.scene.add.star(x, y,  5, this.width / 3.5, this.height / 1.5, this.backgroundColor, this.backgroundAlpha);
			else if (shape === 'image')
				this.backgroundPoly = this.scene.add.image(x, y, this.backgroundImage, this.backgroundAlpha);
			else if (shape === 'polygon') {
				this.backgroundPoly = this.scene.add.polygon(x, y, [
					this.width * 0.25, y,
					this.width * 0.75, y,
					this.width, y + this.height / 2,
					this.width * 0.75, y + this.height,
					this.width * 0.25, y + this.height,
					0, y + this.height / 2,
//	        		0, y, 
//	        		this.width * 0.25, y - this.height / 2, 
//	        		this.width * 0.75, y - this.height / 2, 
//	        		this.width, y,  
//	        		this.width * 0.75, y + this.height / 2,
//	        		this.width * 0.25, y + this.height / 2
				], this.backgroundColor, this.backgroundAlpha);
			}
			
			// Attach it to the container.
			this.container.addAt(this.backgroundPoly, 0);
		}
		else {
			
			// Update Size.
			this.backgroundPoly.displayWidth = this.width; // TODO This will not change the width after it's been created.
			this.backgroundPoly.displayHeight = this.height;  // TODO This will not change the width after it's been created.
			
			// Set GEO.
			this.backgroundPoly.x = x;
			this.backgroundPoly.y = y;
			
			// If the setFillStyle is unable to be set, don't set it.
			if (this.backgroundPoly.setFillStyle)
				this.backgroundPoly.setFillStyle(this.backgroundColor, this.backgroundAlpha);
		}
		
		// Update origin.
		this.backgroundPoly.setOrigin(xorg, yorg);
		
		// Set Stroke
		if (this.backgroundBorderSize > 0) {
	    	this.backgroundPoly.isStroked = true;
	    	this.backgroundPoly.lineWidth = this.backgroundBorderSize;
	    	this.backgroundPoly.strokeColor = this.backgroundBorderColor;	
		}
		else
			this.backgroundPoly.isStroked = false;

		// Attach onclick events.
		this.backgroundPoly.off('pointerdown');
		if (this.event.onclick) {
			this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
			
			// Enable Click Events.
			this.backgroundPoly.on('pointerdown', this.event.onclick, this);
		}
		
		// Attach ondrag events.
		this.backgroundPoly.off('dragstart');
		this.backgroundPoly.off('drag');
		if (this.event.ondrag) {
			this.backgroundPoly.setInteractive({ cursor: 'pointer' }); // Allow it to be interactive.
			this.scene.input.setDraggable(this.backgroundPoly); // Enable dragging.
			if (this.event.ondragstart) // If drag start exists, set it.
				this.backgroundPoly.on('dragstart', this.event.ondragstart);
			this.backgroundPoly.on('drag', this.event.ondrag); // Set the on drag function.
		}
	}
	
	/*
	 ** Title: Ren Container
	 ** Description: Updates the container properties. 
	 */
	renContainer() {
		this.container.x = this.x;
		this.container.y = this.y;
		this.container.depth = this.z;
		this.container.setScale(this.scale);
	}
	
	/*
	 ** Title: Ren Text
	 ** Description: Render the text string or update the text string. 
	 */
	renText() {
		
		// If textpoly does not exist, create it. Otherwise update it.
		if (!this.textPoly) {
			this.textPoly = this.scene.add.text(0, 0,  this.textString, { font: this.textSize + ' ' + this.textFamily, fill: this.textColor } );
			this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
			this.textPoly.setWordWrapWidth(this.width, true);
			
			// If the background exists, insert at index 1. Otherwise use index 0.
			if (this.backgroundPoly)
				this.container.addAt(this.textPoly, 1);
			else
				this.container.addAt(this.textPoly, 0);
		}
		else {
			this.textPoly.setText(this.textString);
			this.textPoly.setFill(this.textColor);
			this.textPoly.setFontSize(this.textSize);
			this.textPoly.setFontFamily(this.textFamily);
			this.textPoly.setPadding( this.padding.left, this.padding.top, this.padding.right, this.padding.bottom );
			this.textPoly.setWordWrapWidth(this.width, true);
		}
		
		// Set the Alpha value.
		this.textPoly.setAlpha(this.textAlpha);
		
		// If the textAlign attributes are set, figure how the x and y cords.
		let x = 0; // Default x cord and origin for text. textHAlign = left.
		let xorg = 0;
		let y = 0; // Default y cord and origin for text. textVAlign = top.
		let yorg = 0;
		if (this.textHAlign === 'center') {
			x = this.width / 2;
			xorg = 0.5;
		}
		else if (this.textHAlign === 'right') {
			x = this.width;
			xorg = 1;
		}
		if (this.textVAlign === 'middle') {
			y = this.height / 2;
			yorg = 0.5;
		}
		else if (this.textVAlign === 'bottom') {
			y = this.height;
			yorg = 1;
		}
		
		// Update cords and origin.
		this.textPoly.setOrigin(xorg, yorg);
		this.textPoly.x = x;
		this.textPoly.y = y;
	}
	
	
	
	/*
	 ** Title: Set Background Color
	 ** Description: Sets the background color.
	 */
	setBackgroundColor(hexColor) {
		this.backgroundColor = hexColor;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background Color
	 ** Description: Sets the background image..
	 */
	setBackgroundImage(ref) {
		this.backgroundImage = ref;
		this.backgroundShape = 'image';
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background Shape.
	 ** Description: Sets the background shape.
	 */
	setBackgroundShape(shape) {
		this.backgroundShape = shape;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background Align
	 ** Description: Aligns the background on in it's container.
	 */
	setBackgroundAlign(h, v) {
		this.backgroundHAlign = h;
		this.backgroundVAlign = v;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background H Align
	 ** Description: Aligns the background H on in it's container.
	 */
	setBackgroundHAlign(h) {
		this.backgroundHAlign = h;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background V Align
	 ** Description: Aligns the background V on in it's container.
	 */
	setBackgroundVAlign(v) {
		this.backgroundvAlign = v;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Background Alpha
	 ** Description: Sets the background alpha transparency value. 0 <= value >= 1.
	 */
	setBackgroundAlpha(value) {
		this.backgroundAlpha = value;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Border
	 ** Description: Set the border color and size.
	 */
	setBackgroundBorder(size, color) {
		this.backgroundBorderSize = size;
		this.backgroundBorderColor = color;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Border Size
	 ** Description: Sets the border color hex value.
	 */
	setBackgroundBorderSize(value) {
		this.backgroundBorderSize = value;
		this.updateBackground();
	}
	
	/*
	 ** Title: Set Border Color
	 ** Description: Sets the border color hex value.
	 */
	setBackgroundBorderColor(value) {
		this.backgroundBorderColor = value;
		this.updateBackground();
	}
	
	/*
	 * Title: Update Text
	 ** Executes all functions to update the background.
	 */
	updateBackground() {
		// Execute the render background function.
		this.renBackground();
		
		// Execute all functions attached to this update function.
		for (let idx = 0; idx < this.event.update; idx++) {
			let update = this.event.update[idx];
			if (update.updateBackground)
				this.update.func();
		}
	}
	
	
	
	/*
	 ** Title: Set Text String
	 ** Description: Sets the text string 
	 */
	setTextString(text) {
		this.textString = text; // Write text to GUI.
		
		// If textPoly doesn't exist, create it.
		if (!this.textPoly)
			this.renText();
		else if (this.textPoly)
			this.updateText();
	}
	
	/*
	 ** Title: Set Text Color
	 ** Description: Sets the text string.
	 */
	setTextColor(hexColor) {
		this.textColor = hexColor;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextSize(size) {
		this.textSize = size;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setTextFamily(fontFamily) {
		this.textFamily = fontFamily;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text Align
	 ** Description: Aligns the text on in it's container.
	 */
	setTextAlign(h, v) {
		this.textHAlign = h;
		this.textVAlign = v;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text H Align
	 ** Description: Aligns the text H on in it's container.
	 */
	setTextHAlign(h) {
		this.textHAlign = h;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text V Align
	 ** Description: Aligns the text Y on in it's container.
	 */
	setTextVAlign(v) {
		this.textVAlign = v;
		this.updateText();
	}
	
	/*
	 ** Title: Set Text Alpha
	 ** Description: Sets the background alpha transparency value. 0 <= value >= 1.
	 */
	setTextAlpha(value) {
		this.textAlpha = value;
		this.updateText();
	}
	
	/*
	 * Title: Update Text
	 ** Executes all functions to update the text.
	 */
	updateText() {
		// Execute the render text function.
		if (this.textPoly)
			this.renText();
		
		// Execute all functions attached to this update function.
		for (let idx = 0; idx < this.event.update; idx++) {
			let update = this.event.update[idx];
			if (update.updateText)
				this.update.func();
		}
	}
	
	
	
	/*
	 ** Title: Set Coordinates
	 ** Description: Sets the geo coordinates of the GUI.
	 *
	 ** @param x - number - required - the x cord value.
	 ** @param y - number - required - the y cord value.
	 ** @param z - number - optional - the z cord value.
	 */
	setCords(x, y, z) {
		
		// Set the cords to the object.
		this.x = x;
		this.y = y;
		if (z)
			this.z = z;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Depth
	 ** Description: Sets the geo Z coordinate of the GUI.
	 *
	 ** @param z - number - required - the z cord value.
	 */
	setDepth(z) {
		
		// Set the cords to the object.
		this.z = z;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Dimensions
	 ** Description: Sets the width and height draw dimensions for this GUI.
	 *
	 ** @param width - number - required - width of the GUI.
	 ** @param height - number - required - height of the GUI.
	 */
	setDimensions(width, height) {
		
		// Set the dimensions to the object.
		this.width = width;
		this.height = height;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Scale
	 ** Description: Sets the scale for this GUI.
	 *
	 ** @param scale - number - required - scale of the GUI.
	 */
	setScale(scale) {
		
		// Set the dimensions to the object.
		this.scale = scale;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Width
	 ** Description: Sets the width draw dimensions for this GUI.
	 *
	 ** @param width - number - required - width of the GUI.
	 */
	setWidth(width) {
		
		// Set the dimensions to the object.
		this.width = width;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Height
	 ** Description: Sets the height draw dimensions for this GUI.
	 *
	 ** @param height - number - required - height of the GUI.
	 */
	setHeight(height) {
		
		// Set the dimensions to the object.
		this.height = height;
		
		this.updateGUI(); // Update the GUI polygons.
	}
	
	/*
	 ** Title: Set Text Padding
	 ** Description: Sets all the padding values. at once.
	 */
	setPadding(left, top, right, bottom) {
		
		// If the right and bottom don't exist, assume they are equal to the left and top properties.
		if (!right && !bottom) {
			right = left;
			bottom = top;
		}

		// Apply padding and render.
		this.padding.left = left;
		this.padding.top = top;
		this.padding.right = right;
		this.padding.bottom = bottom;
		this.updateGUI();
	}
	
	/*
	 ** Title: Set Text Padding Left
	 ** Description: Sets just the padding left.
	 */
	setPaddingLeft(left) {
		this.padding.left = left;
		this.updateGUI();
	}
	
	/*
	 ** Title: Set Text Padding top
	 ** Description: Sets just the padding top.
	 */
	setPaddingTop(top) {
		this.padding.top = top;
		this.updateGUI();
	}
	
	
	/*
	 ** Title: Set Text Padding right
	 ** Description: Sets just the padding right.
	 */
	setPaddingRight(right) {
		this.padding.right = right;
		this.updateGUI();
	}
	
	
	/*
	 ** Title: Set Text Size
	 ** Description: Sets the text string.
	 */
	setPaddingBottom(bottom) {
		this.padding.bottom = bottom;
		this.updateGUI();
	}
	
	
	
	/*
	 ** Title: On Click
	 ** Description: On click event for this GUI.
	 */
	onClick(callback) {
		this.event.onclick = callback;

		if (callback)
			this.interactive = true;
		else
			this.interactive = false;
		
		this.updateGUI();
	}
	
	/*
	 ** Title: On Drag Start
	 ** Description: Attach Start Draggble Function.
	 */
	onDragStart(callback) {
		this.event.ondragstart = callback;

		if (callback)
			this.interactive = true;
		else
			this.interactive = false;
		
		this.updateGUI();
	}
	
	/*
	 ** Title: On Drag
	 ** Description: Attach Draggble Function.
	 */
	onDrag(callback) {
		this.event.ondrag = callback;
		
		if (callback)
			this.interactive = true;
		else
			this.interactive = false;
		
		this.updateGUI();
	}
	
	
	
	/*
	 * Title: Update Text
	 ** Executes all functions to update the text.
	 */
	updateContainer() {
		// Execute the render text function.
		this.renContainer();
		
		// Execute all functions attached to this update function.
		for (let idx = 0; idx < this.event.update; idx++) {
			let update = this.event.update[idx];
			if (update.updateContainer)
				this.update.func();
		}
	}
	
	
	
	/*
	 ** Title: Update GUI
	 ** Description: Will render or update the entire GUI.
	 */
	updateGUI() {
		this.updateContainer();
		this.updateBackground();
		this.updateText();
	}
	
	/*
	 ** Title: addToUpdateQ.
	 ** Description: Adds a function to the update Q.
	 */
	addToUpdateQ(func, text, bck, cont) {
		this.event.update.push({
			func: func,
			updateText: text,
			updateBackground: bck,
			updateContainer: cont
		})
	}
}