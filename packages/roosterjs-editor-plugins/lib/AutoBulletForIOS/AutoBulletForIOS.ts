import cacheGetListElement from '../utils/cacheGetListElement';
import { cacheGetContentSearcher, Editor, EditorPlugin } from 'roosterjs-editor-core';
import { NodeType, PluginEvent, PluginEventType, PositionType } from 'roosterjs-editor-types';
import { toggleBullet, toggleNumbering } from 'roosterjs-editor-api';

export default class AutoBulletForIOS implements EditorPlugin {
    private editor: Editor;

    getName() {
        return 'AutoBulletForIOS';
    }

    initialize(editor: Editor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.Input) {
            if (event.rawEvent.data == ' ') {
                if (!cacheGetListElement(event, this.editor)) {
                    let searcher = cacheGetContentSearcher(event, this.editor);
                    let textBeforeCursor = searcher.getSubStringBefore(3);

                    // Auto list is triggered if:
                    // 1. Text before cursor exactly mathces '*', '-' or '1.'
                    // 2. There's no non-text inline entities before cursor
                    if (
                        ['*\u00A0', '-\u00A0', '1.\u00A0'].indexOf(textBeforeCursor) >= 0 &&
                        !searcher.getNearestNonTextInlineElement()
                    ) {
                        this.editor.performAutoComplete(() => {
                            let rangeToDelete = searcher.getRangeFromText(
                                textBeforeCursor,
                                true /*exactMatch*/
                            );

                            if (rangeToDelete) {
                                rangeToDelete.deleteContents();
                                const node = rangeToDelete.startContainer;
                                if (
                                    node?.nodeType == NodeType.Text &&
                                    node.nodeValue == '' &&
                                    !node.previousSibling &&
                                    !node.nextSibling
                                ) {
                                    const br = this.editor.getDocument().createElement('BR');
                                    this.editor.insertNode(br);
                                    this.editor.select(br, PositionType.Before);
                                }
                            }

                            if (textBeforeCursor.indexOf('1.') == 0) {
                                toggleNumbering(this.editor);
                            } else {
                                toggleBullet(this.editor);
                            }
                        });
                    }
                }
            }
        }
    }
}
