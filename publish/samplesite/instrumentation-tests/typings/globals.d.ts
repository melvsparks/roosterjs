import { EditorInstanceToggleablePlugins } from '../../scripts/controls/editor/EditorInstanceToggleablePlugins';
import { IEditor } from 'roosterjs-editor-core';
// import Plugins from '../../scripts/controls/plugins';

declare global {
    interface Window {
        /**
         * Toggleable plugins that are fed into the rooster editor
         */
        globalRoosterEditorNamedPlugins: EditorInstanceToggleablePlugins;
        /**
         * The editor instance for the sample site.
         */
        globalRoosterEditor: IEditor;
    }
}
