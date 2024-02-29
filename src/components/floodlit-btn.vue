<script lang="ts" setup>
defineProps<{
  text?: string | number | symbol
  active?: boolean
}>()
</script>

<template>
  <button :class="{ 'is-active': active }">{{ text }}</button>
</template>

<style scoped>
button {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  font-weight: 700;
  white-space: nowrap;
  background-image: linear-gradient(
    90deg,
    var(--global-blue-dark) 0%,
    var(--global-blue-darker) 55%,
    var(--global-blue-dark) 100%
  );
  border-radius: 4px;
  box-shadow: inset -4px -4px 8px #135fd84d;
  transition: all 0.1s;
}

button:hover,
button.is-active {
  color: white;
  box-shadow:
    inset 0 0 10px rgba(#80aff4, 1),
    0 0 20px 3px rgba(#80aff4, 0.2);
}

button::before {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 1%,
    rgb(53 118 222 / 20%) 40%,
    rgb(53 118 222 / 20%) 60%,
    transparent 100%
  );
  transition: transform 0.4s ease-in-out;
  content: "";
}

button:hover::before {
  transform: translateX(200%);
}
</style>
