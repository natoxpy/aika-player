export class Music { }

export class laylist { }

/// Music context stores the upcoming music, and everything to do with music management
export class MusicContext {
  index = 0;
  musics: Array<Music> = [];

  playNext() {
    this.index++;
    this.play();
  }

  play() {

  }

  playPrevious() {
    this.index--;
    this.play();
  }

  shuffe() {
    this.index = 0;
    this.play();
  }
}
