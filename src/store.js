import { writable } from "svelte/store";
import { tweened } from "svelte/motion";
import { bounceInOut } from "svelte/easing";

export const store = writable(0);
export const progress = tweened(0, {
  duration: 2000,
  easing: bounceInOut,
});
