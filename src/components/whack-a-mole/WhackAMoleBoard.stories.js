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
      { id: 3, mole: false },
      { id: 4, mole: false },
      { id: 5, mole: false },
      { id: 6, mole: false },
      { id: 7, mole: false },
      { id: 8, mole: false },
      { id: 9, mole: false },
    ],
  },
};
