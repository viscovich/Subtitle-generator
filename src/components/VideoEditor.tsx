import { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoControls } from './VideoControls';
import { VideoTimeline } from './VideoTimeline';
import { VideoActions } from './VideoActions';
import { FileUploadZone } from './FileUploadZone';
import { SubtitleStyle } from '@/types/subtitle';

export function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleStyle, setSubtitleStyle] = useState<SubtitleStyle>({
    id: 'default',
    name: 'Default',
    css: `
      font-family: Arial;
      font-size: 20px;
      color: white;
      text-shadow: 2px 2px 2px black;
    `
  });

  const handleFileAccepted = (files: File[]) => {
    if (files.length > 0) {
      setVideoFile(files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {!videoFile ? (
        <FileUploadZone onFilesAccepted={handleFileAccepted} />
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-video">
            <VideoPlayer videoFile={videoFile} subtitleStyle={subtitleStyle} />
          </div>
          <VideoControls />
          <VideoTimeline />
          <VideoActions onStyleChange={setSubtitleStyle} currentStyle={subtitleStyle} />
        </div>
      )}
    </div>
  );
}