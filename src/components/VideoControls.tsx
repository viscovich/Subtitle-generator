import { 
  Volume2, 
  SkipBack, 
  Play, 
  SkipForward, 
  Settings 
} from 'lucide-react';

export function VideoControls() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          <Volume2 className="w-5 h-5 text-slate-700" />
        </button>
        <div className="w-32 h-1 bg-slate-200 rounded-full">
          <div className="w-1/2 h-full bg-blue-500 rounded-full" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          <SkipBack className="w-5 h-5 text-slate-700" />
        </button>
        <button className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors">
          <Play className="w-6 h-6 text-white" fill="white" />
        </button>
        <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          <SkipForward className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
        <Settings className="w-5 h-5 text-slate-700" />
      </button>
    </div>
  );
}