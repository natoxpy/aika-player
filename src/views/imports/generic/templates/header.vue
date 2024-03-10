<template>
    <div class="h-[150px] mb-[5px] text-text flex flex-row justify-between items-center">
        <div class="flex flex-col gap-1 min-w-[500px]">
            <div class="text-5xl">
                <slot name="title" />
            </div>
            <div class="text-overlay1 sticky">
                <slot name="subtitle" />
            </div>
        </div>
        <div class="flex max-w-[600px] flex-grow items-center gap-4">
            <slot name="save" />
            <div class="flex-grow">
                <slot name="input" />
            </div>

            <div class="flex cursor-pointer justify-center items-center">
                <slot name="submit-btn" />
            </div>
        </div>
    </div>
</template>
