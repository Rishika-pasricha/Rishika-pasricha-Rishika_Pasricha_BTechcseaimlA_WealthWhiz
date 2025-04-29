import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRight, Check, AlertTriangle, Landmark, PiggyBank, LineChart as LineChartIcon, BarChart3 } from "lucide-react";

interface FinancialData {
  monthlyIncome: number;
  expenses: {
    rent: number;
    utilities: number;
    groceries: number;
    transportation: number;
    miscellaneous: number;
  };
  currentSavings: number;
  currentInvestments: number;
  retirementGoal: number;
  riskTolerance: string;
  investmentTimeframe: number;
}

interface FinancialRecommendationsProps {
  data: FinancialData;
}

const FinancialRecommendations = ({ data }: FinancialRecommendationsProps) => {
  const monthlySavings = data.monthlyIncome - Object.values(data.expenses).reduce((sum, expense) => sum + expense, 0);
  const conservativeInvestment = data.currentInvestments * 0.03;
  const moderateInvestment = data.currentInvestments * 0.07;
  const aggressiveInvestment = data.currentInvestments * 0.12;

  const riskToleranceMessage = () => {
    switch (data.riskTolerance) {
      case "conservative":
        return "Given your conservative risk tolerance, consider low-risk investments such as government bonds or fixed deposits.";
      case "moderate":
        return "With a moderate risk tolerance, a balanced portfolio of stocks and bonds may be suitable.";
      case "aggressive":
        return "Considering your aggressive risk tolerance, explore high-growth investments like stocks and real estate.";
      default:
        return "Consider diversifying your investments based on your risk tolerance.";
    }
  };

  const savingsRateMessage = () => {
    const savingsRate = (monthlySavings / data.monthlyIncome) * 100;
    if (savingsRate < 10) {
      return "Your savings rate is below 10%. Consider increasing your savings to at least 15% of your income.";
    } else if (savingsRate < 20) {
      return "Your savings rate is between 10% and 20%. Aim to increase it further for better financial security.";
    } else {
      return "Your savings rate is excellent! Keep up the good work to achieve your financial goals.";
    }
  };

  const emergencyFundMessage = () => {
    const totalExpenses = Object.values(data.expenses).reduce((sum, expense) => sum + expense, 0);
    const emergencyFund = data.currentSavings;

    if (emergencyFund < totalExpenses * 3) {
      return "Your emergency fund is less than 3 months of expenses. Aim to save at least 3-6 months of expenses for unexpected events.";
    } else if (emergencyFund < totalExpenses * 6) {
      return "Your emergency fund covers 3-6 months of expenses. Consider increasing it to 6-12 months for better security.";
    } else {
      return "Your emergency fund is well-funded! You have enough savings to cover 6-12 months of expenses.";
    }
  };

  const investmentTimeframeMessage = () => {
    if (data.investmentTimeframe < 10) {
      return "With a short investment timeframe, focus on low-risk investments to preserve capital.";
    } else if (data.investmentTimeframe < 20) {
      return "With a medium investment timeframe, consider a mix of growth and value investments.";
    } else {
      return "With a long investment timeframe, explore growth-oriented investments for higher returns.";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-finance-primary mb-4">
            Personalized Financial Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-finance-secondary flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" /> Risk Tolerance
            </h3>
            <p className="text-muted-foreground">{riskToleranceMessage()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-finance-secondary flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" /> Savings Rate
            </h3>
            <p className="text-muted-foreground">{savingsRateMessage()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-finance-secondary flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" /> Emergency Fund
            </h3>
            <p className="text-muted-foreground">{emergencyFundMessage()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-finance-secondary flex items-center gap-2">
              <Landmark className="h-5 w-5 text-blue-500" /> Investment Timeframe
            </h3>
            <p className="text-muted-foreground">{investmentTimeframeMessage()}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-finance-secondary flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-purple-500" /> Investment Options
            </h3>
            <p className="text-muted-foreground">
              Based on your current investments, consider the following options:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Conservative Investments: Estimated return of 3% - ₹{conservativeInvestment.toFixed(2)} annually.
              </li>
              <li>
                Moderate Investments: Estimated return of 7% - ₹{moderateInvestment.toFixed(2)} annually.
              </li>
              <li>
                Aggressive Investments: Estimated return of 12% - ₹{aggressiveInvestment.toFixed(2)} annually.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialRecommendations;
