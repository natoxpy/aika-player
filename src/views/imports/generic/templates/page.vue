<template>
    <div class="flex flex-col relative pb-4 px-[50px] h-full overflow-auto">
        <div
            class="sticky top-0 bg-gradient-to-b from-base z-50 via-[rgba(36,39,58,0.7)] via-75% transition-all"
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
