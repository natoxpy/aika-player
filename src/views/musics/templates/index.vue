<template>
  <div class="pb-4 px-[50px] h-full overflow-auto">
    <!--
    <div class="pt-[25px] flex justify-end items-center">
       <slot name="top" /> 
    </div> 
    -->
    <div
      class="sticky top-0 bg-gradient-to-b from-bprimary z-50 via-[hsla(240,10%,4%,0.5)] via-75% transition-all"
    >
      <slot name="header" />
    </div>
    <div class="flex-grow z-0">
      <slot name="body" />
    </div>
  </div>
</template>
