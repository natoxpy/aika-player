<template>
  <div class="p-3 flex flex-col">
    <div class="text-fprimary text-2xl font-semibold m-4 mb-2">
      <slot name="title" />
    </div>
    <div class="flex flex-col gap-y-2">
      <slot name="options" />
    </div>
  </div>
</template>
