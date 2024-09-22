import { fn } from '@storybook/test';
import WhackAMoleBoard from './WhackAMoleBoard.vue';

export default {
  title: 'WhackAMoleBoard',
  component: WhackAMoleBoard,
  argTypes: {},
  args: {
    onWhack: fn((thing) => {
      console.log('Whacked!', thing);
    }),
  },
};

export const Primary = {
  args: {
    board: [
      { id: 1, mole: true },
      { id: 2, mole: false },
    ],
    width: 3,
    height: 3,
  },
};
