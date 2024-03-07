<script lang="ts" setup></script>

<template>
  <div class="sun">
    <div class="center"></div>
    <div class="ray r-1"></div>
    <div class="ray r-2"></div>
    <div class="ray r-3"></div>
    <div class="ray r-4"></div>
    <div class="ray r-5"></div>
    <div class="ray r-6"></div>
    <div class="ray r-7"></div>
    <div class="ray r-8"></div>
  </div>
</template>

<style scoped>
.sun {
  position: relative;
  animation: rotate 12s linear infinite;

  --color: yellow;
  --scale: 0.2;
}

.center {
  width: calc(var(--scale) * 10em);
  height: calc(var(--scale) * 10em);
  background-color: var(--color);
  border-radius: 50%;
  box-shadow: 0 0 calc(var(--scale) * 3em) var(--color);
}

.ray {
  position: absolute;
  width: calc(var(--scale) * 0.5em);
  height: calc(var(--scale) * 3em);
  background-color: var(--color);
  box-shadow: 0 0 calc(var(--scale) * 1em) var(--color);
}

.r-1 {
  margin-top: calc(var(--scale) * 1em);
  margin-left: calc(var(--scale) * 4.75em);
}

.r-2 {
  margin-top: calc(var(--scale) * -6.25em);
  margin-left: calc(var(--scale) * 12.25em);
  transform: rotate(90deg);
}

.r-3 {
  margin-top: calc(var(--scale) * -14em);
  margin-left: calc(var(--scale) * 4.75em);
}

.r-4 {
  margin-top: calc(var(--scale) * -6.25em);
  margin-left: calc(var(--scale) * -2.75em);
  transform: rotate(90deg);
}

.r-5 {
  margin-top: calc(var(--scale) * -1em);
  margin-left: calc(var(--scale) * -0.5em);
  transform: rotate(45deg);
}

.r-6 {
  margin-top: calc(var(--scale) * -1em);
  margin-left: calc(var(--scale) * 9.75em);
  transform: rotate(-45deg);
}

.r-7 {
  margin-top: calc(var(--scale) * -11.75em);
  margin-left: calc(var(--scale) * 10.25em);
  transform: rotate(45deg);
}

.r-8 {
  margin-top: calc(var(--scale) * -11.75em);
  margin-left: calc(var(--scale) * -0.5em);
  transform: rotate(-45deg);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
