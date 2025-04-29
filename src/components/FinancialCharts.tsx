
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

interface FinancialChartsProps {
  data: FinancialData;
}

const COLORS = ["#0A4D68", "#088395", "#05BFDB", "#00FFCA", "#3AB54A"];

const FinancialCharts = ({ data }: FinancialChartsProps) => {
  // Calculate total expenses
  const totalExpenses = Object.values(data.expenses).reduce(
    (sum, expense) => sum + expense,
    0
  );
  
  // Calculate monthly savings
  const monthlySavings = data.monthlyIncome - totalExpenses;
  
  // Calculate years to goal with compound interest (7% annual return)
  const calculateYearsToGoal = () => {
    const monthlyContribution = monthlySavings;
    const initialAmount = data.currentSavings + data.currentInvestments;
    const goal = data.retirementGoal;
    const annualReturnRate = 0.07; // 7% annual return
    
    if (monthlyContribution <= 0) return 100; // If not saving monthly, return a high number
    
    let currentTotal = initialAmount;
    let years = 0;
    
    while (currentTotal < goal && years < 100) {
      currentTotal = currentTotal * (1 + annualReturnRate) + (monthlyContribution * 12);
      years++;
    }
    
    return years;
  };
  
  const yearsToGoal = calculateYearsToGoal();
  
  // Generate projection data
  const generateProjectionData = () => {
    const projectionData = [];
    let currentTotal = data.currentSavings + data.currentInvestments;
    const annualReturnRate = 0.07; // 7% annual return
    
    for (let year = 0; year <= yearsToGoal; year++) {
      if (year > 0) {
        currentTotal = currentTotal * (1 + annualReturnRate) + (monthlySavings * 12);
      }
      
      projectionData.push({
        year: `Year ${year}`,
        value: Math.round(currentTotal),
        goal: data.retirementGoal,
      });
    }
    
    return projectionData;
  };
  
  const projectionData = generateProjectionData();
  
  // Income vs expenses data
  const incomeVsExpensesData = [
    { name: "Income", value: data.monthlyIncome },
    { name: "Expenses", value: totalExpenses },
    { name: "Savings", value: monthlySavings },
  ];
  
  // Expense breakdown data
  const expenseBreakdownData = [
    { name: "Rent/Mortgage", value: data.expenses.rent },
    { name: "Utilities", value: data.expenses.utilities },
    { name: "Groceries", value: data.expenses.groceries },
    { name: "Transportation", value: data.expenses.transportation },
    { name: "Miscellaneous", value: data.expenses.miscellaneous },
  ];
  
  // Current vs goal data
  const currentVsGoalData = [
    { name: "Current Assets", value: data.currentSavings + data.currentInvestments },
    { name: "Remaining", value: Math.max(0, data.retirementGoal - (data.currentSavings + data.currentInvestments)) },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          <TabsTrigger value="projection">Future Projection</TabsTrigger>
          <TabsTrigger value="goal">Goal Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Income vs Expenses</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incomeVsExpensesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
                        labelStyle={{ color: "#0A4D68" }}
                      />
                      <Bar dataKey="value" fill="#088395" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Current vs Goal</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={currentVsGoalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {currentVsGoalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-finance-primary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Monthly Savings</h3>
                    <p className="text-3xl font-bold">₹{monthlySavings.toLocaleString()}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-finance-secondary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Current Assets</h3>
                    <p className="text-3xl font-bold">
                      ₹{(data.currentSavings + data.currentInvestments).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-finance-tertiary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Years to Goal</h3>
                    <p className="text-3xl font-bold">{yearsToGoal}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Expense Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Expense Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Expense Categories</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseBreakdownData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      <Bar dataKey="value" fill="#05BFDB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-finance-secondary mb-4">Expense Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="text-md font-semibold mb-2">Housing Cost Ratio</h4>
                      <p className="text-2xl font-bold text-finance-primary">
                        {((data.expenses.rent / data.monthlyIncome) * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {data.expenses.rent / data.monthlyIncome > 0.3
                          ? "Your housing costs exceed the recommended 30% of income."
                          : "Your housing costs are within the recommended range."}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="text-md font-semibold mb-2">Savings Rate</h4>
                      <p className="text-2xl font-bold text-finance-primary">
                        {((monthlySavings / data.monthlyIncome) * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {monthlySavings / data.monthlyIncome < 0.2
                          ? "Aim to save at least 20% of your income."
                          : "Great job saving more than 20% of your income!"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projection" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Future Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-finance-secondary mb-4">
                Wealth Growth Projection (7% Annual Return)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#088395"
                    activeDot={{ r: 8 }}
                    name="Projected Wealth"
                  />
                  <Line
                    type="monotone"
                    dataKey="goal"
                    stroke="#E03131"
                    strokeDasharray="5 5"
                    name="Financial Freedom Goal"
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-finance-primary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Projected Timeline</h3>
                    <p className="text-3xl font-bold">{yearsToGoal} years</p>
                    <p className="text-sm mt-2">
                      Estimated time to reach your financial freedom goal.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-finance-secondary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Monthly Contribution</h3>
                    <p className="text-3xl font-bold">₹{monthlySavings.toLocaleString()}</p>
                    <p className="text-sm mt-2">
                      Your current monthly savings rate.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-finance-tertiary text-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-2">Projected Annual Growth</h3>
                    <p className="text-3xl font-bold">7%</p>
                    <p className="text-sm mt-2">
                      Estimated annual return on investments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goal" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-finance-primary">Goal Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Progress to Goal</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={currentVsGoalData}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {currentVsGoalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-finance-secondary mb-4">Goal Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Financial Freedom Goal</p>
                      <p className="text-2xl font-bold text-finance-primary">
                        ₹{data.retirementGoal.toLocaleString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Current Progress</p>
                      <p className="text-2xl font-bold text-finance-secondary">
                        ₹{(data.currentSavings + data.currentInvestments).toLocaleString()}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Percentage Complete</p>
                      <p className="text-2xl font-bold text-finance-tertiary">
                        {(((data.currentSavings + data.currentInvestments) / data.retirementGoal) * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Amount</p>
                      <p className="text-2xl font-bold text-finance-negative">
                        ₹{Math.max(0, data.retirementGoal - (data.currentSavings + data.currentInvestments)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialCharts;
