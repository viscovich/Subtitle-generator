import { FileVideo, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export interface FileStatus {
  name: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

interface FileProcessingListProps {
  files: FileStatus[];
}

export function FileProcessingList({ files }: FileProcessingListProps) {
  if (files.length === 0) return null;

  return (
    <Card className="divide-y divide-gray-200 dark:divide-gray-700">
      {files.map((file, index) => (
        <div key={index} className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileVideo className="w-5 h-5 text-gray-500" />
              <span className="font-medium">{file.name}</span>
            </div>
            {file.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : file.status === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : null}
          </div>
          <div className="space-y-2">
            <Progress value={file.progress} />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                {file.status === 'uploading' && 'Uploading...'}
                {file.status === 'processing' && 'Processing...'}
                {file.status === 'completed' && 'Ready to download'}
                {file.status === 'error' && 'Error processing file'}
              </span>
              <span>{file.progress}%</span>
            </div>
          </div>
          {file.status === 'completed' && (
            <Button size="sm" className="w-full">
              Download Subtitles
            </Button>
          )}
        </div>
      ))}
    </Card>
  );
}