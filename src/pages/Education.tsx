import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, FileText, Video, Bookmark, BookMarked, LineChart, Book, TrendingUp, PiggyBank, Clock, Info, BadgeIndianRupee, BadgePercent, Receipt, ReceiptIndianRupee, Landmark, X, Youtube } from "lucide-react";

const Education = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [courseVideoOpen, setCourseVideoOpen] = useState(false);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setCourseVideoOpen(true);
  };

  const articles = [
    {
      id: 1,
      title: "The Power of Compound Interest",
      description: "Learn how compound interest can exponentially grow your wealth over time.",
      category: "Investing",
      readTime: "5 min read",
      featured: true,
      icon: <TrendingUp className="h-5 w-5" />,
      content: `
        <h2>The Power of Compound Interest</h2>
        <p>Compound interest is often called the eighth wonder of the world, and for good reason. It's one of the most powerful forces in finance that can help grow your wealth exponentially over time.</p>
        
        <h3>What is Compound Interest?</h3>
        <p>Compound interest is when you earn interest not just on your initial investment (the principal), but also on the interest that has accumulated over time. In simple terms, it's "interest on interest."</p>
        
        <h3>The Magic of Compound Interest</h3>
        <p>The real power of compound interest lies in its exponential nature. As your investment grows, the amount of interest you earn each period increases, leading to accelerated growth over time.</p>
        
        <h3>The Rule of 72</h3>
        <p>A simple way to estimate how long it will take for your investment to double is to use the Rule of 72. Divide 72 by your annual interest rate to get the approximate number of years it will take for your investment to double.</p>
        
        <h3>Time is Your Greatest Ally</h3>
        <p>The earlier you start investing, the more time your money has to compound. Even a small amount invested early can grow significantly over time due to the power of compound interest.</p>
        
        <h3>Indian Tax Implications</h3>
        <p>In India, interest income is taxable according to your income tax slab. However, certain investments like PPF (Public Provident Fund) offer tax-free compound interest, making them excellent long-term investment options under Section 80C.</p>
        
        <h3>Practical Application</h3>
        <p>If you invest ₹10,000 today at an annual interest rate of 8%, compounded annually, in 30 years it would grow to approximately ₹1,00,627. That's the power of compound interest!</p>
      `
    },
    {
      id: 2,
      title: "Creating a Budget That Actually Works",
      description: "Practical tips for creating a sustainable budget you can stick with.",
      category: "Budgeting",
      readTime: "8 min read",
      featured: true,
      icon: <PiggyBank className="h-5 w-5" />,
      content: `
        <h2>Creating a Budget That Actually Works</h2>
        <p>Many people create budgets but fail to stick to them. Here's how to create a sustainable budget that you can actually follow.</p>
        
        <h3>Start With Your Income</h3>
        <p>Begin by calculating your total monthly income after taxes. Include all sources of income such as salary, freelance work, rental income, etc.</p>
        
        <h3>Track Your Expenses</h3>
        <p>For at least one month, track every rupee you spend. Categorize your expenses into fixed (rent, EMIs) and variable (food, entertainment) expenses.</p>
        
        <h3>Follow the 50-30-20 Rule</h3>
        <p>A good starting point is the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.</p>
        
        <h3>Use Digital Tools</h3>
        <p>Take advantage of budgeting apps like ET Money, Walnut, or Money Manager that can help you track expenses and stick to your budget.</p>
        
        <h3>Indian Context: Account for Festivals and Weddings</h3>
        <p>In India, festivals and family weddings can cause significant financial strain. Create a separate savings category for these occasions to avoid disrupting your regular budget.</p>
        
        <h3>Plan for Irregular Expenses</h3>
        <p>Set aside money each month for irregular expenses like insurance premiums, home maintenance, or medical emergencies.</p>
        
        <h3>Review and Adjust</h3>
        <p>Review your budget regularly and adjust as needed. Life changes, and your budget should too.</p>
      `
    },
    {
      id: 3,
      title: "Emergency Funds: How Much Do You Really Need?",
      description: "Guidelines for building an appropriate emergency fund based on your situation.",
      category: "Saving",
      readTime: "6 min read",
      featured: false,
      icon: <PiggyBank className="h-5 w-5" />,
      content: `
        <h2>Emergency Funds: How Much Do You Really Need?</h2>
        <p>An emergency fund is your financial safety net designed to cover unexpected expenses or help you weather periods of income loss.</p>
        
        <h3>The 3-6 Month Rule</h3>
        <p>The general guideline is to save 3-6 months of essential expenses. This includes housing, food, utilities, insurance, and debt payments.</p>
        
        <h3>When You Might Need More</h3>
        <p>Consider saving 6-12 months of expenses if you have an irregular income, are self-employed, work in a volatile industry, or have dependents.</p>
        
        <h3>Where to Keep Your Emergency Fund</h3>
        <p>Your emergency fund should be easily accessible but not too easily spent. A high-yield savings account or a liquid fund are good options.</p>
        
        <h3>Indian Context: Family Support System</h3>
        <p>In India, the joint family system often acts as a social safety net. However, it's still prudent to have your own emergency fund for financial independence.</p>
        
        <h3>Building Your Fund Gradually</h3>
        <p>Start by saving ₹1,000 or whatever you can afford, then gradually increase your contributions. Consistency is key.</p>
        
        <h3>When to Use Your Emergency Fund</h3>
        <p>Use your emergency fund only for true emergencies: medical emergencies, essential home or car repairs, or job loss. Resist the temptation to use it for planned expenses or investments.</p>
      `
    },
    {
      id: 4,
      title: "Index Funds vs. ETFs: What's the Difference?",
      description: "Understanding the key differences between these popular investment vehicles.",
      category: "Investing",
      readTime: "7 min read",
      featured: false,
      icon: <LineChart className="h-5 w-5" />,
      content: `
        <h2>Index Funds vs. ETFs: What's the Difference?</h2>
        <p>Both index funds and Exchange-Traded Funds (ETFs) are popular investment vehicles that track market indices, but they have some key differences.</p>
        
        <h3>Trading Mechanism</h3>
        <p>Index funds are bought and sold directly from the mutual fund company at the end of the trading day at the Net Asset Value (NAV). ETFs trade on stock exchanges throughout the day like stocks.</p>
        
        <h3>Minimum Investment</h3>
        <p>Index funds often have minimum investment requirements, while ETFs can be purchased for the price of a single share plus brokerage fees.</p>
        
        <h3>Expense Ratios</h3>
        <p>ETFs typically have lower expense ratios than index funds, making them more cost-effective for long-term investors.</p>
        
        <h3>Tax Efficiency</h3>
        <p>ETFs are generally more tax-efficient than index funds due to their structure, which allows for in-kind creation and redemption of shares.</p>
        
        <h3>Indian Context: ELSS vs Index Funds</h3>
        <p>In India, Equity Linked Savings Schemes (ELSS) offer tax benefits under Section 80C with a 3-year lock-in period, while index funds don't offer specific tax benefits but provide market-linked returns with higher liquidity.</p>
        
        <h3>Which One is Right for You?</h3>
        <p>Choose index funds if you prefer simplicity, regular investing, and don't need intraday trading. Choose ETFs if you want lower costs, tax efficiency, and the flexibility to trade throughout the day.</p>
      `
    },
    {
      id: 5,
      title: "Tax-Advantaged Accounts Explained",
      description: "A comprehensive guide to 401(k)s, IRAs, and other tax-advantaged accounts.",
      category: "Taxes",
      readTime: "10 min read",
      featured: false,
      icon: <FileText className="h-5 w-5" />,
      content: `
        <h2>Tax-Advantaged Accounts in India Explained</h2>
        <p>India offers several tax-advantaged accounts that can help you save on taxes while building wealth for the future.</p>
        
        <h3>Public Provident Fund (PPF)</h3>
        <p>PPF is a government-backed savings scheme with a 15-year lock-in period. Contributions up to ₹1.5 lakh per year qualify for tax deduction under Section 80C, and both the interest earned and maturity amount are tax-free.</p>
        
        <h3>Employee Provident Fund (EPF)</h3>
        <p>EPF is a retirement benefit scheme for salaried employees. Both employee and employer contribute 12% of the basic salary. Contributions, interest, and withdrawals after 5 years of service are tax-free.</p>
        
        <h3>National Pension System (NPS)</h3>
        <p>NPS is a voluntary, long-term retirement savings scheme. Additional tax benefits of up to ₹50,000 are available under Section 80CCD(1B), over and above the ₹1.5 lakh limit under Section 80C.</p>
        
        <h3>Sukanya Samriddhi Yojana (SSY)</h3>
        <p>SSY is designed for the girl child's education and marriage expenses. Investments up to ₹1.5 lakh per year qualify for Section 80C deduction, and the interest earned and maturity amount are tax-free.</p>
        
        <h3>Tax-Saving Fixed Deposits</h3>
        <p>These are 5-year fixed deposits that qualify for tax deduction under Section 80C up to ₹1.5 lakh. However, the interest earned is taxable as per your income tax slab.</p>
        
        <h3>Equity-Linked Savings Scheme (ELSS)</h3>
        <p>ELSS are mutual funds with a 3-year lock-in period that invest primarily in equities. They offer tax deduction under Section 80C and have the potential for higher returns compared to other tax-saving instruments.</p>
      `
    },
    {
      id: 6,
      title: "The FIRE Movement: Financial Independence, Retire Early",
      description: "Exploring the principles behind the popular financial independence movement.",
      category: "Lifestyle",
      readTime: "12 min read",
      featured: true,
      icon: <Clock className="h-5 w-5" />,
      content: `
        <h2>The FIRE Movement: Financial Independence, Retire Early</h2>
        <p>The FIRE (Financial Independence, Retire Early) movement has gained significant traction globally, including in India. Here's what it means and how to achieve it.</p>
        
        <h3>What is FIRE?</h3>
        <p>FIRE is a lifestyle movement focused on extreme savings and investments that allow you to retire much earlier than traditional retirement age, potentially in your 30s or 40s.</p>
        
        <h3>The 4% Rule</h3>
        <p>The cornerstone of FIRE is the 4% rule, which suggests that you can withdraw 4% of your portfolio in your first year of retirement, and then adjust that amount for inflation each subsequent year, with minimal risk of running out of money.</p>
        
        <h3>FIRE in the Indian Context</h3>
        <p>Achieving FIRE in India may require different strategies due to factors like family responsibilities, healthcare costs, and higher inflation. However, the lower cost of living in many parts of India can be advantageous.</p>
        
        <h3>Types of FIRE</h3>
        <p>There are different approaches to FIRE: Fat FIRE (retiring with a higher annual spending), Lean FIRE (extreme frugality), and Barista FIRE (semi-retirement with part-time work to cover some expenses).</p>
        
        <h3>The FIRE Formula</h3>
        <p>To achieve FIRE, increase your savings rate dramatically (aim for 50-70% of your income), invest in low-cost index funds or ETFs, minimize taxes, and reduce lifestyle inflation.</p>
        
        <h3>Beyond the Numbers</h3>
        <p>FIRE is not just about retiring early, but about having the freedom to make life choices without financial constraints. Many who achieve FIRE continue to work on passion projects or businesses they truly enjoy.</p>
      `
    },
  ];
  
  const courses = [
    {
      id: 1,
      title: "Investing Fundamentals",
      description: "Master the basics of investing and build a solid foundation for your financial journey.",
      modules: 8,
      duration: "4 weeks",
      level: "Beginner",
      featured: true,
      videoId: "PHe0bXAIuk0", // Ray Dalio - How The Economic Machine Works
      youtubePlaylist: "PL39g-V6ycQQKFYRDVEjrV8lusY1ncgSGg" // Personal Finance playlist
    },
    {
      id: 2,
      title: "Personal Finance Mastery",
      description: "Learn practical money management skills to take control of your finances and achieve your goals.",
      modules: 10,
      duration: "6 weeks",
      level: "Beginner",
      featured: true,
      videoId: "Ehv9iHptHSA", // Personal Finance Basics That Actually Work
      youtubePlaylist: "PLcWoVjST_tHJlbPT0hNr7jzgTxmZAka5c" // Personal Finance Mastery playlist
    },
    {
      id: 3,
      title: "Advanced Stock Market Strategies",
      description: "Dive deep into stock valuation methods and portfolio optimization techniques.",
      modules: 12,
      duration: "8 weeks",
      level: "Advanced",
      featured: false,
      videoId: "ZCFkWDdmXG8", // Stock Market for Beginners by The Plain Bagel
      youtubePlaylist: "PLY6aak4fZh8rcJJ7hJpXFdYZfoM3FDK4G" // Stock market strategies playlist
    },
    {
      id: 4,
      title: "Property Investment Strategies",
      description: "Comprehensive guide to building wealth through residential and commercial real estate investments.",
      modules: 9,
      duration: "6 weeks",
      level: "Intermediate",
      featured: false,
      videoId: "s5Sz0Wg6T6A", // How To Invest In Real Estate For Beginners
      youtubePlaylist: "PL6K6J-q1W9TfKmxbZ9ky-RYf9KRjNl5q-" // Real Estate Investing And Wealth Building playlist
    },
  ];
  
  const tools = [
    {
      id: 1,
      title: "Retirement Calculator",
      description: "Estimate your retirement needs and check if you're on track.",
      category: "Planning",
    },
    {
      id: 2,
      title: "Investment Portfolio Analyzer",
      description: "Analyze your portfolio's risk, diversification, and potential returns.",
      category: "Investing",
    },
    {
      id: 3,
      title: "Debt Reduction Planner",
      description: "Create a personalized plan to pay off your debts efficiently.",
      category: "Debt",
    },
    {
      id: 4,
      title: "Budget Tracker",
      description: "Track your income and expenses with customizable categories.",
      category: "Budgeting",
    },
  ];
  
  const guides = [
    {
      id: 1,
      title: "The Beginner's Guide to Investing",
      chapters: 10,
      description: "A comprehensive guide to start your investing journey with confidence.",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Financial Independence",
      chapters: 12,
      description: "Step-by-step strategies to achieve financial freedom and build wealth.",
    },
    {
      id: 3,
      title: "Smart Retirement Planning",
      chapters: 8,
      description: "Everything you need to know about planning for a comfortable retirement.",
    },
  ];

  const indianFinancialNews = [
    {
      id: 1,
      title: "New Income Tax Regime for FY 2024-25",
      description: "Understanding the revised tax slabs and benefits under the new tax regime.",
      category: "Taxation",
      date: "April 1, 2024",
      source: "Income Tax Department",
      icon: <BadgeIndianRupee className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "Budget 2024: Key Highlights for Investors",
      description: "Important changes in capital gains tax, equity investments, and new financial schemes.",
      category: "Budget",
      date: "February 1, 2024",
      source: "Finance Ministry",
      icon: <ReceiptIndianRupee className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "RBI Repo Rate Update: Impact on Your Loans",
      description: "How the latest RBI policy rate changes affect your home loans, personal loans, and savings.",
      category: "RBI Policy",
      date: "March 15, 2024",
      source: "Reserve Bank of India",
      icon: <Landmark className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "Changes in NPS Withdrawal Rules",
      description: "Updated guidelines for National Pension System withdrawals and tax implications.",
      category: "Retirement",
      date: "January 10, 2024",
      source: "PFRDA",
      icon: <BadgePercent className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "UPI Transaction Limits Increased",
      description: "RBI has raised UPI transaction limits for various payment categories.",
      category: "Digital Payments",
      date: "February 25, 2024",
      source: "NPCI",
      icon: <Receipt className="h-5 w-5" />,
    },
    {
      id: 6,
      title: "Latest Changes in GST Filing Requirements",
      description: "Updated GST compliance rules and filing deadlines for businesses and individuals.",
      category: "Taxation",
      date: "March 5, 2024",
      source: "GST Council",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const indianFinancialRegulations = [
    {
      id: 1,
      title: "Understanding Section 80C Deductions",
      description: "Comprehensive guide to maximizing your ₹1.5 lakh tax deduction under Section 80C.",
      category: "Tax Planning",
      icon: <BadgeIndianRupee className="h-5 w-5" />,
    },
    {
      id: 2,
      title: "RBI Guidelines on Digital Lending",
      description: "Latest regulations on digital lending platforms and borrower protection.",
      category: "Banking",
      icon: <Landmark className="h-5 w-5" />,
    },
    {
      id: 3,
      title: "SEBI Mutual Fund Categorization Rules",
      description: "How SEBI's mutual fund classification affects your investment choices.",
      category: "Investing",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      id: 4,
      title: "NRI Investment Options in India",
      description: "Regulations governing NRI investments in stocks, mutual funds, and real estate.",
      category: "NRI Finance",
      icon: <PiggyBank className="h-5 w-5" />,
    },
    {
      id: 5,
      title: "HRA Exemption Calculation Guidelines",
      description: "Step-by-step process to calculate your House Rent Allowance tax exemption.",
      category: "Tax Planning",
      icon: <BadgePercent className="h-5 w-5" />,
    },
    {
      id: 6,
      title: "KYC Requirements for Financial Services",
      description: "Updated KYC norms for banking, insurance, and investment accounts.",
      category: "Compliance",
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <Layout>
      <div className="py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-finance-primary mb-2">Financial Education Center</h1>
        <p className="text-muted-foreground mb-8">
          Expand your financial knowledge with our curated resources, courses, and tools.
        </p>
        
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid grid-cols-6 mb-8 w-full md:w-auto">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Articles</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Guides</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Tools</span>
            </TabsTrigger>
            <TabsTrigger value="indian-news" className="flex items-center gap-2">
              <ReceiptIndianRupee className="h-4 w-4" />
              <span>Indian News</span>
            </TabsTrigger>
            <TabsTrigger value="indian-regulations" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span>Regulations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles
                  .filter(article => article.featured)
                  .map(article => (
                    <Card key={article.id} className="card-hover cursor-pointer" onClick={() => handleArticleClick(article)}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-finance-secondary mb-2">{article.category}</p>
                            <CardTitle className="text-xl">{article.title}</CardTitle>
                          </div>
                          <div className="p-2 bg-finance-primary/10 rounded-full">
                            {article.icon}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground min-h-[60px]">
                          {article.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        <Button variant="outline" size="sm" className="gap-1" onClick={(e) => {
                          e.stopPropagation();
                        }}>
                          <Bookmark className="h-4 w-4" />
                          <span>Save</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(article => (
                  <div 
                    key={article.id} 
                    className="p-4 border rounded-lg flex items-start gap-3 hover:border-finance-primary transition-colors cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="p-2 bg-finance-primary/10 rounded-full">
                      {article.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{article.category}</span>
                        <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses
                  .filter(course => course.featured)
                  .map(course => (
                    <Card key={course.id} className="card-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-finance-secondary mb-2">{course.level} • {course.duration}</p>
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                          </div>
                          <div className="px-2 py-1 bg-finance-secondary text-white rounded-full text-xs font-medium">
                            {course.modules} Modules
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground min-h-[60px]">
                          {course.description}
                        </CardDescription>
                        <div className="mt-4 relative rounded-md overflow-hidden aspect-video bg-muted">
                          <iframe 
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${course.videoId}?rel=0`}
                            title={course.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Bookmark className="h-4 w-4" />
                          <span>Save Course</span>
                        </Button>
                        <Button 
                          className="bg-finance-primary hover:bg-finance-secondary gap-2"
                          onClick={() => handleCourseClick(course)}
                        >
                          <Youtube className="h-4 w-4" />
                          <span>Start Learning</span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">All Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <Card key={course.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-finance-secondary">{course.level} • {course.duration}</p>
                        <div className="px-2 py-1 bg-finance-secondary text-white rounded-full text-xs font-medium">
                          {course.modules} Modules
                        </div>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {course.description}
                      </CardDescription>
                      <div className="relative rounded-md overflow-hidden aspect-video bg-muted">
                        <iframe 
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${course.videoId}?rel=0`}
                          title={course.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-finance-primary hover:bg-finance-secondary gap-2"
                        onClick={() => handleCourseClick(course)}
                      >
                        <Youtube className="h-4 w-4" />
                        <span>Start Learning</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Comprehensive Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guides.map(guide => (
                  <Card key={guide.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-finance-tertiary/20 rounded-full">
                          <BookMarked className="h-5 w-5 text-finance-tertiary" />
                        </div>
                        <div className="px-2 py-1 bg-finance-tertiary/10 text-finance-tertiary rounded-full text-xs font-medium">
                          {guide.chapters} Chapters
                        </div>
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground min-h-[60px]">
                        {guide.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-finance-primary hover:bg-finance-secondary">Read Guide</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Financial Book Recommendations</h2>
              <ScrollArea className="h-[340px] rounded-md border p-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="flex gap-4 mb-4 pb-4 border-b last:border-0">
                    <div className="bg-finance-primary/10 h-24 w-16 rounded flex items-center justify-center flex-shrink-0">
                      <Book className="h-8 w-8 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {[
                          "The Psychology of Money",
                          "A Random Walk Down Wall Street",
                          "The Simple Path to Wealth",
                          "Rich Dad Poor Dad",
                          "The Intelligent Investor",
                          "Your Money or Your Life",
                          "The Millionaire Next Door",
                          "I Will Teach You to Be Rich",
                        ][index]}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {[
                          "Morgan Housel explores how people think about money and how that affects their behavior.",
                          "Burton Malkiel's classic guide to investing, particularly in index funds.",
                          "JL Collins provides a simple strategy to achieve financial independence.",
                          "Robert Kiyosaki's lessons on building wealth and financial literacy.",
                          "Benjamin Graham's timeless advice on value investing.",
                          "Vicki Robin's approach to transforming your relationship with money.",
                          "Thomas Stanley's research on America's wealthy and their frugal habits.",
                          "Ramit Sethi's practical guide to personal finance in your 20s and 30s.",
                        ][index]}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">
                          {["Behavior", "Investing", "FI/RE", "Mindset", "Investing", "Philosophy", "Wealth", "Practical"][index]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Financial Calculators & Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map(tool => (
                  <Card key={tool.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-finance-secondary">{tool.category}</p>
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-finance-primary hover:bg-finance-secondary">Use Tool</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Financial Worksheets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Budget Worksheet",
                    description: "Track your income and expenses with this comprehensive budget template."
                  },
                  {
                    title: "Net Worth Calculator",
                    description: "Calculate and track your total assets, liabilities, and net worth over time."
                  },
                  {
                    title: "Debt Payoff Tracker",
                    description: "Visualize your debt payoff journey and stay motivated as you make progress."
                  }
                ].map((worksheet, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2 bg-finance-secondary/10 rounded-full">
                          <FileText className="h-5 w-5 text-finance-secondary" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{worksheet.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground min-h-[60px]">
                        {worksheet.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="default" size="sm" className="bg-finance-secondary">Download</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="indian-news" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Latest Indian Financial News</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {indianFinancialNews.slice(0, 3).map(news => (
                  <Card key={news.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-finance-secondary mb-2">{news.category}</p>
                          <CardTitle className="text-xl">{news.title}</CardTitle>
                        </div>
                        <div className="p-2 bg-finance-primary/10 rounded-full">
                          {news.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground min-h-[60px]">
                        {news.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{news.date}</span>
                      <span className="text-sm text-muted-foreground">Source: {news.source}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">All Financial Updates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {indianFinancialNews.map(news => (
                  <div key={news.id} className="p-4 border rounded-lg flex items-start gap-3 hover:border-finance-primary transition-colors cursor-pointer">
                    <div className="p-2 bg-finance-primary/10 rounded-full">
                      {news.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{news.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{news.description}</p>
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{news.category}</span>
                        <span className="text-xs text-muted-foreground">{news.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="indian-regulations" className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Key Indian Financial Regulations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {indianFinancialRegulations.map(regulation => (
                  <Card key={regulation.id} className="card-hover">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-finance-secondary">{regulation.category}</p>
                          <CardTitle className="text-xl">{regulation.title}</CardTitle>
                        </div>
                        <div className="p-2 bg-finance-tertiary/10 rounded-full">
                          {regulation.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground min-h-[60px]">
                        {regulation.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-finance-primary hover:bg-finance-secondary">Learn More</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />
            
            <div>
              <h2 className="text-2xl font-bold text-finance-primary mb-6">Important RBI Guidelines</h2>
              <div className="p-6 border rounded-xl bg-finance-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-finance-primary/10 rounded-full">
                    <Info className="h-6 w-6 text-finance-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-finance-primary">Key RBI Regulations Every Indian Should Know</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-finance-secondary" />
                      KYC Requirements
                    </h4>
                    <p className="text-sm text-muted-foreground">All financial institutions must complete Know Your Customer verification before opening accounts. Valid ID proof, address proof, and PAN card are mandatory.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <BadgeIndianRupee className="h-4 w-4 text-finance-secondary" />
                      Cash Transaction Limits
                    </h4>
                    <p className="text-sm text-muted-foreground">Cash transactions above ₹2 lakh are prohibited in most cases. PAN is required for transactions above ₹50,000. Banks must report high-value transactions to authorities.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <PiggyBank className="h-4 w-4 text-finance-secondary" />
                      Deposit Insurance
                    </h4>
                    <p className="text-sm text-muted-foreground">Bank deposits are insured up to ₹5 lakh per depositor per bank under the DICGC (Deposit Insurance and Credit Guarantee Corporation).</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-finance-secondary" />
                      UPI Transaction Limits
                    </h4>
                    <p className="text-sm text-muted-foreground">UPI transaction limits vary by bank but generally allow up to ₹1 lakh per transaction for regular users. Merchant payments have higher limits.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Article Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-finance-primary/10 rounded-full">
                      {selectedArticle.icon}
                    </div>
                    <DialogTitle className="text-2xl">{selectedArticle.title}</DialogTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <span className="px-2 py-1 bg-muted rounded-full">{selectedArticle.category}</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <DialogDescription className="mt-2">
                  {selectedArticle.description}
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-4" />
              <div className="article-content prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
              <div className="flex justify-between mt-6">
                <Button variant="outline" size="sm" className="gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Save Article</span>
                </Button>
                <Button className="bg-finance-primary hover:bg-finance-secondary">Share</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Course Video Dialog */}
      <Dialog open={courseVideoOpen} onOpenChange={setCourseVideoOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-finance-primary/10 rounded-full">
                      <Video className="h-5 w-5" />
                    </div>
                    <DialogTitle className="text-2xl">{selectedCourse.title}</DialogTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setCourseVideoOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <span className="px-2 py-1 bg-muted rounded-full">{selectedCourse.level}</span>
                  <span>{selectedCourse.duration}</span>
                  <span>{selectedCourse.modules} Modules</span>
                </div>
                <DialogDescription className="mt-2">
                  {selectedCourse.description}
                </DialogDescription>
              </DialogHeader>
              <div className="relative rounded-md overflow-hidden aspect-video bg-muted mt-4">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/videoseries?list=${selectedCourse.youtubePlaylist}`}
                  title={selectedCourse.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" size="sm" className="gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Save Course</span>
                </Button>
                <Button className="bg-finance-primary hover:bg-finance-secondary">Enroll in Full Course</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Education;
