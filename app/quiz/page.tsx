"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ValidatedInput } from "@/components/validated-input"
import { useFormValidation } from "@/hooks/use-form-validation"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock } from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    type: "multiple-choice" as const,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    type: "multiple-choice" as const,
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color", "foreground-color"],
    correctAnswer: 2,
  },
  {
    id: 3,
    type: "text" as const,
    question: "What JavaScript method is used to add an element to the end of an array?",
    correctAnswer: "push",
  },
  {
    id: 4,
    type: "multiple-choice" as const,
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 1,
  },
]

const validationRules = {
  textAnswer: {
    required: true,
    minLength: 1,
  },
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  const { errors, validateField, clearError } = useFormValidation(validationRules)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
    clearError("textAnswer")
  }

  const handleNext = () => {
    if (question.type === "text") {
      const answer = answers[question.id] || ""
      const error = validateField("textAnswer", answer)
      if (error) return
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let correctAnswers = 0

    quizQuestions.forEach((q) => {
      const userAnswer = answers[q.id]
      if (q.type === "multiple-choice") {
        if (Number.parseInt(userAnswer) === q.correctAnswer) {
          correctAnswers++
        }
      } else if (q.type === "text") {
        if (userAnswer?.toLowerCase().trim() === q.correctAnswer.toLowerCase()) {
          correctAnswers++
        }
      }
    })

    setScore(correctAnswers)
    setSubmitted(true)
  }

  const isAnswered = answers[question.id] !== undefined && answers[question.id] !== ""
  const canProceed = question.type === "text" ? isAnswered && !errors.textAnswer : isAnswered

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary">
                {score}/{quizQuestions.length}
              </div>
              <p className="text-xl">You scored {Math.round((score / quizQuestions.length) * 100)}%</p>
              <div className="space-y-2">
                {score === quizQuestions.length && (
                  <div className="flex items-center justify-center text-green-600">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Perfect Score! Excellent work!
                  </div>
                )}
                {score >= quizQuestions.length * 0.7 && score < quizQuestions.length && (
                  <div className="flex items-center justify-center text-blue-600">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Great job! You passed the quiz.
                  </div>
                )}
                {score < quizQuestions.length * 0.7 && (
                  <div className="flex items-center justify-center text-orange-600">
                    <XCircle className="mr-2 h-5 w-5" />
                    Keep studying and try again!
                  </div>
                )}
              </div>
              <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quiz Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Web Development Quiz</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardHeader>
          </Card>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.type === "multiple-choice" ? (
                <RadioGroup value={answers[question.id] || ""} onValueChange={(value) => handleAnswerChange(value)}>
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <ValidatedInput
                  placeholder="Type your answer here..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  onValidate={(value) => validateField("textAnswer", value)}
                  error={errors.textAnswer}
                  validateOnBlur
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="bg-transparent"
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={!canProceed}>
              {currentQuestion === quizQuestions.length - 1 ? "Submit Quiz" : "Next Question"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
