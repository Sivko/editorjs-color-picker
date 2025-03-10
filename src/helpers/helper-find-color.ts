function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export default function helperFindColorNameByHexOrRGB(input: string, colors: Record<string, string[]>): string {
  let hex = input.trim();
  const rgbMatch = hex.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);

  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch.map(Number);
    if (r! <= 255 && g! <= 255 && b! <= 255) {
      hex = rgbToHex(r!, g!, b!);
    } else {
      return "";
    }
  }

  for (const key of Object.keys(colors)) {
    const value = colors[key];
    if (!value) continue;
    const [color, shadow] = value;
    if (color === hex) {
      console.log(key);
      return key;
    }
    // if (item[1].includes(hex)) {
    //   return item[0];
    // }
    // if (hexValues.includes(hex)) {
    //   return colorName;
    // }
  }
  return "";
}

// Пример использования
// console.log(helperFindColorNameByHexOrRGB('#EA580C')); // 'Огненно-оранжевый'
// console.log(helperFindColorNameByHexOrRGB('rgb(234, 88, 12)')); // 'Огненно-оранжевый'
