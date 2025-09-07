"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, Plus } from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Complete 3 courses this month",
    progress: 67,
    current: 2,
    target: 3,
  },
  {
    id: 2,
    title: "Study 20 hours this week",
    progress: 85,
    current: 17,
    target: 20,
  },
  {
    id: 3,
    title: "Earn 2 certificates",
    progress: 50,
    current: 1,
    target: 2,
  },
]

export function LearningGoals() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Learning Goals
        </CardTitle>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium line-clamp-1">{goal.title}</span>
              <span className="text-muted-foreground">
                {goal.current}/{goal.target}
              </span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
