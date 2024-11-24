import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SubtitleStyle } from '@/types/subtitle';
import { Check } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: SubtitleStyle;
  onStyleSelect: (style: SubtitleStyle) => void;
}

const subtitleStyles: SubtitleStyle[] = [
  {
    id: 'default',
    name: 'Default',
    css: `
      font-family: Arial;
      font-size: 20px;
      color: white;
      text-shadow: 2px 2px 2px black;
    `
  },
  {
    id: 'minimal',
    name: 'Minimal',
    css: `
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 18px;
      color: white;
      background: rgba(0, 0, 0, 0.6);
      padding: 4px 8px;
      border-radius: 4px;
    `
  },
  {
    id: 'netflix',
    name: 'Netflix Style',
    css: `
      font-family: Netflix Sans, Arial;
      font-size: 22px;
      color: white;
      background: rgba(0, 0, 0, 0.75);
      padding: 4px 8px;
      border-radius: 2px;
      letter-spacing: 0.5px;
    `
  },
  {
    id: 'youtube',
    name: 'YouTube Style',
    css: `
      font-family: Roboto, Arial;
      font-size: 20px;
      color: white;
      background: rgba(0, 0, 0, 0.8);
      padding: 2px 6px;
      border-radius: 3px;
      text-shadow: 0 0 2px black;
    `
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    css: `
      font-family: Georgia, serif;
      font-size: 24px;
      color: #ffffff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.6);
      letter-spacing: 1px;
      font-weight: 500;
    `
  }
];

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex flex-col items-center gap-2 group">
          <div className="p-4 bg-purple-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-6 h-6 text-white">Aa</div>
          </div>
          <span className="text-sm text-slate-600 font-medium">Style</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="space-y-2">
          {subtitleStyles.map((style) => (
            <button
              key={style.id}
              className={`
                w-full flex items-center gap-2 p-3 rounded-lg transition-colors
                ${selectedStyle.id === style.id 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'hover:bg-gray-50'
                }
              `}
              onClick={() => onStyleSelect(style)}
            >
              <div className="flex-1 text-left">
                <p className="font-medium">{style.name}</p>
              </div>
              {selectedStyle.id === style.id && (
                <Check className="w-4 h-4 text-purple-500" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}