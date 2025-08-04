import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  Filter,
  Zap,
  RefreshCw
} from "lucide-react";

const Preprocessing = () => {
  const [preprocessingSteps, setPreprocessingSteps] = useState([
    { id: 1, name: "Handle Missing Values", enabled: true, method: "mean", applied: false },
    { id: 2, name: "Encode Categorical", enabled: true, method: "onehot", applied: false },
    { id: 3, name: "Scale Features", enabled: false, method: "standard", applied: false },
    { id: 4, name: "Remove Outliers", enabled: false, method: "iqr", applied: false },
  ]);

  const dataQuality = [
    { column: "age", missing: 0, outliers: 5, unique: 45, type: "numeric" },
    { column: "income", missing: 12, outliers: 15, unique: 8920, type: "numeric" },
    { column: "education", missing: 0, outliers: 0, unique: 4, type: "categorical" },
    { column: "location", missing: 8, outliers: 0, unique: 52, type: "categorical" },
    { column: "target", missing: 0, outliers: 0, unique: 2, type: "target" },
  ];

  const toggleStep = (id: number) => {
    setPreprocessingSteps(steps => 
      steps.map(step => 
        step.id === id ? { ...step, enabled: !step.enabled } : step
      )
    );
  };

  const applyStep = (id: number) => {
    setPreprocessingSteps(steps => 
      steps.map(step => 
        step.id === id ? { ...step, applied: true } : step
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Data Preprocessing
          </h1>
          <p className="text-muted-foreground mt-2">
            Clean and prepare your data for machine learning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button className="bg-gradient-primary">
            <Zap className="w-4 h-4 mr-2" />
            Apply All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Quality Overview */}
        <Card className="lg:col-span-2 bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Data Quality Overview
            </CardTitle>
            <CardDescription>
              Analysis of missing values, outliers, and data distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Column</th>
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Missing</th>
                    <th className="text-left p-3 font-semibold">Outliers</th>
                    <th className="text-left p-3 font-semibold">Unique</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataQuality.map((col, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="p-3 font-medium">{col.column}</td>
                      <td className="p-3">
                        <Badge variant="outline" className={
                          col.type === 'target' ? 'border-accent text-accent' :
                          col.type === 'numeric' ? 'border-primary text-primary' :
                          'border-secondary text-secondary-foreground'
                        }>
                          {col.type}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {col.missing > 0 ? (
                          <span className="text-warning font-medium">{col.missing}</span>
                        ) : (
                          <span className="text-success">0</span>
                        )}
                      </td>
                      <td className="p-3">
                        {col.outliers > 0 ? (
                          <span className="text-warning font-medium">{col.outliers}</span>
                        ) : (
                          <span className="text-success">0</span>
                        )}
                      </td>
                      <td className="p-3">{col.unique.toLocaleString()}</td>
                      <td className="p-3">
                        {col.missing === 0 && col.outliers === 0 ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-warning" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Processing Pipeline */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Processing Pipeline
            </CardTitle>
            <CardDescription>
              Configure preprocessing steps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {preprocessingSteps.map((step) => (
              <div key={step.id} className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor={`step-${step.id}`} className="font-medium">
                    {step.name}
                  </Label>
                  <Switch
                    id={`step-${step.id}`}
                    checked={step.enabled}
                    onCheckedChange={() => toggleStep(step.id)}
                  />
                </div>
                
                {step.enabled && (
                  <div className="space-y-3">
                    <Select defaultValue={step.method}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {step.name === "Handle Missing Values" && (
                          <>
                            <SelectItem value="mean">Mean Imputation</SelectItem>
                            <SelectItem value="median">Median Imputation</SelectItem>
                            <SelectItem value="knn">KNN Imputation</SelectItem>
                            <SelectItem value="drop">Drop Rows</SelectItem>
                          </>
                        )}
                        {step.name === "Encode Categorical" && (
                          <>
                            <SelectItem value="onehot">One-Hot Encoding</SelectItem>
                            <SelectItem value="label">Label Encoding</SelectItem>
                            <SelectItem value="frequency">Frequency Encoding</SelectItem>
                          </>
                        )}
                        {step.name === "Scale Features" && (
                          <>
                            <SelectItem value="standard">Standard Scaler</SelectItem>
                            <SelectItem value="minmax">Min-Max Scaler</SelectItem>
                            <SelectItem value="robust">Robust Scaler</SelectItem>
                          </>
                        )}
                        {step.name === "Remove Outliers" && (
                          <>
                            <SelectItem value="iqr">IQR Method</SelectItem>
                            <SelectItem value="zscore">Z-Score</SelectItem>
                            <SelectItem value="isolation">Isolation Forest</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      variant={step.applied ? "secondary" : "default"}
                      onClick={() => applyStep(step.id)}
                      disabled={step.applied}
                    >
                      {step.applied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply Step"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preprocessing Results */}
      <Card className="bg-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Preprocessing Results
          </CardTitle>
          <CardDescription>
            Before and after comparison of data transformations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="comparison">Before/After</TabsTrigger>
              <TabsTrigger value="distributions">Distributions</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Before Processing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Missing Values</p>
                      <p className="text-2xl font-bold text-warning">20</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Outliers</p>
                      <p className="text-2xl font-bold text-warning">20</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Features</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Rows</p>
                      <p className="text-2xl font-bold">10,000</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">After Processing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Missing Values</p>
                      <p className="text-2xl font-bold text-success">0</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Outliers</p>
                      <p className="text-2xl font-bold text-success">0</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Features</p>
                      <p className="text-2xl font-bold text-primary">12</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Rows</p>
                      <p className="text-2xl font-bold">9,980</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="distributions" className="space-y-4">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Distribution Analysis</h3>
                <p className="text-muted-foreground">
                  Interactive distribution plots will appear here after preprocessing
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="correlations" className="space-y-4">
              <div className="text-center py-12">
                <Filter className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Correlation Matrix</h3>
                <p className="text-muted-foreground">
                  Feature correlation heatmap will be displayed here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preprocessing;