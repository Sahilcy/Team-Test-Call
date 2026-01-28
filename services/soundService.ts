
export const SOUNDS = {
  NOTIFICATION: 'https://cdn.pixabay.com/audio/2022/10/14/audio_9939713c8b.mp3', // Messenger-like ping
  RINGTONE: 'https://cdn.pixabay.com/audio/2024/02/09/audio_f535123d24.mp3' // Modern phone ring
};

class SoundService {
  private notificationAudio: HTMLAudioElement;
  private ringtoneAudio: HTMLAudioElement;

  constructor() {
    this.notificationAudio = new Audio(SOUNDS.NOTIFICATION);
    this.ringtoneAudio = new Audio(SOUNDS.RINGTONE);
    this.ringtoneAudio.loop = true;
  }

  playNotification() {
    this.notificationAudio.currentTime = 0;
    this.notificationAudio.play().catch(e => console.debug('Sound blocked by browser policy', e));
  }

  startRingtone() {
    this.ringtoneAudio.currentTime = 0;
    this.ringtoneAudio.play().catch(e => console.debug('Ringtone blocked by browser policy', e));
  }

  stopRingtone() {
    this.ringtoneAudio.pause();
    this.ringtoneAudio.currentTime = 0;
  }
}

export const soundService = new SoundService();
