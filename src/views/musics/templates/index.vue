<template>
    <div class="pb-4 px-[50px] h-full overflow-auto">
        <div
            class="sticky bg-gradient-to-b from-base z-50 via-[rgba(36,39,58,0.7)] via-75% top-0 transition-all"
        >
            <slot name="header" />
        </div>
        <div class="flex-grow z-0">
            <slot name="body" />
        </div>
    </div>
</template>
