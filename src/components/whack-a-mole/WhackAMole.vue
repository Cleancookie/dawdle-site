<template>
    <h1>Whack A Mole</h1>
    <hr>
    <span>Score: {{ score }}</span>
    <hr>
    <span>Phase: {{ phase }}</span>
    <hr>
    <button
        class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="start">Start phase: Playing</button>
    <hr>
    <WhackAMoleBoard
        :board="board"
        :width="width"
        :height="height"
        @whacked="whacked"
    />
</template>

<script>
import WhackAMoleBoard from './WhackAMoleBoard.vue';
import { ref } from 'vue';

export default {
    components: {
        WhackAMoleBoard,
    },
    props: {
        width: {
            type: Number,
            required: true,
            default: 3,
        },
        height: {
            type: Number,
            required: true,
            default: 3,
        },
    },
    data() {
        return {
            score: 0,
            phase: 'waiting',
            phases: ['waiting', 'playing'],
            maxMoles: 2,
            board: [
            ],
        };
    },
    methods: {
        start() {
            this.initBoard();
            this.phase = 'playing';
            this.score = 0;
            this.refreshMoles();
        },
        initBoard() {
            // make a board that is width x height
            this.board = [];
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    this.board.push({ id: x + y * this.width, mole: false });
                }
            }
        },
        whacked(hole) {
            if (!hole.mole) {
                return;
            }
            this.score++;
            hole.mole = false;
            this.refreshMoles([hole.id]);
        },
        /**
         * @param excludeMoles {Array<number>} - Array of hole ids to exclude from being a mole
         */
        refreshMoles(excludeMoles = []) {
            // count moles
            const moles = this.board.filter((hole) => hole.mole).length;

            if (moles >= this.maxMoles) {
                return;
            }

            if (moles < this.maxMoles) {
                this.addMole(excludeMoles);
            }

            this.refreshMoles();
        },
        /**
         * @param excludeMoles {Array<number>} - Array of hole ids to exclude from being a mole
         */
        addMole(excludeMoles = []) {
            let random = Math.floor(Math.random() * this.board.length);

            // if this hole is excluded then use the next hole
            if (excludeMoles.includes(this.board[random].id)) {
                random = (random + 1) % this.board.length;
            }

            this.board[random].mole = true;
        },
    },
    watch: {
        phase(newPhase, oldPhase) {
            if (newPhase === 'playing') {
                this.refreshMoles();
                this.score = 0;
            }
        },
    },
}
</script>

<style scoped></style>
