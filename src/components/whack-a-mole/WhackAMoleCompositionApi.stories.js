import WhackAMole from './WhackAMole.vue';
import { fn } from '@storybook/test';

export default {
  title: 'WhackAMole/WhackAMoleCompositionApi',
  component: WhackAMole,
  argTypes: {},
  args: {
    onWhack: fn(() => {
      console.log('Whacked!');
    }),
  },
};

export const Primary = {
  args: {
    width: 3,
    height: 3,
  },
};
