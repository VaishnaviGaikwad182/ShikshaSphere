'use client';

import { useState, useTransition, useEffect } from 'react';
import type { SerializableModule, Question, Difficulty } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getNewQuestions, getAdjustedDifficulty } from '@/app/actions';
import { Loader2, Repeat, Trophy, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/data';

type QuizClientProps = {
  module: SerializableModule;
};

export function QuizClient({ module }: QuizClientProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [questions, setQuestions] = useState<Question[]>(module.questions.easy);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when module changes, if this component is reused across modules
    resetQuiz();
  }, [module.id]);

  const loadQuestions = (newDifficulty: Difficulty) => {
    startTransition(async () => {
      const newQuestions = await getNewQuestions({ moduleId: module.id, difficulty: newDifficulty });
      setQuestions(newQuestions);
      setCurrentQuestionIndex(0);
      setDifficulty(newDifficulty);
    });
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const performance = (score + (isCorrect ? 1 : 0)) / questions.length;
      handleQuizEnd(performance);
    }
  };

  const handleQuizEnd = (performance: number) => {
    startTransition(async () => {
      const { newDifficulty, reason } = await getAdjustedDifficulty({
        studentId: currentUser.name,
        currentDifficulty: difficulty,
        performance,
        subject: module.subject,
      });

      toast({
        title: `Difficulty Adjusted to ${newDifficulty.charAt(0).toUpperCase() + newDifficulty.slice(1)}`,
        description: reason,
      });
      
      if (newDifficulty !== difficulty && module.questions[newDifficulty].length > 0) {
        loadQuestions(newDifficulty);
      } else {
        setIsFinished(true);
      }
    });
  };

  const resetQuiz = () => {
    setDifficulty('easy');
    setQuestions(module.questions.easy);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };
  
  if (isPending && questions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold">Loading new challenges...</p>
            <p className="text-muted-foreground">Adapting to your skill level!</p>
        </div>
    );
  }

  if (isFinished) {
    return (
      <div className="text-center p-8">
        <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Module Complete!</h2>
        <p className="text-muted-foreground mb-4">
          You've completed all available questions for this module. Great job!
        </p>
        <p className="text-lg font-medium">Final Score: {score}</p>
        <Button onClick={resetQuiz} className="mt-6">
          <Repeat className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
     return <p>No questions available for this difficulty.</p>
  }
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div>
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold capitalize px-2 py-1 rounded-full bg-primary/10 text-primary">
                    <Zap className="h-4 w-4" />
                    {difficulty}
                </span>
            </div>
            <Progress value={progress} />
        </div>
      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={setSelectedAnswer}
            disabled={isAnswered}
          >
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let stateClass = '';
              if (isAnswered) {
                  if (isCorrect) stateClass = 'border-green-500 bg-green-500/10 text-green-700';
                  else if (isSelected && !isCorrect) stateClass = 'border-red-500 bg-red-500/10 text-red-700';
              }

              return (
              <Label key={index} className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${stateClass} ${!isAnswered && 'hover:border-primary cursor-pointer'}`}>
                <RadioGroupItem value={option} id={`q${currentQuestion.id}-o${index}`} />
                <span>{option}</span>
              </Label>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => isAnswered ? handleNext() : setIsAnswered(true)}
            disabled={!selectedAnswer || isPending}
            className="w-full"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isAnswered ? (currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish") : "Check Answer"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
