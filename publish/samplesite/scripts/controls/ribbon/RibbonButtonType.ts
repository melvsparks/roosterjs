import { FormatState } from 'roosterjs-editor-types';
import { IEditor } from 'roosterjs-editor-core';

export type DropDownRenderer = (
    editor: IEditor,
    onDismiss: () => void,
    key: string,
    value: string
) => JSX.Element;

export default interface RibbonButtonType {
    title: string;
    image: string;
    onClick: (editor: IEditor, value: string) => void;
    checked?: (format: FormatState, editor: IEditor) => boolean;
    dropDownItems?: { [key: string]: string };
    dropDownRenderer?: DropDownRenderer;
    preserveOnClickAway?: boolean;
}
