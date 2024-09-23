import { fn } from '@storybook/test';
import WhackAMoleCompositionApi from './WhackAMoleCompositionApi.vue';

export default {
  title: 'WhackAMole/WhackAMoleCompositionApi',
  component: WhackAMoleCompositionApi,
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
