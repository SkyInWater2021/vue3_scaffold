<script lang="ts" setup>
const props = defineProps<{
  title?: string
  width?: string
}>()
</script>

<template>
  <div class="page-title" :style="{ width }">
    <div class="btn-donate">
      <slot> {{ props.title }} </slot>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

.page-title::after {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(
    325deg,
    var(--global-blue) 0%,
    var(--global-dark) 55%,
    var(--global-blue) 90%
  );
  background-size: 280% auto;
  content: "";
}

.btn-donate {
  min-width: 120px;
  padding: 6px 15px;
  font-weight: 600;
  line-height: 20px;
  color: var(--btn-bg-color);
  background-image: linear-gradient(
    325deg,
    var(--global-blue) 0%,
    var(--global-dark) 55%,
    var(--global-blue) 90%
  );
  background-size: 280% auto;
  border: none;
  border-radius: 0.3rem;
  box-shadow:
    0 0 10px rgb(71 184 255 / 50%),
    0 5px 5px -1px rgb(58 125 233 / 25%),
    inset 4px 4px 8px rgb(175 230 255 / 50%),
    inset -4px -4px 8px rgb(19 95 216 / 35%);
  animation: shine 10s infinite linear;
}

@keyframes shine {
  0% {
    background-position: right top;
  }

  5% {
    background-position: left top;
  }

  100% {
    background-position: right top;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-donate {
    transition: linear;
  }
}
</style>
