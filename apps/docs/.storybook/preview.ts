import type { Preview } from '@storybook/html';
import '../src/stories/design-system.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default preview;
