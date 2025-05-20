
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, ListChecks, FileText, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RiskDisplayProps {
  strokeRiskScore?: number;
  explanation?: string;
  recommendations?: string;
  error?: string;
}

function getRiskLevel(score: number): { level: string; color: string, variant: "default" | "secondary" | "destructive" | "outline" } {
  if (score < 30) return { level: "Low", color: "bg-green-500", variant: "default" };
  if (score < 60) return { level: "Medium", color: "bg-yellow-500", variant: "secondary" };
  return { level: "High", color: "bg-red-500", variant: "destructive" };
}


export function RiskDisplay({ strokeRiskScore, explanation, recommendations, error }: RiskDisplayProps) {
  if (error) {
    return (
      <Card className="border-destructive bg-destructive/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-6 w-6" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (strokeRiskScore === undefined && !explanation && !recommendations) {
    return null; // Don't render anything if no data and no error
  }
  
  const risk = strokeRiskScore !== undefined ? getRiskLevel(strokeRiskScore) : null;

  return (
    <div className="space-y-6">
      {strokeRiskScore !== undefined && risk && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <Zap className="mr-2 h-6 w-6" />
              Stroke Risk Assessment
            </CardTitle>
            <CardDescription>Your estimated stroke risk based on the provided data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Risk Score:</span>
              <span className="text-3xl font-bold" style={{ color: risk.color.replace('bg-', 'text-') }}>{strokeRiskScore}%</span>
            </div>
            <Progress value={strokeRiskScore} className="h-4 [&>div]:bg-primary" />
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Risk Level:</span>
              <Badge variant={risk.variant} className={`px-4 py-1 text-lg ${risk.color} text-white`}>{risk.level}</Badge>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              This is a mock risk score for demonstration purposes. Consult a healthcare professional for an accurate assessment.
            </p>
          </CardContent>
        </Card>
      )}

      {explanation && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <FileText className="mr-2 h-6 w-6" />
              Risk Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-line">{explanation}</p>
          </CardContent>
        </Card>
      )}

      {recommendations && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-primary">
              <ListChecks className="mr-2 h-6 w-6" />
              Preventive Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-foreground leading-relaxed whitespace-pre-line">
              {recommendations.split('\n').map((rec, index) => rec.trim() && <li key={index}>{rec.replace(/^- /, '')}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
