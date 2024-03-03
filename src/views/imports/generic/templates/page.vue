<template>
    <div class="flex flex-col relative pb-4 px-[50px] h-full overflow-auto">
        <div
            class="sticky top-0 bg-gradient-to-b from-bprimary z-50 via-[hsla(240,10%,4%,0.5)] via-75% transition-all"
        >
            <slot name="header" />
        </div>
        <div class="w-full h-fit">
            <slot name="dropzone" />
        </div>
        <div class="flex-grow z-10 rounded-primary">
            <slot name="body" />
        </div>
    </div>
</template>
