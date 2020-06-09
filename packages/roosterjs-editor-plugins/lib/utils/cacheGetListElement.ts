import { cacheGetElementAtCursor, Editor } from 'roosterjs-editor-core';
import { getTagOfNode } from 'roosterjs-editor-dom';
import { PluginInputEvent, PluginKeyboardEvent } from 'roosterjs-editor-types';

/**
 * @internal
 */
export default function cacheGetListElement(
    event: PluginKeyboardEvent | PluginInputEvent,
    editor: Editor
) {
    let li = cacheGetElementAtCursor(editor, event, 'LI,TABLE');
    let listElement = li && getTagOfNode(li) == 'LI' && editor.getElementAtCursor('UL,OL', li);
    return listElement ? [listElement, li] : null;
}
