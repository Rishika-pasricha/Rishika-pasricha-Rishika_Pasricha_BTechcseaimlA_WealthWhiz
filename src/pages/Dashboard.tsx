
import { useState } from "react";
import Layout from "@/components/Layout";
import FinancialInputForm from "@/components/FinancialInputForm";
import FinancialCharts from "@/components/FinancialCharts";
import FinancialRecommendations from "@/components/FinancialRecommendations";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, ChartPie, GanttChartSquare } from "lucide-react";

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

const Dashboard = () => {
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
  
  const handleFormSubmit = (data: FinancialData) => {
    setFinancialData(data);
  };

  return (
    <Layout>
      <div className="py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-finance-primary mb-2">WealthWhiz Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Track your financial health, visualize your path to financial freedom, and get personalized recommendations.
        </p>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <ChartPie className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="projections" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Projections</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <GanttChartSquare className="h-4 w-4" />
              <span>Financial Planner</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-8 animate-slide-up">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-finance-primary mb-6">Financial Input</h2>
                <FinancialInputForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projections" className="space-y-8 animate-slide-up">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-finance-primary mb-6">Financial Visualizations</h2>
                <FinancialCharts data={financialData} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planner" className="space-y-8 animate-slide-up">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-finance-primary mb-6">Personalized Recommendations</h2>
                <FinancialRecommendations data={financialData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
