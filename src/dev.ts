import EditorJS from '@editorjs/editorjs';
import ColorPicker from './index';

window.editor = new EditorJS({
  holder: 'editorjs',
  tools: {
    colorPicker: ColorPicker
  },
  data: {
    "blocks": [
      {
        "type": "paragraph",
        "data": {
          "text": "The example of text that was written in <b>one of popular</b> text editors."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "With the header of course",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "So what do we have?"
        }

      }
    ],
  }
});

console.log('EditorJS initialized with ColorPicker plugin');