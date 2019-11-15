import FormatStatePane, { FormatStatePaneProps } from './FormatStatePane';
import SidePanePluginImpl from '../SidePanePluginImpl';
import { getFormatState } from 'roosterjs-editor-api';
import { IEditor } from 'roosterjs-editor-core';
import { PluginEvent, PluginEventType } from 'roosterjs-editor-types';
import { SidePaneElementProps } from '../SidePaneElement';

export default class FormatStatePlugin extends SidePanePluginImpl<
    FormatStatePane,
    FormatStatePaneProps
> {
    constructor() {
        super(FormatStatePane, 'format', 'Format State');
    }

    initialize(editor: IEditor) {
        super.initialize(editor);
        this.editor.runAsync(() => {
            this.editor.focus();

            this.updateFormatState();
        });
    }

    getComponentProps(base: SidePaneElementProps) {
        return {
            ...base,
            ...this.getFormatState(),
        };
    }

    onPluginEvent(event: PluginEvent) {
        if (
            event.eventType == PluginEventType.KeyUp ||
            event.eventType == PluginEventType.MouseUp ||
            event.eventType == PluginEventType.ContentChanged
        ) {
            this.updateFormatState();
        }
    }

    updateFormatState() {
        this.getComponent(component => component.setFormatState(this.getFormatState()));
    }

    private getFormatState() {
        let format = this.editor && getFormatState(this.editor);
        let rect = this.editor && this.editor.getCursorRect();
        return {
            format,
            inIME: this.editor && this.editor.isInIME(),
            x: rect ? rect.left : 0,
            y: rect ? rect.top : 0,
        };
    }
}
