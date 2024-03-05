<script setup lang="tsx">
import CirclePlayIcon from '@/components/icons/shadcn/circlePlay.vue'
import LayoutGridIcon from '@/components/icons/shadcn/layoutGrid.vue'
import LibraryIcon from '@/components/icons/shadcn/library.vue'
import ListMusicIcon from '@/components/icons/shadcn/listMusic.vue'
import MicIcon from '@/components/icons/shadcn/mic.vue'
import MusicIcon from '@/components/icons/shadcn/music.vue'

const icons = {
    circlePlay: CirclePlayIcon,
    layoutGrid: LayoutGridIcon,
    library: LibraryIcon,
    listMusic: ListMusicIcon,
    mic: MicIcon,
    music: MusicIcon
}

type OptionIcons = keyof typeof icons

interface Props {
    icon: OptionIcons
    active?: boolean
    href: string
}

const props = defineProps<Props>()

function ResolveIcon({ icon }: { icon: OptionIcons }) {
    let IconVue = icons[icon]
    return <IconVue size={24} color="#3A3A43" />
}
</script>

<template>
    <RouterLink
        :to="props.href"
        class="cursor-pointer flex gap-4 py-3 px-4 rounded-primary transition"
        :class="{ 'bg-baccent': props.active, 'hover:bg-bextra': !props.active }"
    >
        <ResolveIcon :icon="props.icon" />
        <span class="text-fprimary font-semibold text-base">
            <slot />
        </span>
    </RouterLink>
</template>
