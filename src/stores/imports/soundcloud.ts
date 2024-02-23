import Fuse from "fuse.js";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createImage } from "../api/";
import {
	type Artist,
	getArtists,
	getAvatar,
	getDefaultAvatar,
} from "../api/crud/artists";
import { uploadFromUrl } from "../api/fs/upload";
import {
	type SoundcloudImportMusic,
	previewFromUrl,
} from "../api/import/soundcloud";
import {
	getAlbums,
	type Album,
	getAlbumDefaultCover,
} from "../api/crud/albums";

export async function uploadImageFromUrl(url: string) {
	const file = await uploadFromUrl(url);
	return {
		image: await createImage(file.id),
		file,
	};
}

export type ArtistsMeta = Artist & {
	avatar_url: string;
	featured?: boolean;
	existedInDB: boolean;
};

export type AlbumsMeta = Album & {
	cover_url: string;
	selected?: boolean;
	existedInDB: boolean;
};

/* TODO:!
 *  * This store holds too much responsability,
 * it should be split into multiple stores.
 * this will be a BREAKING change, should be done
 * in a separate branch.
 */
export const useSoundcloudImport = defineStore("soundcloud_imports", () => {
	const musics = ref<Map<string, string>>(new Map());
	const urls = ref<Map<string, string>>(new Map());
	/* INFO:
	 * First element {string} is the ID of the artist
	 * Second element {boolean} is to identify the artists {false} and the featured artists {true}
	 * Third element {boolean} is to know if the artists mentioned exists in {true} the DB or not {false}.
	 *   - Useful to add new artists without updating the database immediately
	 * */
	const artists = ref<Map<string, Array<[string, boolean, boolean]>>>(
		new Map(),
	);

	/* INFO:
	 * Key element {string} artist temporary UUID v4
	 * Value element {string} artist name
	 */
	const artistsNotIndb = ref<Map<string, string>>(new Map());

	/* INFO:
	 * Key element {string} album temporary UUID v4
	 * Value element {string} album name
	 */
	const albumsNotIndb = ref<Map<string, string>>(new Map());
	const albums = ref<Map<string, Array<[string, boolean]>>>(new Map());
	const covers = ref<Map<string, string>>(new Map());
	/* INFO:
	 * ArrayBuffers are used to store image data
	 * If a music has an element here, the image must be user upload
	 */
	const imageArrayBuffers = ref<Map<string, ArrayBuffer>>(new Map());

	const sessionId = ref<string>();
	const importing = ref<Set<string>>(new Set());

	const updateTitle = (id: string, title: string) => {
		musics.value.set(id, title);
	};

	const addImportFromUrl = async (url: string) => {
		const importId = crypto.randomUUID();
		importing.value.add(importId);

		checkSession();
		const track = await previewFromUrl(url);
		const musicId = crypto.randomUUID();

		urls.value.set(musicId, track.url);
		musics.value.set(musicId, track.title);
		artists.value.set(musicId, []);
		albums.value.set(musicId, []);
		covers.value.set(musicId, track.thumbnail);

		importing.value.delete(importId);
	};

	const allArtistsMemoized = computed(async () => {
		sessionId.value === undefined;
		const artists: ArtistsMeta[] = [];
		const apiArtists = await getArtists();

		for (const artist of apiArtists) {
			const avatar_url = await getAvatar(artist.id);

			artists.push({
				avatar_url,
				existedInDB: true,
				...artist,
			});
		}

		return artists;
	});

	const allArtists = async () => {
		const artists = Array.from(await allArtistsMemoized.value);

		for (const artist of artistsNotIndb.value.entries()) {
			artists.push({
				id: artist[0],
				name: artist[1],
				avatar_url: getDefaultAvatar(),
				existedInDB: false,
			});
		}

		return artists;
	};

	const allAlbumsMemoized = computed(async () => {
		sessionId.value === undefined;
		const albums: AlbumsMeta[] = [];
		const apiAlbums = await getAlbums();

		for (const album of apiAlbums) {
			albums.push({
				cover_url: getAlbumDefaultCover(),
				existedInDB: true,
				...album,
			});
		}

		return albums;
	});

	const allAlbums = async () => {
		const albums = Array.from(await allAlbumsMemoized.value);

		for (const album of albumsNotIndb.value.entries()) {
			albums.push({
				id: album[0],
				name: album[1],
				cover_url: getDefaultAvatar(),
				existedInDB: false,
			});
		}

		return albums;
	};

	const localGetAlbum = async (albumId: string, existsIndb = true) => {
		const albums = await allAlbums();
		let album = albums.find((item) => item.id === albumId) as AlbumsMeta;

		if (album === undefined && existsIndb === false) {
			album = {
				name: albumsNotIndb.value.get(albumId) ?? "",
				id: albumId,
				cover_url: getAlbumDefaultCover(),
				existedInDB: false,
			};
		}

		return album;
	};

	const localGetArtist = async (artistId: string, existsIndb = true) => {
		const artists = await allArtists();

		let artist = artists.find((item) => item.id === artistId);
		if (artist === undefined && existsIndb === false)
			artist = {
				name: artistsNotIndb.value.get(artistId) ?? "",
				id: artistId,
				avatar_url: getDefaultAvatar(),
				existedInDB: false,
			};

		return artist as ArtistsMeta;
	};
	const checkSession = () => {
		if (sessionId.value !== undefined) sessionId.value = crypto.randomUUID();
	};

	return {
		musics,
		artists,
		albums,
		covers,
		importing,
		addImportFromUrl,
		updateTitle,
		newSession: checkSession,

		setImageArrayBuffer: (musicId: string, arrayBuffer: ArrayBuffer) => {
			const blob = new Blob([arrayBuffer]);
			imageArrayBuffers.value.set(musicId, arrayBuffer);
			covers.value.set(musicId, URL.createObjectURL(blob));
		},

		clear: () => {
			urls.value.clear();
			musics.value.clear();
			artists.value.clear();
			albums.value.clear();
			covers.value.clear();
			imageArrayBuffers.value.clear();

			sessionId.value = undefined;
		},

		addNewArtist: (name: string) => {
			const id = crypto.randomUUID();
			artistsNotIndb.value.set(id, name);
			return id;
		},

		addNewAlbums: (name: string) => {
			const id = crypto.randomUUID();
			albumsNotIndb.value.set(id, name);
			return id;
		},

		getAll: () => {
			const importMusics: SoundcloudImportMusic[] = [];

			for (const [musicId, title] of musics.value.entries()) {
				const artistList = (artists.value.get(musicId) ?? [])
					.filter((item) => item[1] === false && item[2] === true)
					.map((item) => item[0]);

				const featuredArtistList = (artists.value.get(musicId) ?? [])
					.filter((item) => item[1] === true && item[2] === true)
					.map((item) => item[0]);

				const albumList = (albums.value.get(musicId) ?? [])
					.filter((item) => item[1] === false)
					.map((item) => item[0]);

				const soundcloud_url = urls.value.get(musicId) ?? "";
				const coverUrl = covers.value.get(musicId) ?? "";

				const artistListNoIndb = (artists.value.get(musicId) ?? [])
					.filter((item) => item[1] === false && item[2] === false)
					.map((item) => item[0]);

				const featuredArtistListNotIndb = (artists.value.get(musicId) ?? [])
					.filter((item) => item[1] === true && item[2] === false)
					.map((item) => item[0]);

        const imageArrayBuffer = imageArrayBuffers.value.get(musicId);

				const albumListNoIndb = Array.from(albumsNotIndb.value.values());

				importMusics.push({
					title,
					image_src: coverUrl,
          image_array_buffer: imageArrayBuffer, 
					artists_id: artistList,
					featured_artists_id: featuredArtistList,
					albums_id: albumList,
					soundcloud_url,
					artists_not_in_db: artistListNoIndb,
					featured_artists_not_in_db: featuredArtistListNotIndb,
					albums_not_in_db: albumListNoIndb,

				});
			}

			return importMusics;
		},

		hasArtist: (musicId: string, artistId: string) => {
			const artistList = artists.value.get(musicId) ?? [];
			return artistList.findIndex((itm) => itm[0] === artistId) !== -1;
		},

		setArtist: (musicId: string, artistId: string, feat = false) => {
			const artistList = artists.value.get(musicId) ?? [];
			const artistIdx = artistList.findIndex((itm) => itm[0] === artistId);

			artistList[artistIdx][0] = artistId;
			artistList[artistIdx][1] = feat;

			artists.value.set(musicId, artistList);
		},

		removeArtist: (musicId: string, artistId: string) => {
			const artistList = artists.value.get(musicId) ?? [];
			const newArtistList = artistList.filter((itm) => itm[0] !== artistId);

			artists.value.set(musicId, newArtistList);
		},

		addArtist: (
			musicId: string,
			artistId: string,
			featured = false,
			existsIndb = true,
		) => {
			checkSession();

			const artistList = artists.value.get(musicId) ?? [];
			artists.value.set(musicId, artistList);
			artistList.push([artistId, featured, existsIndb]);
		},

		getArtistsForSelector: async (music_id: string, filter?: string) => {
			const artistsMeta: ArtistsMeta[] = [];

			const artistList = artists.value.get(music_id) ?? [];
			const used = new Set();

			for (const [artist_id, feat, existsIndb] of artistList) {
				used.add(artist_id);

				const artist = await localGetArtist(artist_id, !existsIndb);

				artistsMeta.push({
					featured: feat,
					...artist,
				});
			}

			artistsMeta.sort((a, b) => {
				if (!a.featured && b.featured === true) return -1;
				if (a.featured === true && !b.featured) return 1;
				return 0;
			});

			const apiArtists = (await allArtists()).filter(
				(item) => !used.has(item.id),
			);

			apiArtists.sort((a, b) => {
				if (a.existedInDB === true && b.existedInDB === false) return 1;
				if (a.existedInDB === false && b.existedInDB === true) return -1;
				return 0;
			});

			if (filter === undefined || filter.trim() === "") {
				for (const artist of apiArtists) {
					artistsMeta.push({
						featured: undefined,
						...artist,
					});
				}
			} else {
				const fuse = new Fuse(apiArtists, { keys: ["name"] });

				for (const result of fuse.search(filter)) {
					const artist = result.item;

					artistsMeta.push({
						featured: undefined,
						...artist,
					});
				}
			}

			return artistsMeta.slice(0, used.size + 4);
		},

		getArtists: async (id: string) => {
			const artistsMeta: ArtistsMeta[] = [];
			const artistsFeatMeta: ArtistsMeta[] = [];

			const artistList = artists.value.get(id) ?? [];

			for (const [artist_id, feat] of artistList) {
				const artist = await localGetArtist(artist_id);

				const data = {
					featured: feat,
					...artist,
				};

				if (!feat) artistsMeta.push(data);
				else artistsFeatMeta.push(data);
			}

			return [artistsMeta, artistsFeatMeta];
		},

		hasAlbum: (musicId: string, albumId: string) => {
			const albumList = albums.value.get(musicId) ?? [];
			return albumList.findIndex((itm) => itm[0] === albumId) !== -1;
		},

		removeAlbum: (musicId: string, albumId: string) => {
			const albumList = albums.value.get(musicId) ?? [];
			const newAlbumList = albumList.filter((itm) => itm[0] !== albumId);
			albums.value.set(musicId, newAlbumList);
		},

		addAlbum: (musicId: string, albumId: string, existsIndb = true) => {
			const artistList = albums.value.get(musicId) ?? [];
			artistList.push([albumId, existsIndb]);
		},

		getAlbumsForSelector: async (music_id: string, filter?: string) => {
			const albumsMeta: AlbumsMeta[] = [];

			const albumList = albums.value.get(music_id) ?? [];
			const used = new Set();

			for (const [albumId, existsIndb] of albumList) {
				used.add(albumId);

				const album = await localGetAlbum(albumId, existsIndb);

				albumsMeta.push({
					selected: true,
					...album,
				});
			}

			const apiAlbums = (await allAlbums()).filter(
				(item) => !used.has(item.id),
			);

			apiAlbums.sort((a, b) => {
				if (a.existedInDB === true && b.existedInDB === false) return 1;
				if (a.existedInDB === false && b.existedInDB === true) return -1;
				return 0;
			});

			if (filter === undefined || filter.trim() === "") {
				for (const album of apiAlbums) {
					albumsMeta.push({
						...album,
					});
				}
			} else {
				const fuse = new Fuse(apiAlbums, { keys: ["name"] });

				for (const result of fuse.search(filter)) {
					const album = result.item;

					albumsMeta.push({
						...album,
					});
				}
			}

			return albumsMeta.slice(0, used.size + 4);
		},

		getAlbums: async (id: string) => {
			const albumsMeta: AlbumsMeta[] = [];

			const albumList = albums.value.get(id) ?? [];

			for (const [albumId, existsIndb] of albumList) {
				const album = await localGetAlbum(albumId, existsIndb);

				const data = {
					selected: true,
					...album,
				};

				albumsMeta.push(data);
			}

			return albumsMeta;
		},
	};
});
