import { _decorator, Component, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UiController')
export class UiController extends Component {
    @property(ImageAsset)
    private defaultCursorImage: ImageAsset | null = null; // Default cursor image

    @property(ImageAsset)
    private customCursorImage: ImageAsset | null = null; // Custom cursor image

    private isMouseDown: boolean = false;

    start() {
    
        const canvas = document.getElementById('GameCanvas');
        if (canvas instanceof HTMLCanvasElement) {
            canvas.style.cursor = `url("${this.defaultCursorImage?.nativeUrl}"), auto`;

            canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        } else {
            console.error('GameCanvas not found or is not an HTMLCanvasElement.');
        }
    }

    onMouseDown() {
        this.isMouseDown = true;
        this.setCursor(this.customCursorImage);
    }

    onMouseUp() {
        this.isMouseDown = false;
        this.setCursor(this.customCursorImage);
    }

    private setCursor(cursorImage: ImageAsset | null) {
        const canvas = document.getElementById('GameCanvas');
        if (cursorImage && canvas instanceof HTMLCanvasElement) {
            canvas.style.cursor = `url("${cursorImage.nativeUrl}"), auto`;
        }
    }
}
