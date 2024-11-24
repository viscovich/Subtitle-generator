import { useDropzone } from 'react-dropzone';
import { Upload, Film } from 'lucide-react';

interface FileUploadZoneProps {
  onFilesAccepted: (files: File[]) => void;
}

export function FileUploadZone({ onFilesAccepted }: FileUploadZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesAccepted,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative overflow-hidden
        border-2 border-dashed rounded-3xl p-12
        flex flex-col items-center justify-center gap-4
        cursor-pointer transition-all duration-200
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-slate-200 hover:border-blue-500 hover:bg-slate-50'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-75" />
        <div className="relative p-4 bg-white rounded-full shadow-xl">
          <Film className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Drop your video here
        </h3>
        <p className="text-slate-500">
          Support for MP4, MOV, AVI, MKV
        </p>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
}