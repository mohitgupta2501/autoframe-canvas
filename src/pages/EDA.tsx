import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

const EDA = () => {
  const datasetSummary = {
    rows: 10000,
    columns: 12,
    numericalColumns: 7,
    categoricalColumns: 4,
    targetColumn: 1,
    missingValues: 0,
    duplicateRows: 0
  };

  const qualityIssues = [
    { type: "Class Imbalance", severity: "medium", description: "Target variable has 70/30 split", affected: "1 column" },
    { type: "High Cardinality", severity: "low", description: "Location column has 250+ unique values", affected: "1 column" },
    { type: "Zero Variance", severity: "high", description: "Constant column detected", affected: "1 column" },
  ];

  const correlations = [
    { feature1: "income", feature2: "education", correlation: 0.72, strength: "strong" },
    { feature1: "age", feature2: "experience", correlation: 0.89, strength: "very strong" },
    { feature1: "location", feature2: "income", correlation: 0.43, strength: "moderate" },
    { feature1: "target", feature2: "income", correlation: 0.38, strength: "moderate" },
  ];

  const targetInsights = {
    distribution: { "Yes": 70, "No": 30 },
    imbalanceRatio: 2.33,
    recommendation: "Consider SMOTE or class weighting"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Exploratory Data Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover insights and patterns in your data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary">
            <FileText className="w-4 h-4 mr-2" />
            Generate Auto Report
          </Button>
        </div>
      </div>

      {/* Dataset Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{datasetSummary.rows.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Rows</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{datasetSummary.columns}</p>
            <p className="text-sm text-muted-foreground">Columns</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-model-training">{datasetSummary.numericalColumns}</p>
            <p className="text-sm text-muted-foreground">Numerical</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-analytics">{datasetSummary.categoricalColumns}</p>
            <p className="text-sm text-muted-foreground">Categorical</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{datasetSummary.targetColumn}</p>
            <p className="text-sm text-muted-foreground">Target</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{datasetSummary.missingValues}</p>
            <p className="text-sm text-muted-foreground">Missing</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{datasetSummary.duplicateRows}</p>
            <p className="text-sm text-muted-foreground">Duplicates</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Quality Issues */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Quality Issues
            </CardTitle>
            <CardDescription>
              Potential data quality concerns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qualityIssues.map((issue, index) => (
              <div key={index} className="p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{issue.type}</h4>
                  <Badge 
                    variant="outline"
                    className={
                      issue.severity === 'high' ? 'border-destructive text-destructive' :
                      issue.severity === 'medium' ? 'border-warning text-warning' :
                      'border-muted-foreground text-muted-foreground'
                    }
                  >
                    {issue.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{issue.description}</p>
                <p className="text-xs text-muted-foreground">Affects: {issue.affected}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Target Variable Analysis */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Target Analysis
            </CardTitle>
            <CardDescription>
              Target variable distribution and insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Class: Yes</span>
                <span className="font-medium">{targetInsights.distribution.Yes}%</span>
              </div>
              <Progress value={targetInsights.distribution.Yes} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Class: No</span>
                <span className="font-medium">{targetInsights.distribution.No}%</span>
              </div>
              <Progress value={targetInsights.distribution.No} className="h-2" />
            </div>
            
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">Imbalance Detected</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Ratio: {targetInsights.imbalanceRatio}:1
              </p>
              <p className="text-xs text-muted-foreground">
                {targetInsights.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Correlations */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Top Correlations
            </CardTitle>
            <CardDescription>
              Strongest feature relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {correlations.map((corr, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {corr.feature1} ↔ {corr.feature2}
                  </span>
                  <Badge 
                    variant="outline"
                    className={
                      corr.strength === 'very strong' ? 'border-destructive text-destructive' :
                      corr.strength === 'strong' ? 'border-warning text-warning' :
                      'border-primary text-primary'
                    }
                  >
                    {corr.correlation}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{corr.strength} correlation</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Visualizations */}
      <Card className="bg-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Interactive Visualizations
          </CardTitle>
          <CardDescription>
            Explore your data through interactive charts and plots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="distributions" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="distributions">Distributions</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
              <TabsTrigger value="pairplots">Pair Plots</TabsTrigger>
              <TabsTrigger value="outliers">Outliers</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="distributions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Age Distribution Histogram</p>
                  </div>
                </div>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Income Box Plot</p>
                  </div>
                </div>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Education Pie Chart</p>
                  </div>
                </div>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Location Bar Chart</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="correlations" className="space-y-4">
              <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Correlation Heatmap</h3>
                  <p className="text-muted-foreground">
                    Interactive correlation matrix will be displayed here
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pairplots" className="space-y-4">
              <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Pair Plot Matrix</h3>
                  <p className="text-muted-foreground">
                    Scatter plot matrix for feature relationships
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="outliers" className="space-y-4">
              <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Outlier Detection</h3>
                  <p className="text-muted-foreground">
                    Box plots and scatter plots highlighting outliers
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Trend Analysis</h3>
                  <p className="text-muted-foreground">
                    Time series trends and seasonal patterns
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EDA;