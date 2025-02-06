import { API } from '@editorjs/editorjs';
import { IconColor } from '@codexteam/icons';

import './styles.css';

type ColorPickerConfig = {
	colors: string[];
	columns: number;
};

interface ConstructorArgs {
	api: API;
	config: ColorPickerConfig;
}

export default class ColorPicker implements EditorJS.InlineTool {
	private api: API;

	tag = 'SPAN';
	class = 'cdx-text-color';
	defaultColor = '#2644FF';

	lastRange: Range | null = null;

	colors: string[] = [
		'#182a4e',
		'#0055cc',
		'#1f6a83',
		'#206e4e',
		'#e56910',
		'#ae2e24',
		'#5e4db2',
		'#758195',
		'#1e7afd',
		'#2998bd',
	];

	backgrounds: string[] = [
		'#182a4e',
		'#0055cc',
		'#1f6a83',
		'#206e4e',
		'#e56910',
		'#ae2e24',
		'#5e4db2',
		'#758195',
		'#1e7afd',
		'#2998bd',
	];

	columns = 5;

	static get title() {
		return 'Color';
	}

	static get isInline() {
		return true;
	}

	constructor(args: ConstructorArgs) {
		const { api, config } = args;
		this.api = api;

		if (config.colors) {
			this.colors = config.colors;
		}
		if (config.columns) {
			this.columns = config.columns;
		}
	}

	render() {
		const button = document.createElement('button');

		button.type = 'button';
		button.innerHTML = IconColor;
		button.classList.add(this.api.styles.inlineToolButton);

		button.addEventListener('mousedown', (e) => {
			// prevent text deselection when clicking the button
			e.preventDefault();
		});

		return button;
	}

	surround(range: Range | null) {
		this.lastRange = range;
	}

	wrapAndColor(range: Range | null, colorHex: string, isBackground = false) {
		if (!range) {
			return;
		}
		const selectedText = range.extractContents();
		const span = document.createElement(this.tag);
		span.classList.add(this.class);
		span.appendChild(selectedText);
		if (isBackground) span.style.backgroundColor = colorHex;
		if (!isBackground) span.style.color = colorHex;
		span.innerHTML = span.textContent || '';
		range.insertNode(span);

		this.api.selection.expandToTag(span);
	}

	renderActions() {
		const container = document.createElement('div');
		container.classList.add('editorjs__color-selector-container');
		container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

		this.colors.forEach((colorValue) => {
			const colorDiv = document.createElement('div');
			colorDiv.classList.add('editorjs__color-selector__container-item');
			colorDiv.style.color = colorValue;
			colorDiv.style.borderColor = colorValue;
			colorDiv.onclick = (e) => {
				e.preventDefault();
				this.wrapAndColor(this.lastRange, colorValue);
			};
			container.append(colorDiv);
		});

		this.backgrounds.forEach((backgroundValue) => {
			const colorDiv = document.createElement('div');
			colorDiv.classList.add('editorjs__background-selector__container-item');
			colorDiv.style.backgroundColor = backgroundValue;
			colorDiv.style.borderColor = backgroundValue;
			colorDiv.onclick = (e) => {
				e.preventDefault();
				this.wrapAndColor(this.lastRange, backgroundValue, true);
			};
			container.append(colorDiv);
		});

		return container;
	}

	/**
	 * Sanitizer rules
	 *
	 * @returns {object}
	 */
	static get sanitize(): any {
		return {
			span: {
				style: {
					color: true,
				},
			},
		};
	}
}

export class ColorPickerWithoutSanitize extends ColorPicker {
	static override get sanitize() {
		return undefined;
	}
}
