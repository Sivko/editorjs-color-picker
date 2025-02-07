import { API } from '@editorjs/editorjs';
type TConfig = {
    colors: Record<string, string[]>;
    backgrounds: Record<string, string[]>;
    icon: string;
};
interface IConstructorArgs {
    api: API;
    config: TConfig;
}
export default class ColorPicker implements EditorJS.InlineTool {
    private api;
    tag: string;
    class: string;
    lastRange: Range | null;
    tooltip: HTMLDivElement | null;
    icon: string;
    columns: number;
    colors: Record<string, string[]>;
    backgrounds: Record<string, string[]>;
    static get title(): string;
    static get isInline(): boolean;
    constructor({ api, config }: IConstructorArgs);
    getDefaultColors(): Record<string, string[]>;
    getDefaultBackgrounds(): Record<string, string[]>;
    render(): HTMLButtonElement;
    surround(range: Range | null): void;
    wrapAndColor(range: Range | null, colorHex: string, isBackground?: boolean): void;
    createTooltip(text: string, targetElement: HTMLElement): HTMLDivElement;
    createLabel(text: string): HTMLDivElement;
    createPickerSection(label: string, data: Record<string, string[]>, isBackground?: boolean): HTMLDivElement;
    renderActions(): HTMLDivElement;
    clear(): void;
    static get sanitize(): {
        span: {
            style: {
                color: boolean;
            };
        };
    };
}
export {};
