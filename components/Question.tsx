import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Question as QuestionType } from '../utils/loadQuestions';
import Image from 'next/image';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (isCorrect: boolean) => void;
  isNewQuestion: boolean;
}

export function Question({ question, onAnswer, isNewQuestion }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (isNewQuestion) {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [isNewQuestion]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      onAnswer(isCorrect);
      setShowExplanation(true);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.imageUrl && (
          <div className="flex justify-center">
            <Image 
              src={question.imageUrl} 
              alt="Question image" 
              width={300} 
              height={200} 
              className="rounded-md"
            />
          </div>
        )}
        <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        {!showExplanation && (
          <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
            Submit Answer
          </Button>
        )}
        {showExplanation && (
          <div className={`mt-4 p-4 rounded-md ${selectedAnswer === question.correctAnswer ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-bold">{selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!'}</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

