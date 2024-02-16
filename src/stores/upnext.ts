import { defineStore } from "pinia";
import { ref } from "vue";
import type { Music as MusicType } from "@/stores/api/index.ts";
import { getCover, getMusics } from "@/stores/api/index.ts";

export const UpnextStore = defineStore("upnext", () => {
  const holding = ref();
  const holdingOver = ref();

  const musics = ref([
    {
      cover: "http://[::1]:8000/cdn/74fa2580-2d31-4364-adcc-96575171cffa",
      title: "From a Place of Love",
    },
    {
      cover: "https://i.ytimg.com/vi/bJieaH23524/maxresdefault.jpg",
      title: "Mortal With You",
    },
    {
      cover: "https://i.ytimg.com/vi/F8duD1MBrBY/maxresdefault.jpg",
      title: "Static",
    },
    {
      cover: "https://i.ytimg.com/vi/XfTWgMgknpY/maxresdefault.jpg",
      title: "In Hell We Live, Lament",
    },
    {
      cover: "https://i.ytimg.com/vi/IYiHNzFoA8g/maxresdefault.jpg",
      title: "My Creator",
    },
    {
      cover: "https://i.ytimg.com/vi/1Hsj3oYhsbk/maxresdefault.jpg",
      title: "Sleep talk metropolis",
    },
  ]);

  musics.value = [];
  (async () => {
    const items = [];
    for (const item of await getMusics()) {
      const title = item.name;
      const cover = await getCover(item.id);
      items.push({ title, cover });
    }
    musics.value = items;
  })();

  const reinsertAt = (item_idx: number, location_idx: number) => {
    const item = musics.value.find((_, i) => i === item_idx);
    let items: any[] = musics.value;
    items = items.filter((_, i) => i !== item_idx);

    if (item === undefined) return;

    items = [
      ...items.slice(0, location_idx),
      item,
      ...items.slice(location_idx),
    ];

    musics.value = items;
  };

  return {
    musics,
    holding,
    holdingOver,
    reinsertAt,
    setHolding: (arg: any) => (holding.value = arg),
    setHoldingOver: (arg: any) => (holdingOver.value = arg),
  };
});
