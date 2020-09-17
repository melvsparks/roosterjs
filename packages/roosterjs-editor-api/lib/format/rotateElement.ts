import { ChangeSource } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';

/**
 * Rotate an element visually
 * @param editor The editor instance
 * @param element The element that should be rotated
 * @param angle The degree at which to rotate the element from it's center
 */
export default function rotateElement(editor: Editor, element: HTMLElement, angle: number): void {
    if (element) {
        editor.addUndoSnapshot(() => {
            let canvas = <HTMLCanvasElement>editor.getDocument().getElementById('rotateImageCanvas');
            const image = <HTMLImageElement>element; // TODO: change name of api

            if (!canvas) {
                canvas = editor.getDocument().createElement("canvas");
                const imageParent = image.parentElement;
                canvas.appendChild(image);
                imageParent.appendChild(canvas);
                canvas.id = "rotateImageCanvas";
                const maxWidth = Math.sqrt(Math.pow(image.width, 2) + Math.pow(image.height, 2));
                canvas.width = maxWidth;
                canvas.height = maxWidth;
            }

            const context = canvas.getContext("2d");
            rotateWithinCanvas(image, context, canvas, angle);
        }, ChangeSource.Format);
    }
}

function rotateWithinCanvas(image: HTMLImageElement, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, angle: number) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(image.width / 2, image.height / 2);
    context.rotate(angle * Math.PI / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    context.restore();
}
