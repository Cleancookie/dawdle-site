<template>
    <div class="board" :style="this.boardStyle">
        <button
            class="hole"
            v-for="hole in board"
            :class="[hole.mole ? 'has-mole' : '']"
            @click="$emit('whacked', hole)"
        ></button>
    </div>
</template>

<script>
export default {
    props: {
        board: {
            type: Array,
            required: true,
            default: () => [
                // { id: 1, mole: false },
                // { id: 2, mole: false },
                // { id: 3, mole: false },
                // { id: 4, mole: false },
                // { id: 5, mole: false },
                // { id: 6, mole: false },
                // { id: 7, mole: false },
                // { id: 8, mole: false },
                // { id: 9, mole: false },
            ],
        },
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    computed: {
        boardStyle() {
            return {
                height: `${this.height * 100}px`,
                width: `${this.width * 100}px`,
                gridTemplateColumns: `repeat(${this.width}, 1fr)`,
                gridTemplateRows: `repeat(${this.height}, 1fr)`,
            };
        },
    },
    emits: ['whacked'],
};
</script>

<style scoped>
.board {
    border-radius: 1px solid green;
    background-color: red;

    display: grid;

    gap: 5%;
    padding: 2.5%;
}

.hole {
    background-color: black;
    border-radius: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.has-mole {
    border: 10px solid yellow;
}
</style>
