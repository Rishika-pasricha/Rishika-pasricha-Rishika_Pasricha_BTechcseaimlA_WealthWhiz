
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { BadgeIndianRupee } from "lucide-react";

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

interface FinancialInputFormProps {
  onSubmit: (data: FinancialData) => void;
}

const FinancialInputForm = ({ onSubmit }: FinancialInputFormProps) => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthlyIncome: 5000,
    expenses: {
      rent: 1500,
      utilities: 200,
      groceries: 400,
      transportation: 300,
      miscellaneous: 500,
    },
    currentSavings: 10000,
    currentInvestments: 20000,
    retirementGoal: 1000000,
    riskTolerance: "moderate",
    investmentTimeframe: 25,
  });

  const handleChange = (field: string, value: number | string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFinancialData({
        ...financialData,
        [parent]: {
          ...(financialData[parent as keyof typeof financialData] as object),
          [child]: Number(value),
        },
      });
    } else {
      setFinancialData({
        ...financialData,
        [field]: typeof value === "string" ? value : Number(value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(financialData);
    toast.success("Financial data updated successfully!");
  };

  const totalExpenses = Object.values(financialData.expenses).reduce(
    (sum, expense) => sum + expense,
    0
  );
  const monthlySavings = financialData.monthlyIncome - totalExpenses;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="income">Income & Expenses</TabsTrigger>
          <TabsTrigger value="savings">Savings & Investments</TabsTrigger>
          <TabsTrigger value="goals">Financial Goals</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Income & Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (After Tax)</Label>
                <div className="flex items-center mt-2">
                  <span className="text-muted-foreground mr-2">₹</span>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={financialData.monthlyIncome}
                    onChange={(e) => handleChange("monthlyIncome", e.target.valueAsNumber || 0)}
                    className="finance-input"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-finance-secondary">Monthly Expenses</h3>
                
                <div>
                  <Label htmlFor="rent">Rent/Mortgage</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-muted-foreground mr-2">₹</span>
                    <Input
                      id="rent"
                      type="number"
                      value={financialData.expenses.rent}
                      onChange={(e) => handleChange("expenses.rent", e.target.valueAsNumber || 0)}
                      className="finance-input"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="utilities">Utilities</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-muted-foreground mr-2">₹</span>
                    <Input
                      id="utilities"
                      type="number"
                      value={financialData.expenses.utilities}
                      onChange={(e) => handleChange("expenses.utilities", e.target.valueAsNumber || 0)}
                      className="finance-input"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="groceries">Groceries</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-muted-foreground mr-2">₹</span>
                    <Input
                      id="groceries"
                      type="number"
                      value={financialData.expenses.groceries}
                      onChange={(e) => handleChange("expenses.groceries", e.target.valueAsNumber || 0)}
                      className="finance-input"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="transportation">Transportation</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-muted-foreground mr-2">₹</span>
                    <Input
                      id="transportation"
                      type="number"
                      value={financialData.expenses.transportation}
                      onChange={(e) => handleChange("expenses.transportation", e.target.valueAsNumber || 0)}
                      className="finance-input"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="miscellaneous">Miscellaneous</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-muted-foreground mr-2">₹</span>
                    <Input
                      id="miscellaneous"
                      type="number"
                      value={financialData.expenses.miscellaneous}
                      onChange={(e) => handleChange("expenses.miscellaneous", e.target.valueAsNumber || 0)}
                      className="finance-input"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Expenses:</span>
                  <span className="text-lg font-bold text-finance-secondary">
                    ₹{totalExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">Monthly Savings:</span>
                  <span className={`text-lg font-bold ${
                    monthlySavings >= 0 ? "text-finance-positive" : "text-finance-negative"
                  }`}>
                    ₹{monthlySavings.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Savings & Investments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentSavings">Current Savings</Label>
                <div className="flex items-center mt-2">
                  <span className="text-muted-foreground mr-2">₹</span>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={financialData.currentSavings}
                    onChange={(e) => handleChange("currentSavings", e.target.valueAsNumber || 0)}
                    className="finance-input"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currentInvestments">Current Investments</Label>
                <div className="flex items-center mt-2">
                  <span className="text-muted-foreground mr-2">₹</span>
                  <Input
                    id="currentInvestments"
                    type="number"
                    value={financialData.currentInvestments}
                    onChange={(e) => handleChange("currentInvestments", e.target.valueAsNumber || 0)}
                    className="finance-input"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Assets:</span>
                  <span className="text-lg font-bold text-finance-secondary">
                    ₹{(financialData.currentSavings + financialData.currentInvestments).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Financial Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="retirementGoal">Financial Freedom Goal</Label>
                <div className="flex items-center mt-2">
                  <span className="text-muted-foreground mr-2">₹</span>
                  <Input
                    id="retirementGoal"
                    type="number"
                    value={financialData.retirementGoal}
                    onChange={(e) => handleChange("retirementGoal", e.target.valueAsNumber || 0)}
                    className="finance-input"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  This is the total amount you aim to accumulate for financial freedom.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Investment Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select
                  value={financialData.riskTolerance}
                  onValueChange={(value) => handleChange("riskTolerance", value)}
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="investmentTimeframe">
                  Investment Timeframe (Years): {financialData.investmentTimeframe}
                </Label>
                <Slider
                  id="investmentTimeframe"
                  min={5}
                  max={50}
                  step={1}
                  value={[financialData.investmentTimeframe]}
                  onValueChange={(value) => handleChange("investmentTimeframe", value[0])}
                  className="mt-4"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button type="submit" className="bg-finance-primary hover:bg-finance-secondary">
          Generate Financial Plan
        </Button>
      </div>
    </form>
  );
};

export default FinancialInputForm;
