import { API } from '@editorjs/editorjs';
import { IconColor } from '@codexteam/icons';
import './styles.css';

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
  private api: API;
  tag = 'SPAN';
  class = 'cdx-text-color';
  lastRange: Range | null = null;
  tooltip: HTMLDivElement | null = null;
  icon = IconColor;
  columns = 5;

  colors: Record<string, string[]>;
  backgrounds: Record<string, string[]>;

  static get title() {
    return 'Color';
  }

  static get isInline() {
    return true;
  }

  constructor({ api, config }: IConstructorArgs) {
    this.api = api;
    this.colors = config?.colors ?? this.getDefaultColors();
    this.backgrounds = config?.backgrounds ?? this.getDefaultBackgrounds();
    this.icon = config?.icon ?? IconColor;
  }

  getDefaultColors(): Record<string, string[]> {
    return {
      'Угольный черный': ['#1C1917', '#1C1917'],
      'Пепельный серый': ['#78716C', '#E7E5E4'],
      'Бирюзовый морской': ['#0D9488', '#99F6E4'],
      'Огненно-оранжевый': ['#EA580C', '#FED7AA'],
      'Золотисто-жёлтый': ['#CA8A04', '#FEF08A'],
      'Ярко-зелёный': ['#16A34A', '#BBF7D0'],
      'Сапфировый синий': ['#1C64F2', '#BFDBFE'],
      'Фиолетовый аметист': ['#9333EA', '#E9D5FF'],
      'Малиновый розовый': ['#DB2777', '#FBCFE8'],
      'Алый красный': ['#DC2626', '#FECACA'],
    };
  }

  getDefaultBackgrounds(): Record<string, string[]> {
    return {
      'Угольный черный': ['#1C1917', '#fff'],
      'Серебристо-серый': ['#E7E5E4', '#F5F5F4'],
      'Нежная мята': ['#99F6E4', '#CCFBF1'],
      'Персиковый': ['#FED7AA', '#FFEDD5'],
      'Пастельный желтый': ['#FEF08A', '#FEF9C3'],
      'Мятно-зеленый': ['#BBF7D0', '#DCFCE7'],
      'Небесно-голубой': ['#BFDBFE', '#DBEAFE'],
      'Лавандовый': ['#E9D5FF', '#F3E8FF'],
      'Розовый пастель': ['#FBCFE8', '#FCE7F3'],
      'Нежно-коралловый': ['#FECACA', '#FEE2E2'],
    };
  }

  render() {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = this.icon;
    button.classList.add(this.api.styles.inlineToolButton);
    button.addEventListener('mousedown', (e) => e.preventDefault());
    return button;
  }

  surround(range: Range | null) {
    this.lastRange = range;
  }

  wrapAndColor(range: Range | null, colorHex: string, isBackground = false) {
    if (!range) return;
    const selectedText = range.extractContents();
    const span = document.createElement(this.tag);
    span.classList.add(this.class);
    span.appendChild(selectedText);
    span.style[isBackground ? 'backgroundColor' : 'color'] = colorHex;
    span.innerHTML = span.textContent || '';
    range.insertNode(span);
    this.api.selection.expandToTag(span);
  }

  createTooltip(text: string, targetElement: HTMLElement) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('editorjs__colorpicker-tooltip');
    tooltip.innerHTML = text;
    document.body.appendChild(tooltip);

    const rect = targetElement.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top - 30}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;

    return tooltip;
  }

  createLabel(text: string) {
    const label = document.createElement('div');
    label.classList.add('editorjs__colorpicker-label');
    label.innerHTML = text;
    return label;
  }

  createPickerSection(label: string, data: Record<string, string[]>, isBackground = false) {
    const container = document.createElement('div');
		container.classList.add(`editorjs__colorpicker-container`);
		container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    container.append(this.createLabel(label));

    Object.entries(data).forEach(([key, [mainColor, shadowColor]]) => {
      const div = document.createElement('div');
      div.classList.add(`editorjs__${isBackground ? 'background' : 'color'}-selector__container-item`);
      (div.style as any)[isBackground ? 'backgroundColor' : 'color'] = mainColor;
      div.innerHTML = `<div class="editorjs__${isBackground ? 'background' : 'color'}-selector__container-item--shadow" style="color: ${shadowColor}"></div>`;
      container.append(div);

      div.onclick = () => this.wrapAndColor(this.lastRange, mainColor!, isBackground);
      div.onmouseenter = () => (this.tooltip = this.createTooltip(key, div));
      div.onmouseleave = () => this.tooltip?.remove();
    });

    return container;
  }

  renderActions() {
    const container = document.createElement('div');
    container.append(this.createPickerSection('Цвет текста', this.colors));
    container.append(this.createPickerSection('Цвет фона', this.backgrounds, true));
    
    return container;
  }

	clear(): void {
		this.tooltip?.remove();
	}

  static get sanitize() {
    return {
      span: {
        style: {
          color: true,
        },
      },
    };
  }
}
