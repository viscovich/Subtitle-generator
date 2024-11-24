export function VideoTimeline() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-slate-500">
        <span>00:00</span>
        <span>03:45</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full relative">
        <div 
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
        />
        <div 
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-pointer"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <div className="flex-1 h-8 bg-slate-100 rounded-xl" />
        <div className="flex-1 h-8 bg-amber-400 rounded-xl" />
        <div className="flex-1 h-8 bg-slate-100 rounded-xl" />
        <div className="flex-1 h-8 bg-amber-400 rounded-xl" />
      </div>
    </div>
  );
}