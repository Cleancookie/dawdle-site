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
    <WhackAMoleBoard :board="board" @whacked="whacked" />
</template>

<script>
import WhackAMoleBoard from './WhackAMoleBoard.vue';
import { ref } from 'vue';

export default {
    components: {
        WhackAMoleBoard,
    },
    data() {
        return {
            score: 0,
            phase: 'waiting',
            phases: ['waiting', 'playing'],
            maxMoles: 2,
            board: [
                { id: 1, mole: false },
                { id: 2, mole: false },
                { id: 3, mole: false },
                { id: 4, mole: false },
                { id: 5, mole: false },
                { id: 6, mole: false },
                { id: 7, mole: false },
                { id: 8, mole: false },
                { id: 9, mole: false },
            ],
        };
    },
    methods: {
        start() {
            this.phase = 'playing';
        },
        whacked(hole) {
            if (!hole.mole) {
                return;
            }
            this.score++;
            hole.mole = false;
            this.refreshMoles();
        },
        refreshMoles() {
            // count moles
            const moles = this.board.filter((hole) => hole.mole).length;

            if (moles >= this.maxMoles) {
                return;
            }

            if (moles < this.maxMoles) {
                this.addMole();
            }

            this.refreshMoles();
        },
        addMole() {
            const random = Math.floor(Math.random() * this.board.length);

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
