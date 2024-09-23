<script setup>
import WhackAMoleBoard from './WhackAMoleBoard.vue';

let props = defineProps({
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
});

let score = ref(0);
let phase = ref('waiting');
let maxMoles = ref(2);
let board = ref([]);

function start() {
    initBoard();
    phase.value = 'playing';
    score.value = 0;
    refreshMoles();
}

function initBoard() {
    // make a board that is width x height
    board.value = [];
    for (let x = 0; x < props.width; x++) {
        for (let y = 0; y < props.height; y++) {
            board.value.push({ id: x + y * props.width, mole: false });
        }
    }
}

function whacked(hole) {
    if (!hole.mole) {
        return;
    }
    score.value++;
    hole.mole = false;
    refreshMoles([hole.id]);
}

/**
 * @param excludeMoles {Array<number>} - Array of hole ids to exclude from being a mole
 */
function refreshMoles(excludeMoles = []) {
    // count moles
    const moles = board.value.filter((hole) => hole.mole).length;

    if (moles >= maxMoles.value) {
        return;
    }

    if (moles < maxMoles.value) {
        addMole(excludeMoles);
    }

    refreshMoles();
}

/**
 * @param excludeMoles {Array<number>} - Array of hole ids to exclude from being a mole
 */
function addMole(excludeMoles = []) {
    let random = Math.floor(Math.random() * board.value.length);

    // if this hole is excluded then use the next hole
    if (excludeMoles.includes(board.value[random].id)) {
        random = (random + 1) % board.value.length;
    }

    board.value[random].mole = true;
}

watch(phase, (newPhase, oldPhase) => {
    if (newPhase === 'playing') {
        refreshMoles();
        score.value = 0;
    }
});

</script>

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

<style scoped></style>
