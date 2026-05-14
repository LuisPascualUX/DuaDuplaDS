import type { Preview } from '@storybook/html';
import '../src/stories/design-system.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', 'Icons', 'Components'],
      },
    },
  },
};

export default preview;
