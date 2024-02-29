<template>
  <div class="card-shine-wrapper">
    <div class="card-shine-container">
      <div class="card-shine-content com-floodlit-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shine-wrapper {
  --shine-color-1: #b9d6ff;
  --shine-height: 2px;
  --shine-width: 120px;

  position: relative;
  border-radius: 5px;
  transition: transform 300ms;
}

.card-shine-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
  overflow: hidden;
  border-radius: 5px;
  backface-visibility: hidden;
}

.card-shine-container::before {
  position: absolute;
  display: block;
  width: 30%;
  height: 400%;
  background-image: linear-gradient(
    90deg,
    transparent,
    var(--shine-color-1),
    var(--shine-color-1),
    var(--shine-color-1),
    transparent
  );
  animation: rotation-481 25s infinite linear;
  content: " ";
}

.card-shine-content {
  position: absolute;
  width: calc(100% - var(--shine-height));
  height: calc(100% - var(--shine-height));
  box-sizing: border-box;
  border-radius: 5px;
}

@keyframes rotation-481 {
  0%,
  100% {
    transform: rotateZ(0deg);
  }

  50% {
    transform: rotateZ(360deg);
  }
}
</style>
