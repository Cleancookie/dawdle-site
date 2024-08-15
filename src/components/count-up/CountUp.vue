<script setup>
import { ref, computed } from 'vue';

let rows = ref(3);

let buttons = Array.from({ length: rows.value * 3 }, (_, i) => i + 1);
buttons = ref(buttons.map((value) => ({ label: value.toString(), value })));

const dynamicRowsClass = computed(() => `grid-rows-${rows.value}`);
</script>

<template>
    <div class="count-up-container flex justify-center">
        <div class="count-up-board grid grid-flow-col gap-3 min-w-[300px]" :class="dynamicRowsClass">
            <button v-for="btn in buttons" :value="btn.value">{{ btn.label }}</button>
        </div>
    </div>
</template>

<style scoped>
button {
    background-color: rgba(242, 242, 242, 1);
    border: 1px solid rgb(178 183 191);
    width: 100%;
    padding-top: 100%;
    border-radius: 1.25em;
}
</style>
