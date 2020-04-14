import Editor from '../editor/Editor';
import EditorPlugin from '../interfaces/EditorPlugin';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';

export default class BlobInlineImage implements EditorPlugin {
    private editor: Editor;
    private cachedImageContent: Record<string, string> = {};
    private imgRegex = /<img (.*?)>/gi;

    getName() {
        return 'BlobInlineImage';
    }

    initialize(editor: Editor) {
        this.editor = editor;
    }

    dispose() {
        const URL = this.getURL();
        Object.keys(this.cachedImageContent).forEach(url => {
            URL.revokeObjectURL(url);
        });

        this.editor = null;
    }

    onPluginEvent(event: PluginEvent) {
        if (
            event.eventType == PluginEventType.ExtractContent &&
            Object.keys(this.cachedImageContent).length > 0
        ) {
            event.content = event.content.replace(this.imgRegex, this.replacer);
        }
    }

    createObjectUrl(obj: Blob, callback: (url: string) => void) {
        let reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
            if (this.editor) {
                const url = this.getURL().createObjectURL(obj);
                this.cachedImageContent[url] = (event.target as FileReader).result as string;
                if (callback) {
                    callback(url);
                }
            }
        };
        reader.readAsDataURL(obj);
    }

    private replacer = (str: string): string => {
        Object.keys(this.cachedImageContent).forEach(url => {
            str = str.replace(url, this.cachedImageContent[url]);
        });

        return str;
    };

    private getURL(): typeof URL {
        const window = this.editor.getDocument().defaultView as any;
        return window.URL as typeof URL;
    }
}
