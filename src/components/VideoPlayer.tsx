import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { SubtitleStyle } from '@/types/subtitle';

interface VideoPlayerProps {
  videoFile: File;
  subtitleStyle: SubtitleStyle;
}

export function VideoPlayer({ videoFile, subtitleStyle }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered', 'vjs-theme-fantasy');
      videoRef.current?.appendChild(videoElement);

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        html5: {
          vhs: {
            overrideNative: true
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false
        },
        controlBar: {
          pictureInPictureToggle: false
        }
      });

      playerRef.current = player;

      // Add subtitles track
      player.addRemoteTextTrack({
        kind: 'captions',
        src: '/src/subtitles.vtt',
        srclang: 'en',
        label: 'English',
        default: true
      }, false);
    }

    // Update video source when file changes
    if (playerRef.current && videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      playerRef.current.src({ src: videoUrl, type: videoFile.type });
    }

    // Apply subtitle styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .video-js .vjs-text-track-display {
        ${subtitleStyle.css}
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      styleElement.remove();
    };
  }, [videoFile, subtitleStyle]);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
      <div data-vjs-player>
        <div ref={videoRef} className="video-js w-full h-full" />
      </div>
    </div>
  );
}