import { useState } from 'react';
import { VideoEditor } from '@/components/VideoEditor';
import { Toaster } from '@/components/ui/toaster';
import { Wand2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Modern Video Captions</h1>
          <div className="ml-auto">
            <span className="px-4 py-1.5 bg-amber-400 text-white rounded-full text-sm font-medium shadow-lg">
              Beta
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <VideoEditor />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;