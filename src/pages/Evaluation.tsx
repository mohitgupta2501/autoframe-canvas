import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Download,
  Settings,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Evaluation = () => {
  const models = [
    { name: "XGBoost", accuracy: 94.2, f1: 92.8, precision: 93.5, recall: 92.1, auc: 96.7, status: "best" },
    { name: "LightGBM", accuracy: 92.1, f1: 91.2, precision: 90.8, recall: 91.6, auc: 94.3, status: "good" },
    { name: "CatBoost", accuracy: 91.8, f1: 90.9, precision: 91.2, recall: 90.6, auc: 93.9, status: "good" },
    { name: "Random Forest", accuracy: 89.5, f1: 88.7, precision: 89.1, recall: 88.3, auc: 92.1, status: "baseline" },
  ];

  const confusionMatrix = {
    truePositive: 1420,
    falsePositive: 95,
    falseNegative: 128,
    trueNegative: 857
  };

  const classificationReport = [
    { class: "Class 0 (No)", precision: 87.0, recall: 90.0, f1Score: 88.5, support: 952 },
    { class: "Class 1 (Yes)", precision: 93.7, recall: 91.7, f1Score: 92.7, support: 1548 },
    { class: "Macro Avg", precision: 90.4, recall: 90.9, f1Score: 90.6, support: 2500 },
    { class: "Weighted Avg", precision: 91.2, recall: 91.0, f1Score: 91.1, support: 2500 },
  ];

  const [threshold, setThreshold] = useState([0.5]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Model Evaluation
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze model performance and validate results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button className="bg-gradient-primary">
            <Target className="w-4 h-4 mr-2" />
            Compare Models
          </Button>
        </div>
      </div>

      {/* Model Performance Overview */}
      <Card className="bg-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Model Performance Comparison
          </CardTitle>
          <CardDescription>
            Performance metrics across all trained models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Model</th>
                  <th className="text-left p-3 font-semibold">Accuracy</th>
                  <th className="text-left p-3 font-semibold">F1 Score</th>
                  <th className="text-left p-3 font-semibold">Precision</th>
                  <th className="text-left p-3 font-semibold">Recall</th>
                  <th className="text-left p-3 font-semibold">AUC-ROC</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="p-3 font-medium">{model.name}</td>
                    <td className="p-3">{model.accuracy}%</td>
                    <td className="p-3">{model.f1}%</td>
                    <td className="p-3">{model.precision}%</td>
                    <td className="p-3">{model.recall}%</td>
                    <td className="p-3">{model.auc}%</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline"
                        className={
                          model.status === 'best' ? 'border-success text-success' :
                          model.status === 'good' ? 'border-primary text-primary' :
                          'border-muted-foreground text-muted-foreground'
                        }
                      >
                        {model.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
          <TabsTrigger value="curves">ROC/PR Curves</TabsTrigger>
          <TabsTrigger value="threshold">Threshold Tuning</TabsTrigger>
          <TabsTrigger value="regression">Regression Plots</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classification Report */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Classification Report
                </CardTitle>
                <CardDescription>
                  Detailed per-class performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 font-semibold">Class</th>
                        <th className="text-left p-2 font-semibold">Precision</th>
                        <th className="text-left p-2 font-semibold">Recall</th>
                        <th className="text-left p-2 font-semibold">F1-Score</th>
                        <th className="text-left p-2 font-semibold">Support</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classificationReport.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="p-2 font-medium">{row.class}</td>
                          <td className="p-2">{row.precision}%</td>
                          <td className="p-2">{row.recall}%</td>
                          <td className="p-2">{row.f1Score}%</td>
                          <td className="p-2">{row.support}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Performance Metrics
                </CardTitle>
                <CardDescription>
                  Overall model performance summary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-2xl font-bold text-primary">94.2%</p>
                    <Progress value={94.2} className="h-2 mt-2" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                    <p className="text-2xl font-bold text-accent">92.8%</p>
                    <Progress value={92.8} className="h-2 mt-2" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Precision</p>
                    <p className="text-2xl font-bold text-success">93.5%</p>
                    <Progress value={93.5} className="h-2 mt-2" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Recall</p>
                    <p className="text-2xl font-bold text-warning">92.1%</p>
                    <Progress value={92.1} className="h-2 mt-2" />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">Model Performance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent performance across all metrics. Model is ready for deployment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="confusion" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confusion Matrix Visualization */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Confusion Matrix
                </CardTitle>
                <CardDescription>
                  Visual representation of prediction accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center text-sm text-muted-foreground">Predicted</div>
                  <div></div>
                  <div className="text-center text-sm text-muted-foreground">No</div>
                  <div className="text-center text-sm text-muted-foreground">Yes</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center text-sm text-muted-foreground">Actual</div>
                  <div className="text-center text-sm text-muted-foreground">No</div>
                  <div className="text-center text-sm text-muted-foreground">Yes</div>
                  
                  <div className="text-center text-sm text-muted-foreground">No</div>
                  <div className="p-4 text-center bg-success/20 rounded border border-success/30">
                    <div className="text-lg font-bold text-success">{confusionMatrix.trueNegative}</div>
                    <div className="text-xs">True Negative</div>
                  </div>
                  <div className="p-4 text-center bg-destructive/20 rounded border border-destructive/30">
                    <div className="text-lg font-bold text-destructive">{confusionMatrix.falsePositive}</div>
                    <div className="text-xs">False Positive</div>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">Yes</div>
                  <div className="p-4 text-center bg-destructive/20 rounded border border-destructive/30">
                    <div className="text-lg font-bold text-destructive">{confusionMatrix.falseNegative}</div>
                    <div className="text-xs">False Negative</div>
                  </div>
                  <div className="p-4 text-center bg-success/20 rounded border border-success/30">
                    <div className="text-lg font-bold text-success">{confusionMatrix.truePositive}</div>
                    <div className="text-xs">True Positive</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confusion Matrix Metrics */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Matrix Analysis</CardTitle>
                <CardDescription>
                  Derived metrics from confusion matrix
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">True Positive Rate (Sensitivity)</span>
                    <span className="font-medium">91.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">True Negative Rate (Specificity)</span>
                    <span className="font-medium">90.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Positive Predictive Value</span>
                    <span className="font-medium">93.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Negative Predictive Value</span>
                    <span className="font-medium">87.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">False Positive Rate</span>
                    <span className="font-medium">10.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">False Negative Rate</span>
                    <span className="font-medium">8.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curves" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>ROC Curve</CardTitle>
                <CardDescription>
                  Receiver Operating Characteristic curve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">ROC Curve (AUC = 0.967)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Precision-Recall Curve</CardTitle>
                <CardDescription>
                  Precision vs Recall trade-off
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">PR Curve (AP = 0.943)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threshold" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Threshold Tuning
              </CardTitle>
              <CardDescription>
                Optimize classification threshold for your use case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <Label>Classification Threshold: {threshold[0]}</Label>
                    <Slider
                      value={threshold}
                      onValueChange={setThreshold}
                      max={1}
                      min={0}
                      step={0.01}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Metrics at Current Threshold</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Precision</p>
                        <p className="text-lg font-bold">93.5%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Recall</p>
                        <p className="text-lg font-bold">92.1%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">F1 Score</p>
                        <p className="text-lg font-bold">92.8%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-lg font-bold">94.2%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Threshold vs Metrics Plot</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regression" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Actual vs Predicted</CardTitle>
                <CardDescription>
                  Scatter plot of actual vs predicted values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Prediction Accuracy Plot</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle>Residuals Plot</CardTitle>
                <CardDescription>
                  Distribution of prediction errors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Residuals Distribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Evaluation;