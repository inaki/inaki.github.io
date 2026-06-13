// place files you want to import through the `$lib` alias in this folder.
export { default as Terminal } from './components/Terminal.svelte';
export * from './terminal/types';
export { commandRegistry, commands } from './terminal/commands';
