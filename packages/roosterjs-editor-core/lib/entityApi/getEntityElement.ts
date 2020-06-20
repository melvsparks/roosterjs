import Editor from '../editor/Editor';
import { getEntitySelector } from './EntityInfo';

/**
 * Get the entity element from a child (or the element itself) of an entity.
 * If the given node is not part of an entity, it will return null
 * @param editor The editor to get entity from
 * @param node The child node
 */
export default function getEntityElement(editor: Editor, node: Node): HTMLElement {
    return (node && editor.getElementAtCursor(getEntitySelector(), node)) || null;
}
