import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  BarChart3, 
  TrendingUp, 
  Target,
  Download,
  Settings,
  Brain,
  Lightbulb
} from "lucide-react";

const Explainability = () => {
  const [selectedInstance, setSelectedInstance] = useState("sample_1");

  const featureImportance = [
    { feature: "income", importance: 0.342, type: "numerical" },
    { feature: "age", importance: 0.189, type: "numerical" },
    { feature: "education_level", importance: 0.156, type: "categorical" },
    { feature: "location", importance: 0.123, type: "categorical" },
    { feature: "experience_years", importance: 0.098, type: "numerical" },
    { feature: "job_category", importance: 0.092, type: "categorical" },
  ];

  const shapValues = [
    { feature: "income", value: 0.23, baseline: 0.15, contribution: "positive" },
    { feature: "age", value: -0.08, baseline: 0.15, contribution: "negative" },
    { feature: "education_level", value: 0.12, baseline: 0.15, contribution: "positive" },
    { feature: "location", value: -0.05, baseline: 0.15, contribution: "negative" },
    { feature: "experience_years", value: 0.18, baseline: 0.15, contribution: "positive" },
  ];

  const limeExplanation = [
    { feature: "income > 50000", weight: 0.45, support: 0.89 },
    { feature: "age <= 35", weight: -0.23, support: 0.76 },
    { feature: "education = Bachelor", weight: 0.34, support: 0.92 },
    { feature: "location = Urban", weight: 0.12, support: 0.84 },
    { feature: "experience > 5", weight: 0.28, support: 0.67 },
  ];

  const counterfactuals = [
    { 
      original: { income: 45000, age: 28, education: "Bachelor" },
      counterfactual: { income: 55000, age: 28, education: "Bachelor" },
      change: "Increase income by $10,000",
      prediction: "No → Yes",
      confidence: 0.89
    },
    { 
      original: { income: 45000, age: 28, education: "Bachelor" },
      counterfactual: { income: 45000, age: 28, education: "Master" },
      change: "Change education to Master's",
      prediction: "No → Yes",
      confidence: 0.76
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Explainable AI (XAI)
          </h1>
          <p className="text-muted-foreground mt-2">
            Understand and interpret your model's predictions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary">
            <Brain className="w-4 h-4 mr-2" />
            Generate Explanations
          </Button>
        </div>
      </div>

      {/* Model Selection */}
      <Card className="bg-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Model & Instance Selection
          </CardTitle>
          <CardDescription>
            Choose model and data instance to explain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="model-select">Model</Label>
              <Select defaultValue="xgboost">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xgboost">XGBoost (94.2% acc)</SelectItem>
                  <SelectItem value="lightgbm">LightGBM (92.1% acc)</SelectItem>
                  <SelectItem value="catboost">CatBoost (91.8% acc)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="instance-select">Instance</Label>
              <Select value={selectedInstance} onValueChange={setSelectedInstance}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sample_1">Sample 1 (High confidence)</SelectItem>
                  <SelectItem value="sample_2">Sample 2 (Low confidence)</SelectItem>
                  <SelectItem value="sample_3">Sample 3 (Misclassified)</SelectItem>
                  <SelectItem value="custom">Custom Instance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="prediction">Prediction</Label>
              <div className="mt-1 p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Yes (Positive)</span>
                  <Badge className="bg-success/10 text-success border-success/20">
                    87.5%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="global">Global Importance</TabsTrigger>
          <TabsTrigger value="shap">SHAP Analysis</TabsTrigger>
          <TabsTrigger value="lime">LIME</TabsTrigger>
          <TabsTrigger value="pdp">PDP/ICE</TabsTrigger>
          <TabsTrigger value="counterfactual">Counterfactuals</TabsTrigger>
          <TabsTrigger value="tree">Tree Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feature Importance */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Global Feature Importance
                </CardTitle>
                <CardDescription>
                  Overall feature contribution across all predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featureImportance.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.feature}</span>
                        <Badge 
                          variant="outline"
                          className={
                            feature.type === 'numerical' ? 'border-primary text-primary' :
                            'border-accent text-accent'
                          }
                        >
                          {feature.type}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">
                        {(feature.importance * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={feature.importance * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Feature Importance Visualization */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Importance Visualization</CardTitle>
                <CardDescription>
                  Interactive feature importance plot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Feature Importance Bar Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shap" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SHAP Waterfall */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  SHAP Waterfall Plot
                </CardTitle>
                <CardDescription>
                  Feature contributions to this prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Base Value</span>
                    <span className="font-medium">0.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Final Prediction</span>
                    <span className="font-medium text-primary">0.87</span>
                  </div>
                </div>

                {shapValues.map((feature, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{feature.feature}</span>
                      <span className={`font-medium ${
                        feature.contribution === 'positive' ? 'text-success' : 'text-destructive'
                      }`}>
                        {feature.contribution === 'positive' ? '+' : ''}{feature.value.toFixed(3)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          feature.contribution === 'positive' ? 'bg-success' : 'bg-destructive'
                        }`}
                        style={{
                          width: `${Math.abs(feature.value) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SHAP Summary */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>SHAP Summary Plot</CardTitle>
                <CardDescription>
                  Feature impact distribution across dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">SHAP Beeswarm Plot</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LIME Explanation */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  LIME Local Explanation
                </CardTitle>
                <CardDescription>
                  Local interpretable model explanation for this instance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {limeExplanation.map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{item.feature}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          item.weight > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {item.weight > 0 ? '+' : ''}{item.weight.toFixed(2)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {(item.support * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          item.weight > 0 ? 'bg-success' : 'bg-destructive'
                        }`}
                        style={{
                          width: `${Math.abs(item.weight) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* LIME Visualization */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>LIME Visualization</CardTitle>
                <CardDescription>
                  Visual representation of local explanation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">LIME Feature Weights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pdp" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Partial Dependence Plot</CardTitle>
                <CardDescription>
                  How predictions change with feature values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pdp-feature">Select Feature</Label>
                    <Select defaultValue="income">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="age">Age</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">PDP for Income</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>ICE Plot</CardTitle>
                <CardDescription>
                  Individual conditional expectation curves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">ICE Curves</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="counterfactual" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Counterfactual Explanations
              </CardTitle>
              <CardDescription>
                What changes would flip this prediction?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counterfactuals.map((cf, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Required Change</h4>
                        <p className="text-sm text-muted-foreground">{cf.change}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Prediction Change</h4>
                        <Badge className="bg-accent/10 text-accent border-accent/20">
                          {cf.prediction}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Confidence</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={cf.confidence * 100} className="flex-1 h-2" />
                          <span className="text-sm font-medium">
                            {(cf.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-gradient-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Generate More Counterfactuals
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tree" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Decision Tree Visualization
              </CardTitle>
              <CardDescription>
                Visualize model decision paths (for tree-based models)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <Label htmlFor="tree-depth">Max Depth</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="mt-1 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 levels</SelectItem>
                        <SelectItem value="3">3 levels</SelectItem>
                        <SelectItem value="4">4 levels</SelectItem>
                        <SelectItem value="full">Full tree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tree-number">Tree Number</Label>
                    <Input
                      id="tree-number"
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="1"
                      className="mt-1 w-32"
                    />
                  </div>
                </div>
                
                <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Decision Tree</h3>
                    <p className="text-muted-foreground">
                      Visual representation of decision tree structure and splits
                    </p>
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

export default Explainability;