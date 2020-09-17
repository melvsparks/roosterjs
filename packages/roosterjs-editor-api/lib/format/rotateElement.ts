import { ChangeSource } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';

const ROTATE_CANVAS_ID = "rotateImageCanvasId";
/**
 * Rotate an element visually
 * @param editor The editor instance
 * @param element The element that should be rotated
 * @param angle The degree at which to rotate the element from it's center
 */
export default function rotateElement(editor: Editor, element: HTMLElement, angle: number): void {
    if (element) {
        editor.addUndoSnapshot(() => {
            let canvas = <HTMLCanvasElement>editor.getDocument().getElementById(ROTATE_CANVAS_ID);
            const image = <HTMLImageElement>element; // TODO: change name of api

            if (!canvas) {
                canvas = editor.getDocument().createElement("canvas");
                canvas.id = ROTATE_CANVAS_ID;
                const imageParent = image.parentElement;
                canvas.appendChild(image);
                imageParent.appendChild(canvas);
                setCanvasDimensions(image.width, image.height, canvas);
            } else if (image != canvas.firstElementChild) {
                const oldImage = canvas.firstElementChild;
                const imageParent = image.parentElement;
                imageParent.appendChild(oldImage);
                canvas.appendChild(image);
                setCanvasDimensions(image.width, image.height, canvas);
            }

            const context = canvas.getContext("2d");
            rotateWithinCanvas(image, context, canvas, angle);
        }, ChangeSource.Format);
    }
}

function setCanvasDimensions(imageWidth: number, imageHeight: number, canvas: HTMLCanvasElement) {
    const maxWidth = Math.sqrt(Math.pow(imageWidth, 2) + Math.pow(imageHeight, 2));
    canvas.width = maxWidth;
    canvas.height = maxWidth;
}

function rotateWithinCanvas(image: HTMLImageElement, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, angle: number) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(image.width / 2, image.height / 2);
    context.rotate(angle * Math.PI / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
}
