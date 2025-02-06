import { API } from '@editorjs/editorjs';
import { IconColor } from '@codexteam/icons';

import './styles.css';

type ColorPickerConfig = {
	colors: Record<string, string[]>
	backgrounds: Record<string, string[]>
}

interface ConstructorArgs {
	api: API;
	config: ColorPickerConfig;
}

export default class ColorPicker implements EditorJS.InlineTool {
	private api: API;

	tag = 'SPAN';
	class = 'cdx-text-color';

	lastRange: Range | null = null;

	tooltip: HTMLDivElement | null = null;

	// name: [color, shadow]
	colors: Record<string, string[]> = {
		"Угольный черный": ["#1C1917", '#1C1917'],
		"Пепельный серый": ["#78716C", '#E7E5E4'],
		"Бирюзовый морской": ["#0D9488", '#99F6E4'],
		"Огненно-оранжевый": ["#EA580C", '#FED7AA'],
		"Золотисто-жёлтый": ["#CA8A04", '#FEF08A'],
		"Ярко-зелёный": ["#16A34A", '#BBF7D0'],
		"Сапфировый синий": ["#1C64F2", '#BFDBFE'],
		"Фиолетовый аметист": ["#9333EA", '#E9D5FF'],
		"Малиновый розовый": ["#DB2777", '#FBCFE8'],
		"Алый красный": ["#DC2626", '#FECACA']
	}

	backgrounds: Record<string, string[]> = {
		"Угольный черный": ["#1C1917", '#fff'],
		"Серебристо-серый": ["#E7E5E4", '#F5F5F4'],
		"Нежная мята": ["#99F6E4", '#CCFBF1'],
		"Персиковый": ["#FED7AA", '#FFEDD5'],
		"Пастельный желтый": ["#FEF08A", '#FEF9C3'],
		"Мятно-зеленый": ["#BBF7D0", '#DCFCE7'],
		"Небесно-голубой": ["#BFDBFE", '#DBEAFE'],
		"Лавандовый": ["#E9D5FF", '#F3E8FF'],
		"Розовый пастель": ["#FBCFE8", '#FCE7F3'],
		"Нежно-коралловый": ["#FECACA", '#FEE2E2']
	}

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
		this.colors = config?.colors || this.colors;
		// this.colorsShadow = config?.colorsShadow || this.colorsShadow;
		this.backgrounds = config?.backgrounds || this.backgrounds;
		// this.backgroundsShadow = config?.backgroundShadow || this.backgroundsShadow;
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

	createTooltip(text: string, targetElement: HTMLElement) {
		const tooltip = document.createElement('div');
		tooltip.classList.add('editorjs__colopicker-tooltip');
		tooltip.innerHTML = text;

		document.body.appendChild(tooltip); // Добавляем в body, а не внутрь элемента

		// Вычисление позиции
		const rect = targetElement.getBoundingClientRect();
		tooltip.style.position = 'fixed';
		tooltip.style.top = `${rect.top - 30}px`; // Выше на 10px
		tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`; // Центрируем по горизонтали
		return tooltip;
	};

	createLabel(text: string) {
		const label = document.createElement('div');
		label.classList.add('editorjs__colopicker-label');
		label.innerHTML = text;
		return label
	}


	renderActions() {
		const container = document.createElement('div');
		container.classList.add('editorjs__color-selector-container');
		container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

		container.append(this.createLabel('Цвет текста'));

		Object.keys(this.colors).forEach((_key) => {
			const key = _key as keyof typeof this.colors;
			const colorValue = this.colors[key]![0];
			const colorShadow = this.colors[key]![1];

			const colorDiv = document.createElement('div');
			colorDiv.classList.add('editorjs__color-selector__container-item');
			colorDiv.style.color = colorValue!;
			colorDiv.innerHTML = `<div class="editorjs__color-selector__container-item--shadow" style="color: ${colorShadow}"></div>`
			container.append(colorDiv);

			colorDiv.onclick = () => {
				this.wrapAndColor(this.lastRange, colorValue!);
			};

			colorDiv.onmouseenter = () => {
				this.tooltip = this.createTooltip(key, colorDiv);
			}

			colorDiv.onmouseleave = () => {
				if (this.tooltip) {
					this.tooltip.remove();
					this.tooltip = null;
				}
			}
		});

		container.append(this.createLabel('Цвет фона'));

		Object.keys(this.backgrounds).forEach((_key) => {
			const key = _key as keyof typeof this.backgrounds;
			const backgroundValue = this.backgrounds[key]![0];
			const backgroundShadow = this.backgrounds[key]![1];

			const backgroundDiv = document.createElement('div');
			backgroundDiv.classList.add('editorjs__background-selector__container-item');
			backgroundDiv.style.background = backgroundValue!;
			backgroundDiv.innerHTML = `<div class="editorjs__background-selector__container-item--shadow" style="color: ${backgroundShadow}"></div>`
			// backgroundDiv.append(tooltip);
			container.append(backgroundDiv);
			backgroundDiv.onclick = (e) => {
				this.wrapAndColor(this.lastRange, backgroundValue!, true);
			};

			backgroundDiv.onmouseenter = () => {
				this.tooltip = this.createTooltip(key, backgroundDiv);
			}

			backgroundDiv.onmouseleave = () => {
				if (this.tooltip) {
					this.tooltip.remove();
					this.tooltip = null;
				}
			}
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
