<script setup lang="ts">
import BodyTemplate from './templates/body.vue'
import MusicItem from './components/musicItem.vue'

import type { Music as MusicType } from '@/stores/api/index.ts'
import { getMusics } from '@/stores/api/index.ts'
import { onMounted, ref } from 'vue'


const musics = ref<Array<MusicType>>([])

onMounted(async () => {
  musics.value = await getMusics()
})

</script>

<template>
  <BodyTemplate>
    <template #musics>
      <MusicItem v-for="music in musics" :id="music.id" :name="music.name" />

      <!--
      <Music
        v-for="music in musics"
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> {{ music.name }} </template>
      </Music>
      -->

      <!--
      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author>
          <Author>Mili</Author>
        </template>
      </Music>

      <Music cover="http://[::1]:8000/cdn/30305764-14d6-4060-95a5-2eb820cf6357">
        <template #title> Mortal With You </template>
        <template #author>
          <Author> Mili</Author>
        </template>
      </Music>
      -->

      <!--
      <Music cover="https://i.ytimg.com/vi/bJieaH23524/maxresdefault.jpg">
        <template #title> Mortal With You </template>
        <template #author>
          <Author> Mili</Author>
        </template>
      </Music>
      -->

      <!--
      <Music cover="https://i.ytimg.com/vi/XfTWgMgknpY/maxresdefault.jpg">
        <template #title> In Hell We Live, Lament </template>
        <template #author>
          <Author> Mili</Author>
          <AuthorDivider />
          <Author> KIHOW</Author>
        </template>
      </Music>
      -->

      <!--
      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author> Mili </template>
      </Music>

      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author> Mili </template>
      </Music>

      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author> Mili </template>
      </Music>

      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author> Mili </template>
      </Music>

      <Music
        cover="https://cdn.donmai.us/sample/e1/76/__project_moon_and_2_more_drawn_by_ooya_july_26__sample-e1760e2b51c1fd8c5e9699bf165740d1.jpg"
      >
        <template #title> From a place of love </template>
        <template #author> Mili </template>
      </Music>
      -->
    </template>
  </BodyTemplate>
</template>
