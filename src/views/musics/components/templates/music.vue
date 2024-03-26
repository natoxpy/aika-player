<template>
    <div class="flex flex-col text-white h-[350px] min-w-[250px] w-[250px] rounded-primary">
        <div class="relative w-[250px] mb-4 min-h-[250px]">
            <div class="z-10 absolute w-[250px] h-[250px] rounded-primary">
                <slot name="cover" />
            </div>
            <div class="z-10 absolute w-[250px] h-[250px]">
                <slot name="over-cover" />
            </div>
        </div>
        <div class="flex flex-col">
            <div class="text-lg line-clamp-2 overflow-hidden text-ellipsis">
                <slot name="title" />
            </div>
            <div class="flex gap-2">
                <slot name="artist-list" />
                <div class="h-full flex items-center">
                    <slot name="artist-separator" />
                </div>
                <slot name="artist-featured-list" />
            </div>
        </div>
    </div>
</template>
