import { _decorator, Component, Node, Sprite, SpriteFrame, Button, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonClickController')
export class ButtonClickController extends Component {
    @property(SpriteFrame) clickedSprite: SpriteFrame = null; 
    @property(SpriteFrame) completeSprite: SpriteFrame = null; 
    @property(Node) x: Node= null; 
    @property(RichText) richText: RichText = null 
    @property(Node) yellowRac: Node = null;
    @property(Node) nextGuide: Node = null;
    @property(Node) ignoreButton: Node = null;
    @property(Node) completePanel: Node = null;
    private buttons: Button[] = []; 
    private isFilling: boolean = false;

     start(): void {
        this.x.active = false;
        this.nextGuide.active = false;    
        this.ignoreButton.active = true;
    }
    onLoad() {
        this.buttons = this.node.getComponentsInChildren(Button); // Assign the Button components

        // Attach event listeners to the buttons
        for (const button of this.buttons) {
            button['isFilled'] = false;
            button.node.on('mouse-down', this.onMouseDown, this);
            button.node.on('mouse-enter', this.onMouseEnter, this);
            button.node.on('mouse-up', this.onMouseUp, this);
        }
    }

    onMouseDown(event: any) {
        this.isFilling = true;
        const buttonNode = event.target;
        const button = buttonNode.getComponent(Button);
        console.log(event.target.name); // Log the name of the clicked button
        this.fillCell(buttonNode);
        
        // Check if all buttons have been filled or clicked
        
    }


    onMouseEnter(event: any) {
        if (this.isFilling) {
            this.fillCell(event.target);
        }
    }

    onMouseUp(event: any) {
        this.isFilling = false;
        
    }

    fillCell(buttonNode: Node) {
        const button = buttonNode.getComponent(Button);
        const sprite = buttonNode.getComponent(Sprite);
        // Change the SpriteFrame to the clickedSprite
        sprite.spriteFrame = this.clickedSprite;
        // Update the state property for the button
        button['isFilled'] = true;

        if (this.checkAllButtonsFilled()) {
            console.log('All buttons are filled!');
            this.yellowRac.active = false;
            this.nextGuide.active = true;
            this.ignoreButton.active = false;
            this.x.active = true;
            this.richText.string = '<color=#737373>1</color>'; 
            const spriteC = this.completePanel.getComponent(Sprite);
            spriteC.spriteFrame = this.completeSprite;
        }
    }

    checkAllButtonsFilled() {
        for (const button of this.buttons) {
            if (!button['isFilled']) {
                return false;
            }
        }
        return true;
    }
}
