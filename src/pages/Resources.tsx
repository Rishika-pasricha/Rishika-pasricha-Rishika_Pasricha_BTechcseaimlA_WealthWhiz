
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Newspaper, Mail, ArrowRight, Clock } from 'lucide-react';
import ArticleModal from '@/components/ArticleModal';

const Resources = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [activeArticle, setActiveArticle] = useState<any>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      toast({
        title: "Newsletter Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail('');
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
    }
  };

  // Open article handler
  const openArticle = (article: any) => {
    setActiveArticle(article);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Enhanced button animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { 
      scale: 0.97,
      boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -1px rgba(0, 0, 0, 0.05)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-finance-primary mb-4">Financial Resources</h1>
          <p className="text-lg text-finance-dark max-w-3xl mx-auto">
            Access comprehensive financial knowledge to help you make informed decisions about your money and investments.
          </p>
        </motion.div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="guides" className="flex items-center gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Financial Guides</span>
              <span className="sm:hidden">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="regulations" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Regulations & Policy</span>
              <span className="sm:hidden">Regulations</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 py-3">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">Indian Financial News</span>
              <span className="sm:hidden">News</span>
            </TabsTrigger>
          </TabsList>

          {/* Guides Tab Content */}
          <TabsContent value="guides">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {financialGuides.map((guide, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full transition-transform duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-finance-primary">{guide.title}</CardTitle>
                      <CardDescription>{guide.short}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{guide.description}</p>
                      <div className="flex items-center mt-4 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{guide.readTime} read</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        className="w-full"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button 
                          className="w-full group"
                          onClick={() => openArticle({
                            ...guide,
                            content: guide.fullContent || "Full content for this guide is being prepared."
                          })}
                        >
                          Read Guide
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Regulations Tab Content */}
          <TabsContent value="regulations">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {regulations.map((regulation, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-finance-primary">{regulation.title}</CardTitle>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">
                          {regulation.date}
                        </span>
                      </div>
                      <CardDescription>{regulation.authority}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{regulation.summary}</p>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        className="w-full"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full group"
                          onClick={() => openArticle({
                            ...regulation,
                            title: regulation.title,
                            content: regulation.fullContent || "Full details for this regulation are being updated."
                          })}
                        >
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* News Tab Content */}
          <TabsContent value="news">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6"
            >
              {financialNews.map((news, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 bg-muted p-4 flex items-center justify-center">
                        <img 
                          src={news.image || "/placeholder.svg"} 
                          alt={news.title} 
                          className="h-auto w-full max-h-48 md:max-h-full object-cover rounded"
                        />
                      </div>
                      <div className="md:w-3/4 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-finance-primary">{news.title}</h3>
                          <span className="text-xs px-2 py-1 bg-muted rounded-full whitespace-nowrap ml-2">
                            {news.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{news.source}</p>
                        <p className="mb-4">{news.summary}</p>
                        <motion.div
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                          className="inline-block"
                        >
                          <Button 
                            className="group" 
                            size="sm"
                            onClick={() => openArticle({
                              ...news,
                              content: news.fullContent || "Full article content is being updated."
                            })}
                          >
                            Read Full Article
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <Card className="bg-finance-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Subscribe to Our Newsletter
              </CardTitle>
              <CardDescription className="text-white/80">
                Get weekly updates on financial news, market trends, and investment opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white/10 text-white placeholder:text-white/60 border-white/20"
                  required
                />
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button type="submit" variant="secondary" className="whitespace-nowrap">
                    Subscribe Now
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <ArticleModal
          isOpen={!!activeArticle}
          onClose={() => setActiveArticle(null)}
          title={activeArticle.title}
          content={activeArticle.content}
          image={activeArticle.image}
          date={activeArticle.date}
          source={activeArticle.source}
        />
      )}
    </Layout>
  );
};

// Sample data with full content for articles
const financialGuides = [
  {
    title: "Budgeting for Beginners",
    short: "Master the basics of budgeting",
    description: "Learn how to create a personal budget that works for your lifestyle and helps you achieve your financial goals.",
    readTime: "15 min",
    fullContent: "# Budgeting for Beginners\n\nCreating a budget is the first step toward financial freedom. By tracking your income and expenses, you gain control over your money rather than wondering where it went.\n\n## The 50/30/20 Rule\n\nA simple way to budget is the 50/30/20 rule:\n- 50% of your income goes to needs (rent, groceries, utilities)\n- 30% goes to wants (dining out, entertainment, shopping)\n- 20% goes to savings and debt repayment\n\n## Steps to Create Your Budget\n\n1. **Track your income**: Calculate all sources of monthly income after taxes.\n\n2. **List your expenses**: Review bank and credit card statements to identify all regular expenses.\n\n3. **Categorize spending**: Divide expenses into fixed (rent, loan payments) and variable (groceries, entertainment).\n\n4. **Set realistic goals**: Start with small, achievable targets to build confidence.\n\n5. **Use budgeting tools**: Apps like YNAB, Mint, or even a simple spreadsheet can help track spending.\n\n6. **Review regularly**: Check your budget weekly at first, then monthly as you get comfortable.\n\n## Common Budgeting Mistakes to Avoid\n\n- **Setting unrealistic expectations**: Don't try to cut expenses too drastically at once.\n- **Forgetting irregular expenses**: Account for annual subscriptions or seasonal costs.\n- **Not adjusting your budget**: Life changes, and your budget should too.\n\nRemember, budgeting isn't about restricting yourself—it's about intentional spending that aligns with your priorities and goals."
  },
  {
    title: "Emergency Fund Essentials",
    short: "Building your financial safety net",
    description: "Understand why an emergency fund is crucial and how to build one that can support you through unexpected financial challenges.",
    readTime: "12 min",
    fullContent: "# Emergency Fund Essentials\n\nAn emergency fund is your financial safety net for life's unexpected events. It provides peace of mind and prevents you from going into debt when emergencies arise.\n\n## Why You Need an Emergency Fund\n\nEmergency funds protect you from:\n- Job loss or reduction in income\n- Medical emergencies\n- Unexpected home or car repairs\n- Family emergencies\n\n## How Much Should You Save?\n\nFinancial experts typically recommend saving 3-6 months of essential expenses. For those with variable income or in less stable industries, 6-12 months might be more appropriate.\n\n## Where to Keep Your Emergency Fund\n\nYour emergency fund should be:\n- Easily accessible (liquid)\n- Safe from market fluctuations\n- Earning some interest if possible\n\nGood options include:\n- High-yield savings accounts\n- Money market accounts\n- Short-term fixed deposits\n\n## Steps to Build Your Emergency Fund\n\n1. **Start small**: Begin with a goal of ₹10,000 or one month's expenses\n2. **Automate savings**: Set up automatic transfers on payday\n3. **Use windfalls wisely**: Put tax refunds, bonuses, or gifts toward your fund\n4. **Cut unnecessary expenses**: Redirect savings to your emergency fund\n5. **Consider a side hustle**: Temporary additional income can accelerate your savings\n\n## When to Use Your Emergency Fund\n\nUse your emergency fund only for true emergencies—unexpected events that affect your health, income, or essential property. Planned expenses like vacations, festivals, or routine maintenance should be budgeted separately.\n\nRemember: After using your emergency fund, make replenishing it a priority."
  },
  {
    title: "Investment 101: Getting Started",
    short: "First steps to investing",
    description: "A comprehensive introduction to investing in the Indian market, including stocks, mutual funds, and bonds.",
    readTime: "20 min",
    fullContent: "# Investment 101: Getting Started\n\nInvesting is how you make your money work for you, potentially growing your wealth over time. This guide will help beginners understand the basics of investing in the Indian market.\n\n## Before You Start Investing\n\nBefore investing your first rupee, ensure you have:\n\n1. **Cleared high-interest debt**: Especially credit cards and personal loans\n2. **Built an emergency fund**: Have 3-6 months of expenses saved\n3. **Defined your financial goals**: Short-term (1-3 years), medium-term (3-7 years), and long-term (7+ years)\n4. **Assessed your risk tolerance**: Understanding how much volatility you can handle emotionally\n\n## Common Investment Options in India\n\n### Mutual Funds\n- **Equity funds**: Invest primarily in stocks, higher risk but potential for higher returns\n- **Debt funds**: Invest in bonds and fixed-income securities, lower risk and returns\n- **Hybrid funds**: Mix of equity and debt investments\n\n### Direct Equity (Stocks)\n- Buying shares of individual companies\n- Requires more research and monitoring\n- Higher potential returns but also higher risk\n\n### Fixed Income Investments\n- Fixed deposits (FDs)\n- Public Provident Fund (PPF)\n- National Savings Certificate (NSC)\n- Government bonds\n\n## How to Start Investing\n\n1. **Complete your KYC**: This is required for all financial investments\n2. **Open a demat and trading account**: For stock market investments\n3. **Start with SIPs in mutual funds**: Systematic Investment Plans allow regular, automatic investments\n4. **Diversify gradually**: Don't put all your money in one investment\n5. **Invest according to your time horizon**: Longer time horizons can tolerate more risk\n\n## Common Investment Mistakes to Avoid\n\n- **Timing the market**: Consistent investing beats trying to predict market movements\n- **Chasing past performance**: Past returns don't guarantee future results\n- **Neglecting asset allocation**: Diversification across asset classes reduces risk\n- **Letting emotions drive decisions**: Panic selling during market downturns can lock in losses\n\nRemember, investing is a marathon, not a sprint. Start small, stay consistent, and focus on your long-term goals."
  },
  {
    title: "Understanding Mutual Funds",
    short: "Navigate the world of mutual funds",
    description: "Learn about different types of mutual funds, how to select them, and strategies for long-term wealth creation.",
    readTime: "25 min"
  },
  {
    title: "Tax Planning Strategies",
    short: "Maximize your tax savings",
    description: "Discover legal ways to minimize your tax liability and make the most of tax-saving investment options in India.",
    readTime: "18 min"
  },
  {
    title: "Retirement Planning Guide",
    short: "Secure your future",
    description: "A step-by-step approach to planning for retirement in India, including NPS, PPF, and other retirement-focused investments.",
    readTime: "22 min"
  }
];

const regulations = [
  {
    title: "2023 Union Budget Highlights",
    authority: "Ministry of Finance, Government of India",
    date: "Feb 2023",
    summary: "Key changes in the Union Budget 2023 that impact personal finance, including tax slabs, capital gains taxation, and new investment schemes.",
    fullContent: "# 2023 Union Budget Highlights\n\nThe Union Budget 2023-24 introduced several key changes that impact personal finance for Indian citizens. This summary covers the most significant changes that will affect your financial planning.\n\n## Income Tax Changes\n\n### New Tax Regime\n\nThe new tax regime has been made more attractive with the following changes:\n\n- Basic exemption limit increased from ₹2.5 lakh to ₹3 lakh\n- Standard deduction of ₹50,000 now available under new tax regime\n- Income tax rebate limit increased from ₹5 lakh to ₹7 lakh under new regime\n\n### Revised Tax Slabs (New Regime)\n\n- 0-₹3 lakh: Nil\n- ₹3-6 lakh: 5%\n- ₹6-9 lakh: 10%\n- ₹9-12 lakh: 15%\n- ₹12-15 lakh: 20%\n- Above ₹15 lakh: 30%\n\n### Capital Gains Tax\n\n- Long-term capital gains tax from listed equity shares capped at 15%\n- Indexation benefits for property and debt mutual funds retained\n\n## Investment-Related Changes\n\n### Senior Citizens\n\n- Maximum deposit limit for Senior Citizens Savings Scheme increased from ₹15 lakh to ₹30 lakh\n- Monthly Income Scheme limit raised from ₹4.5 lakh to ₹9 lakh (single) and ₹9 lakh to ₹15 lakh (joint)\n\n### New Small Savings Scheme\n\n- Mahila Samman Savings Certificate launched with 7.5% interest rate\n- One-time investment limit of ₹2 lakh\n- Two-year tenure with partial withdrawal option\n\n## Implications for Financial Planning\n\n- Consider evaluating the new tax regime's benefits for your situation\n- Higher limits for senior-focused schemes offer better post-retirement planning options\n- Reconsider debt mutual funds for long-term goals due to retained indexation benefits\n\nConsult with a qualified tax professional to understand how these changes specifically affect your financial situation."
  },
  {
    title: "SEBI's New Mutual Fund Categorization",
    authority: "Securities and Exchange Board of India (SEBI)",
    date: "Apr 2023",
    summary: "Updated regulations for categorization and rationalization of mutual fund schemes to help investors make better-informed decisions.",
    fullContent: "# SEBI's New Mutual Fund Categorization\n\nThe Securities and Exchange Board of India (SEBI) has introduced new regulations for the categorization and rationalization of mutual fund schemes. These changes aim to simplify the investment landscape and help investors make more informed decisions.\n\n## Key Changes in Categorization\n\n### Equity Schemes\n\n- **Large Cap Funds**: Must invest at least 80% in large-cap companies (top 100 by market cap)\n- **Mid Cap Funds**: Must invest at least 65% in mid-cap companies (101st to 250th by market cap)\n- **Small Cap Funds**: Must invest at least 65% in small-cap companies (251st onwards by market cap)\n- **Large & Mid Cap Funds**: Must invest at least 35% each in large and mid-cap stocks\n- **Flexi Cap Funds**: Must invest at least 65% in equity with flexibility across market caps\n\n### Debt Schemes\n\n- **Overnight Funds**: Investments in overnight securities\n- **Liquid Funds**: Debt instruments with maturity up to 91 days\n- **Ultra Short Duration Funds**: Debt with Macaulay duration of 3-6 months\n- **Low Duration Funds**: Debt with Macaulay duration of 6-12 months\n- **Medium Duration Funds**: Debt with Macaulay duration of 3-4 years\n- **Long Duration Funds**: Debt with Macaulay duration above 7 years\n\n### Hybrid Schemes\n\n- **Conservative Hybrid**: 10-25% in equity, 75-90% in debt\n- **Balanced Hybrid**: 40-60% in equity and debt each\n- **Aggressive Hybrid**: 65-80% in equity, 20-35% in debt\n\n## One Scheme Per Category Rule\n\nEach mutual fund house can now have only one scheme per category (with few exceptions), reducing the proliferation of similar schemes and making comparison easier for investors.\n\n## Portfolio Disclosure Requirements\n\n- Complete portfolio disclosure every month instead of half-yearly\n- Disclosure must be made on fund house website within 10 days of month-end\n- Total Expense Ratio (TER) details to be more transparent\n\n## Impact on Investors\n\n- **Easier Comparison**: Standardized categories make it easier to compare schemes across fund houses\n- **Reduced Confusion**: Fewer overlapping schemes simplify the selection process\n- **Better Alignment**: Scheme objectives align more clearly with their names\n- **Increased Transparency**: More frequent portfolio disclosures provide better monitoring\n\n## What Investors Should Do\n\n1. Review your existing mutual fund portfolio to understand the new categorization\n2. Check if any of your funds have changed their fundamental attributes\n3. Ensure your portfolio maintains proper diversification under the new system\n4. Consider consolidating investments if you hold multiple funds in the same category\n\nThese regulations are designed to bring clarity and simplicity to mutual fund investments, making it easier for investors to select appropriate schemes based on their financial goals and risk appetite."
  },
  {
    title: "RBI's Digital Lending Guidelines",
    authority: "Reserve Bank of India (RBI)",
    date: "Aug 2023",
    summary: "New regulatory framework for digital lending platforms, focusing on transparency, data privacy, and fair practices."
  },
  {
    title: "Changes to Capital Gains Tax Rules",
    authority: "Income Tax Department",
    date: "Oct 2023",
    summary: "Recent modifications to capital gains taxation for various asset classes including real estate, equity, and debt instruments."
  },
  {
    title: "New NPS Withdrawal Rules",
    authority: "Pension Fund Regulatory & Development Authority",
    date: "Nov 2023",
    summary: "Updated regulations regarding National Pension System (NPS) withdrawals, partial withdrawals, and tax implications."
  },
  {
    title: "GST Updates for Financial Services",
    authority: "Goods and Services Tax Council",
    date: "Dec 2023",
    summary: "Recent changes in GST rates and requirements for financial products and services, including insurance, banking, and investments."
  }
];

const financialNews = [
  {
    title: "RBI Holds Interest Rates Steady Amid Global Economic Uncertainty",
    source: "Economic Times",
    date: "Apr 12, 2023",
    summary: "The Reserve Bank of India maintained the repo rate at 6.5% for the third consecutive meeting, citing the need to balance growth with inflation concerns.",
    image: "https://images.unsplash.com/photo-1582091652153-eb6f4e5a92de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
    fullContent: "# RBI Holds Interest Rates Steady Amid Global Economic Uncertainty\n\nIn its latest monetary policy meeting, the Reserve Bank of India (RBI) maintained the repo rate at 6.5% for the third consecutive time, keeping a cautious stance amid global economic uncertainties while balancing domestic growth prospects and inflation concerns.\n\n## Key Highlights of the Policy Decision\n\n- **Repo rate unchanged at 6.5%**: The six-member Monetary Policy Committee (MPC) voted 5-1 to maintain the status quo\n- **Stance remains 'withdrawal of accommodation'**: The RBI continues to focus on withdrawing the pandemic-era stimulus\n- **GDP growth projection**: Retained at 6.5% for FY 2023-24\n- **Inflation forecast**: Slightly reduced from 5.2% to 5.1% for the current fiscal year\n\n## Rationale Behind the Decision\n\nRBI Governor Shaktikanta Das highlighted several factors influencing the decision:\n\n\"While inflation is moderating, we need to ensure that it aligns durably with the 4% target. The global economic environment remains challenging with geopolitical tensions, financial market volatility, and fragmentation concerns.\"\n\nThe Governor also mentioned that domestic economic activity has shown resilience, supported by robust agricultural production prospects, sustained urban demand, and gradually improving rural consumption.\n\n## Impact on Different Sectors\n\n### Banking and Loans\n\nWith rates holding steady, EMIs on existing floating-rate loans should remain unchanged. Banks are likely to maintain their current lending and deposit rates in the short term.\n\n### Real Estate\n\nThe sector may see stable home loan rates, which could help maintain current sales momentum. Developers had been hoping for a rate cut to boost housing demand further.\n\n### Equity Markets\n\nMarkets reacted positively to the policy announcement, with banking and financial stocks showing gains. The predictability in policy has been welcomed by investors looking for stability.\n\n## Global Context\n\nThe RBI's decision aligns with the approach taken by several global central banks that have paused rate hikes as inflation shows signs of moderation. However, unlike some Western economies that are considering rate cuts, India's central bank maintains that it's too early to declare victory over inflation.\n\n## Future Outlook\n\nEconomists and market analysts believe the RBI might maintain the current rates for at least another quarter before considering any cuts. The central bank's future actions will largely depend on:\n\n- Monsoon performance and its impact on food inflation\n- Global commodity prices, especially crude oil\n- US Federal Reserve's interest rate decisions\n- Domestic growth momentum\n\n\"We expect the RBI to remain on hold for the rest of 2023 and possibly start cutting rates only in early 2024 once inflation moves closer to the 4% target,\" said a chief economist at a leading financial institution."
  },
  {
    title: "Indian Stock Market Reaches New Heights as Foreign Investments Surge",
    source: "Financial Express",
    date: "May 5, 2023",
    summary: "Sensex crossed the 70,000 mark for the first time, driven by strong foreign institutional investor inflows and positive domestic economic indicators.",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D",
    fullContent: "# Indian Stock Market Reaches New Heights as Foreign Investments Surge\n\nIn a historic moment for Indian financial markets, the benchmark Sensex crossed the 70,000 mark for the first time, propelled by substantial foreign institutional investor (FII) inflows and robust domestic economic indicators that have strengthened investor confidence.\n\n## Record-Breaking Rally\n\nThe BSE Sensex surged 850 points (1.2%) to reach 70,540 during intraday trading before settling at 70,220 at closing. Similarly, the NSE Nifty 50 index crossed the 21,000 milestone, marking a significant psychological barrier for the markets.\n\nThis rally represents an impressive 18% gain for the Sensex since the beginning of the year, making the Indian stock market one of the best-performing major markets globally.\n\n## Driving Factors\n\n### Foreign Investment Revival\n\nForeign institutional investors have poured over $12 billion into Indian equities in the past two months, reversing the outflow trend seen earlier in the year. This renewed interest comes as global investors seek alternatives to China amid ongoing regulatory concerns and property sector issues there.\n\n\"India is increasingly being viewed as a stable investment destination with strong governance and growth visibility,\" noted a chief investment strategist at a global investment bank.\n\n### Strong Economic Fundamentals\n\nThe market surge coincides with several positive economic indicators:\n\n- GDP growth projected at 6.8% for FY 2023-24, among the highest for major economies\n- Manufacturing PMI at a 16-month high of 57.5\n- GST collections maintaining above ₹1.5 lakh crore for three consecutive months\n- Inflation moderating to 4.7%, within the RBI's comfort zone\n\n### Corporate Earnings Growth\n\nQ2 FY24 results have largely beaten expectations, with aggregate profits for Nifty 50 companies growing by 15% year-on-year. Banking, IT, and consumer goods sectors have shown particularly strong performance.\n\n## Sectoral Performance\n\nThe rally has been broad-based but with certain sectors leading the charge:\n\n- **Banking & Financial Services**: Up 22% YTD, boosted by robust credit growth and improving asset quality\n- **IT Services**: Gained 16% as concerns over Western spending cuts recede\n- **Capital Goods**: Surged 30% amid increased government infrastructure spending\n- **Consumer Discretionary**: Up 25% reflecting strong urban consumption\n\n## Market Outlook and Risks\n\nWhile the momentum remains positive, analysts caution about potential challenges:\n\n\"Valuations are stretched by historical standards, with the Nifty trading at a P/E of 22x forward earnings, above its long-term average of 18x,\" warned a prominent market analyst.\n\nOther risk factors include:\n\n- Geopolitical tensions, particularly in the Middle East\n- Potential reversal in FII flows if US rates remain higher for longer\n- Rural demand weakness affecting consumption-driven sectors\n- Upcoming general elections in 2024\n\n## Retail Investor Participation\n\nThe market's upward trajectory has coincided with unprecedented retail investor participation, with demat accounts exceeding 120 million. Systematic Investment Plans (SIPs) in mutual funds have consistently recorded monthly inflows above ₹15,000 crore.\n\n\"Indian households are increasingly shifting from physical assets like gold and real estate to financial assets, creating a structural tailwind for the markets,\" observed the CEO of a leading asset management company."
  },
  {
    title: "Government Announces New Small Savings Scheme for Women",
    source: "The Hindu Business Line",
    date: "Jun 18, 2023",
    summary: "Finance Ministry launched 'Mahila Samman Bachat Yojana' with 7.5% interest rate for women savers, aiming to boost financial inclusion and independence.",
    image: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
  }
];

export default Resources;
