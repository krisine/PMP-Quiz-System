import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import html2canvas from 'html2canvas';

interface CompletionCardProps {
  score: number;
  total: number;
  time: string;
}

export function CompletionCard({ score, total, time }: CompletionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'quiz-result.png';
      link.click();
    }
  };

  const percentage = Math.round((score / total) * 100);

  return (
    <Card ref={cardRef} className="w-full max-w-md mx-auto bg-white p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-xl">Your final score: {score} out of {total}</p>
          <p className="text-lg">Time taken: {time}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Accuracy</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <Button onClick={downloadAsImage} className="w-full">
          Download Result
        </Button>
      </CardContent>
    </Card>
  );
}

