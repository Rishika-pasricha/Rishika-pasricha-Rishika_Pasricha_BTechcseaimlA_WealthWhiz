
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, LineChart, TrendingUp, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Calculator = () => {
  // Compound Interest Calculator
  const [compoundInterest, setCompoundInterest] = useState({
    principal: 10000,
    monthlyContribution: 500,
    annualRate: 7,
    years: 20,
    result: 0,
  });
  
  // Retirement Calculator
  const [retirement, setRetirement] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 25000,
    monthlyContribution: 1000,
    annualRate: 7,
    yearlyExpensesInRetirement: 60000,
    result: {
      savingsAtRetirement: 0,
      yearsOfRetirementCovered: 0,
    },
  });
  
  // Loan Calculator
  const [loan, setLoan] = useState({
    amount: 300000,
    interestRate: 4.5,
    termYears: 30,
    result: {
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
    },
  });

  // Calculate Compound Interest
  const calculateCompoundInterest = () => {
    const principal = compoundInterest.principal;
    const monthlyContribution = compoundInterest.monthlyContribution;
    const annualRate = compoundInterest.annualRate / 100;
    const years = compoundInterest.years;
    
    let balance = principal;
    
    for (let i = 0; i < years; i++) {
      balance = balance * (1 + annualRate) + (monthlyContribution * 12);
    }
    
    setCompoundInterest({
      ...compoundInterest,
      result: balance,
    });
    
    toast.success("Compound interest calculation complete!");
  };
  
  // Calculate Retirement
  const calculateRetirement = () => {
    const currentAge = retirement.currentAge;
    const retirementAge = retirement.retirementAge;
    const currentSavings = retirement.currentSavings;
    const monthlyContribution = retirement.monthlyContribution;
    const annualRate = retirement.annualRate / 100;
    const yearlyExpensesInRetirement = retirement.yearlyExpensesInRetirement;
    
    const yearsToRetirement = retirementAge - currentAge;
    
    let savingsAtRetirement = currentSavings;
    
    for (let i = 0; i < yearsToRetirement; i++) {
      savingsAtRetirement = savingsAtRetirement * (1 + annualRate) + (monthlyContribution * 12);
    }
    
    // Simplified calculation for years of retirement covered
    // Assumes withdrawing yearlyExpensesInRetirement each year with remaining funds growing at 4%
    const withdrawalRate = 0.04; // 4% annual growth in retirement (more conservative)
    const yearsOfRetirementCovered = Math.log(1 - (savingsAtRetirement * withdrawalRate / yearlyExpensesInRetirement)) / Math.log(1 + withdrawalRate);
    
    setRetirement({
      ...retirement,
      result: {
        savingsAtRetirement,
        yearsOfRetirementCovered: isNaN(yearsOfRetirementCovered) ? 0 : yearsOfRetirementCovered,
      },
    });
    
    toast.success("Retirement calculation complete!");
  };
  
  // Calculate Loan
  const calculateLoan = () => {
    const amount = loan.amount;
    const interestRate = loan.interestRate / 100 / 12; // Monthly interest rate
    const termMonths = loan.termYears * 12;
    
    const monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, termMonths)) / (Math.pow(1 + interestRate, termMonths) - 1);
    const totalPayment = monthlyPayment * termMonths;
    const totalInterest = totalPayment - amount;
    
    setLoan({
      ...loan,
      result: {
        monthlyPayment,
        totalInterest,
        totalPayment,
      },
    });
    
    toast.success("Loan calculation complete!");
  };

  return (
    <Layout>
      <div className="py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-finance-primary mb-2">Financial Calculators</h1>
        <p className="text-muted-foreground mb-8">
          Use these calculators to plan your investments, retirement, and loans.
        </p>
        
        <Tabs defaultValue="compound" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
            <TabsTrigger value="compound" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Compound Interest</span>
            </TabsTrigger>
            <TabsTrigger value="retirement" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Retirement</span>
            </TabsTrigger>
            <TabsTrigger value="loan" className="flex items-center gap-2">
              <CalculatorIcon className="h-4 w-4" />
              <span>Loan</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compound" className="space-y-8 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-finance-primary">Compound Interest Calculator</CardTitle>
                <CardDescription>
                  Calculate how your investments will grow over time with compound interest.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="principal">Initial Investment</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="principal"
                          type="number"
                          value={compoundInterest.principal}
                          onChange={(e) => setCompoundInterest({
                            ...compoundInterest,
                            principal: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          value={compoundInterest.monthlyContribution}
                          onChange={(e) => setCompoundInterest({
                            ...compoundInterest,
                            monthlyContribution: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="annualRate">
                        Annual Interest Rate: {compoundInterest.annualRate}%
                      </Label>
                      <Slider
                        id="annualRate"
                        min={1}
                        max={15}
                        step={0.25}
                        value={[compoundInterest.annualRate]}
                        onValueChange={(value) => setCompoundInterest({
                          ...compoundInterest,
                          annualRate: value[0],
                        })}
                        className="mt-4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="years">
                        Investment Period: {compoundInterest.years} years
                      </Label>
                      <Slider
                        id="years"
                        min={1}
                        max={50}
                        step={1}
                        value={[compoundInterest.years]}
                        onValueChange={(value) => setCompoundInterest({
                          ...compoundInterest,
                          years: value[0],
                        })}
                        className="mt-4"
                      />
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-finance-primary hover:bg-finance-secondary"
                      onClick={calculateCompoundInterest}
                    >
                      Calculate
                    </Button>
                  </div>
                  
                  <div className="flex flex-col">
                    <Card className="flex-grow">
                      <CardHeader>
                        <CardTitle className="text-finance-secondary">Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Future Value</p>
                          <p className="text-3xl font-bold text-finance-primary">
                            ₹{compoundInterest.result.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Total Contributions</p>
                          <p className="text-xl font-semibold">
                            ₹{(compoundInterest.principal + (compoundInterest.monthlyContribution * 12 * compoundInterest.years)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Interest Earned</p>
                          <p className="text-xl font-semibold text-finance-positive">
                            ₹{(compoundInterest.result - compoundInterest.principal - (compoundInterest.monthlyContribution * 12 * compoundInterest.years)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retirement" className="space-y-8 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-finance-primary">Retirement Calculator</CardTitle>
                <CardDescription>
                  Plan for your retirement and see how much you need to save.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentAge">Current Age</Label>
                        <Input
                          id="currentAge"
                          type="number"
                          value={retirement.currentAge}
                          onChange={(e) => setRetirement({
                            ...retirement,
                            currentAge: Number(e.target.value),
                          })}
                          className="finance-input mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="retirementAge">Retirement Age</Label>
                        <Input
                          id="retirementAge"
                          type="number"
                          value={retirement.retirementAge}
                          onChange={(e) => setRetirement({
                            ...retirement,
                            retirementAge: Number(e.target.value),
                          })}
                          className="finance-input mt-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="currentSavings">Current Retirement Savings</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="currentSavings"
                          type="number"
                          value={retirement.currentSavings}
                          onChange={(e) => setRetirement({
                            ...retirement,
                            currentSavings: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="retirementContribution">Monthly Contribution</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="retirementContribution"
                          type="number"
                          value={retirement.monthlyContribution}
                          onChange={(e) => setRetirement({
                            ...retirement,
                            monthlyContribution: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="retirementRate">
                        Annual Return Rate: {retirement.annualRate}%
                      </Label>
                      <Slider
                        id="retirementRate"
                        min={1}
                        max={15}
                        step={0.25}
                        value={[retirement.annualRate]}
                        onValueChange={(value) => setRetirement({
                          ...retirement,
                          annualRate: value[0],
                        })}
                        className="mt-4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="yearlyExpenses">Annual Expenses in Retirement</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="yearlyExpenses"
                          type="number"
                          value={retirement.yearlyExpensesInRetirement}
                          onChange={(e) => setRetirement({
                            ...retirement,
                            yearlyExpensesInRetirement: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-finance-primary hover:bg-finance-secondary"
                      onClick={calculateRetirement}
                    >
                      Calculate
                    </Button>
                  </div>
                  
                  <div className="flex flex-col">
                    <Card className="flex-grow">
                      <CardHeader>
                        <CardTitle className="text-finance-secondary">Retirement Outlook</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Savings at Retirement</p>
                          <p className="text-3xl font-bold text-finance-primary">
                            ₹{retirement.result.savingsAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Years of Retirement Covered</p>
                          <p className="text-2xl font-semibold">
                            {retirement.result.yearsOfRetirementCovered.toFixed(1)} years
                          </p>
                        </div>
                        
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm">
                            {retirement.result.yearsOfRetirementCovered > 30
                              ? "✓ You're on track for a secure retirement!"
                              : retirement.result.yearsOfRetirementCovered > 20
                              ? "! You're making good progress, but consider increasing your savings."
                              : "⚠ You may need to increase your retirement contributions to reach your goals."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="loan" className="space-y-8 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-finance-primary">Loan Calculator</CardTitle>
                <CardDescription>
                  Calculate mortgage or loan payments and see the full amortization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground mr-2">₹</span>
                        <Input
                          id="loanAmount"
                          type="number"
                          value={loan.amount}
                          onChange={(e) => setLoan({
                            ...loan,
                            amount: Number(e.target.value),
                          })}
                          className="finance-input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="interestRate">
                        Interest Rate: {loan.interestRate}%
                      </Label>
                      <Slider
                        id="interestRate"
                        min={0.5}
                        max={15}
                        step={0.125}
                        value={[loan.interestRate]}
                        onValueChange={(value) => setLoan({
                          ...loan,
                          interestRate: value[0],
                        })}
                        className="mt-4"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="loanTerm">Loan Term</Label>
                      <Select
                        value={loan.termYears.toString()}
                        onValueChange={(value) => setLoan({
                          ...loan,
                          termYears: Number(value),
                        })}
                      >
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue placeholder="Select loan term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-finance-primary hover:bg-finance-secondary"
                      onClick={calculateLoan}
                    >
                      Calculate
                    </Button>
                  </div>
                  
                  <div className="flex flex-col">
                    <Card className="flex-grow">
                      <CardHeader>
                        <CardTitle className="text-finance-secondary">Loan Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p className="text-3xl font-bold text-finance-primary">
                            ₹{loan.result.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Total Interest</p>
                          <p className="text-xl font-semibold text-finance-negative">
                            ₹{loan.result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Total Payment</p>
                          <p className="text-xl font-semibold">
                            ₹{loan.result.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex justify-center">
                          <Button variant="outline" className="flex items-center gap-2">
                            <span>View Full Amortization Schedule</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Calculator;
