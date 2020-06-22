import { CustomReplace } from 'roosterjs-editor-plugins';
import { ImageResize } from 'roosterjs-plugin-image-resize';
import { PickerPlugin } from 'roosterjs-plugin-picker';
import {
    HyperLink,
    Paste,
    ContentEdit,
    Watermark,
    TableResize,
    EntityPlugin,
} from 'roosterjs-editor-plugins';

export type EditorInstanceToggleablePlugins = {
    hyperlink: HyperLink;
    paste: Paste;
    contentEdit: ContentEdit;
    watermark: Watermark;
    imageResize: ImageResize;
    tableResize: TableResize;
    customReplace: CustomReplace;
    pickerPlugin: PickerPlugin;
    entityPlugin: EntityPlugin;
};
