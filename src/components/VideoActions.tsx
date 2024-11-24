import {
  Languages,
  Clock,
  Type,
  Settings2,
  Image,
  Share2,
  Download
} from 'lucide-react';
import { StyleSelector } from './StyleSelector';
import { SubtitleStyle } from '@/types/subtitle';

interface VideoActionsProps {
  onStyleChange: (style: SubtitleStyle) => void;
  currentStyle: SubtitleStyle;
}

export function VideoActions({ onStyleChange, currentStyle }: VideoActionsProps) {
  const handleExport = () => {
    // Here you would generate the final subtitle file with applied styles
    const link = document.createElement('a');
    link.href = '/src/subtitles.vtt';
    link.download = 'subtitles.vtt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      <button className="flex flex-col items-center gap-2 group">
        <div className="p-4 bg-blue-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Languages className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Language</span>
      </button>

      <StyleSelector selectedStyle={currentStyle} onStyleSelect={onStyleChange} />

      <button className="flex flex-col items-center gap-2 group">
        <div className="p-4 bg-amber-400 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Timing</span>
      </button>

      <button className="flex flex-col items-center gap-2 group">
        <div className="p-4 bg-green-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Type className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Font</span>
      </button>

      <button className="flex flex-col items-center gap-2 group">
        <div className="p-4 bg-slate-700 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Settings2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Settings</span>
      </button>

      <button 
        className="flex flex-col items-center gap-2 group"
        onClick={handleExport}
      >
        <div className="p-4 bg-indigo-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Download className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Export</span>
      </button>

      <button className="flex flex-col items-center gap-2 group">
        <div className="p-4 bg-rose-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Share</span>
      </button>
    </div>
  );
}