import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import { SubtitleStyle } from '../types/subtitle';

interface VideoPlayerProps {
  videoFile: File;
  subtitleStyle: SubtitleStyle;
}

export function VideoPlayer({ videoFile, subtitleStyle }: VideoPlayerProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('aspect-video');

  useEffect(() => {
    // Detect video dimensions and set appropriate aspect ratio
    if (videoFile) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const ratio = video.videoWidth / video.videoHeight;
        // If video is vertical (9:16 or similar)
        if (ratio < 1) {
          setAspectRatio('aspect-[9/16]');
        } else {
          setAspectRatio('aspect-video'); // Default 16:9
        }
        URL.revokeObjectURL(video.src);
      };
      video.src = URL.createObjectURL(videoFile);
    }

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoContainerRef.current?.appendChild(videoElement);

      const player = videojs(videoElement, {
        controls: true,
        fluid: true,
        html5: {
          vhs: {
            overrideNative: false
          },
          nativeAudioTracks: true,
          nativeVideoTracks: true,
          nativeTextTracks: true
        },
        controlBar: {
          children: [
            'playToggle',
            'volumePanel',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'fullscreenToggle',
          ]
        }
      });

      playerRef.current = player;

      // Add subtitles track
      player.addRemoteTextTrack({
        kind: 'subtitles',
        src: 'src/subtitles.vtt',
        srclang: 'en',
        label: 'English',
        default: true,
        mode: 'showing'
      }, true);

      // Enable subtitles using the Video.js API
      const vjsPlayer = player as any;
      if (vjsPlayer.remoteTextTracks && vjsPlayer.remoteTextTracks()) {
        const tracks = vjsPlayer.remoteTextTracks();
        if (tracks && tracks.length > 0) {
          const subtitleTrack = tracks[0];
          if (subtitleTrack) {
            subtitleTrack.mode = 'showing';
          }
        }
      }
    }

    // Update video source when file changes
    if (playerRef.current && videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      playerRef.current.src({ src: videoUrl, type: videoFile.type });
    }

    // Apply subtitle styles with higher specificity
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .video-js {
        font-family: inherit;
      }
      .video-js .vjs-control-bar {
        background-color: rgba(0, 0, 0, 0.7);
      }
      .video-js .vjs-big-play-button {
        background-color: rgba(0, 0, 0, 0.6);
        border-color: white;
      }
      /* Higher specificity for text track styles */
      .video-js.vjs-text-track-display div,
      .video-js .vjs-text-track-display div,
      .video-js .vjs-text-track-cue div {
        ${subtitleStyle.css}
        position: absolute !important;
        width: 90% !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        bottom: 10% !important;
      }
      /* Ensure cue background is not overridden */
      .video-js .vjs-text-track-cue > div {
        background-color: transparent !important;
        padding: 0.2em 0.5em !important;
        margin: 0 !important;
        white-space: pre-wrap !important;
      }
      .video-js .vjs-play-control {
        color: white !important;
      }
      .video-js .vjs-volume-panel {
        color: white !important;
      }
      .video-js .vjs-slider {
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      .video-js .vjs-volume-level,
      .video-js .vjs-play-progress {
        background-color: white !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Apply styles directly to text track elements when they're added
    const applyStylesToTextTracks = () => {
      const textTrackDisplay = document.querySelector('.vjs-text-track-display');
      if (textTrackDisplay) {
        const textTrackElements = textTrackDisplay.querySelectorAll('.vjs-text-track-cue');
        textTrackElements.forEach(element => {
          const div = element.querySelector('div');
          if (div) {
            Object.assign(div.style, {
              ...getCSSProperties(subtitleStyle.css),
              position: 'absolute',
              width: '90%',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '10%'
            });
          }
        });
      }
    };

    // Apply styles whenever subtitles appear
    const observer = new MutationObserver(applyStylesToTextTracks);
    const textTrackDisplay = document.querySelector('.vjs-text-track-display');
    if (textTrackDisplay) {
      observer.observe(textTrackDisplay, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      styleElement.remove();
      observer.disconnect();
    };
  }, [videoFile, subtitleStyle]);

  // Helper function to parse CSS string into object
  function getCSSProperties(cssString: string) {
    const style: { [key: string]: string } = {};
    const declarations = cssString.split(';');
    declarations.forEach(declaration => {
      const [property, value] = declaration.split(':').map(str => str.trim());
      if (property && value) {
        style[property] = value;
      }
    });
    return style;
  }

  return (
    <div className={`relative ${aspectRatio} bg-slate-900 rounded-2xl overflow-hidden shadow-lg`}>
      <div data-vjs-player>
        <div ref={videoContainerRef} className="video-js w-full h-full" />
      </div>
    </div>
  );
}
