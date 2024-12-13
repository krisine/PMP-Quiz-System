import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatisticsProps {
  correct: number;
  total: number;
}

export function Statistics({ correct, total }: StatisticsProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quiz Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Correct Answers</p>
            <p className="text-xl font-bold">{correct} / {total}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xl font-bold">{percentage}%</p>
          </div>
        </div>
        <div className="w-full bg-secondary mt-2 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}

