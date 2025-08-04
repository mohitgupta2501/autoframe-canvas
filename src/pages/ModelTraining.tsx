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
  Brain, 
  Play, 
  Pause, 
  Settings, 
  Target,
  Clock,
  Zap,
  BarChart3,
  Activity
} from "lucide-react";

const ModelTraining = () => {
  const [trainingStatus, setTrainingStatus] = useState("idle"); // idle, training, completed
  const [trainingProgress, setTrainingProgress] = useState(0);

  const models = [
    { name: "XGBoost", description: "Gradient boosting framework", category: "ensemble", status: "available" },
    { name: "LightGBM", description: "Light gradient boosting machine", category: "ensemble", status: "available" },
    { name: "CatBoost", description: "Categorical boosting", category: "ensemble", status: "available" },
    { name: "Random Forest", description: "Random forest classifier", category: "ensemble", status: "available" },
    { name: "Neural Network", description: "Multi-layer perceptron", category: "deep", status: "available" },
    { name: "Support Vector Machine", description: "SVM with RBF kernel", category: "traditional", status: "available" },
  ];

  const trainingJobs = [
    { id: 1, model: "XGBoost", status: "completed", accuracy: 94.2, duration: "5m 23s", started: "2 hours ago" },
    { id: 2, model: "LightGBM", status: "training", accuracy: 89.1, duration: "3m 45s", started: "45 minutes ago" },
    { id: 3, model: "CatBoost", status: "queued", accuracy: null, duration: null, started: "pending" },
  ];

  const hyperparameters: Record<string, Record<string, { type: string; min: number; max: number; default: number }>> = {
    "XGBoost": {
      "max_depth": { type: "range", min: 3, max: 10, default: 6 },
      "learning_rate": { type: "range", min: 0.01, max: 0.3, default: 0.1 },
      "n_estimators": { type: "range", min: 50, max: 1000, default: 100 },
      "subsample": { type: "range", min: 0.5, max: 1.0, default: 1.0 }
    },
    "LightGBM": {
      "num_leaves": { type: "range", min: 10, max: 300, default: 31 },
      "learning_rate": { type: "range", min: 0.01, max: 0.3, default: 0.1 },
      "feature_fraction": { type: "range", min: 0.4, max: 1.0, default: 1.0 },
      "bagging_fraction": { type: "range", min: 0.4, max: 1.0, default: 1.0 }
    }
  };

  const [selectedModel, setSelectedModel] = useState("XGBoost");

  const startTraining = () => {
    setTrainingStatus("training");
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTrainingStatus("completed");
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Model Training
          </h1>
          <p className="text-muted-foreground mt-2">
            Train and optimize machine learning models
          </p>
        </div>
        <div className="flex gap-2">
          {trainingStatus === "training" ? (
            <Button variant="destructive">
              <Pause className="w-4 h-4 mr-2" />
              Stop Training
            </Button>
          ) : (
            <Button className="bg-gradient-primary" onClick={startTraining}>
              <Play className="w-4 h-4 mr-2" />
              Start Training
            </Button>
          )}
        </div>
      </div>

      {/* Training Status */}
      {trainingStatus === "training" && (
        <Card className="bg-card shadow-card border-border border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Training {selectedModel}</h3>
                  <p className="text-sm text-muted-foreground">Fold 3/5 - Epoch 45/100</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Training
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{trainingProgress.toFixed(1)}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Estimated time remaining: 2m 15s
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Model Selection</TabsTrigger>
          <TabsTrigger value="hyperparameters">Hyperparameters</TabsTrigger>
          <TabsTrigger value="validation">Cross Validation</TabsTrigger>
          <TabsTrigger value="jobs">Training Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <Card 
                key={model.name} 
                className={`bg-card shadow-card border-border cursor-pointer transition-all hover:shadow-glow ${
                  selectedModel === model.name ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedModel(model.name)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    {model.name}
                  </CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline"
                      className={
                        model.category === 'ensemble' ? 'border-primary text-primary' :
                        model.category === 'deep' ? 'border-accent text-accent' :
                        'border-secondary text-secondary-foreground'
                      }
                    >
                      {model.category}
                    </Badge>
                    <Badge className="bg-success/10 text-success border-success/20">
                      {model.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hyperparameters" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Hyperparameters
                </CardTitle>
                <CardDescription>
                  Configure {selectedModel} parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedModel && hyperparameters[selectedModel] && Object.entries(hyperparameters[selectedModel]).map(([param, config]) => (
                  <div key={param} className="space-y-2">
                    <Label htmlFor={param} className="flex items-center justify-between">
                      <span>{param.replace('_', ' ')}</span>
                      <span className="text-xs text-muted-foreground">
                        {config.min} - {config.max}
                      </span>
                    </Label>
                    <Input
                      id={param}
                      type="number"
                      min={config.min}
                      max={config.max}
                      step={config.min < 1 ? 0.01 : 1}
                      defaultValue={config.default}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Hyperparameter Tuning
                </CardTitle>
                <CardDescription>
                  Automated parameter optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="tuning-method">Optimization Method</Label>
                    <Select defaultValue="optuna">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="optuna">Optuna (Bayesian)</SelectItem>
                        <SelectItem value="grid">Grid Search</SelectItem>
                        <SelectItem value="random">Random Search</SelectItem>
                        <SelectItem value="hyperopt">Hyperopt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="trials">Number of Trials</Label>
                    <Input
                      id="trials"
                      type="number"
                      min="10"
                      max="1000"
                      defaultValue="50"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="metric">Optimization Metric</Label>
                    <Select defaultValue="accuracy">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accuracy">Accuracy</SelectItem>
                        <SelectItem value="f1">F1 Score</SelectItem>
                        <SelectItem value="auc">AUC-ROC</SelectItem>
                        <SelectItem value="precision">Precision</SelectItem>
                        <SelectItem value="recall">Recall</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-gradient-ai">
                    <Target className="w-4 h-4 mr-2" />
                    Start Hyperparameter Tuning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cross Validation Setup
              </CardTitle>
              <CardDescription>
                Configure validation strategy and metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cv-method">Validation Method</Label>
                    <Select defaultValue="kfold">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kfold">K-Fold Cross Validation</SelectItem>
                        <SelectItem value="stratified">Stratified K-Fold</SelectItem>
                        <SelectItem value="timeseries">Time Series Split</SelectItem>
                        <SelectItem value="holdout">Hold-out Validation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="folds">Number of Folds</Label>
                    <Input
                      id="folds"
                      type="number"
                      min="2"
                      max="20"
                      defaultValue="5"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="test-size">Test Size</Label>
                    <Input
                      id="test-size"
                      type="number"
                      min="0.1"
                      max="0.5"
                      step="0.05"
                      defaultValue="0.2"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Evaluation Metrics</Label>
                    <div className="mt-2 space-y-2">
                      {['Accuracy', 'F1 Score', 'Precision', 'Recall', 'AUC-ROC'].map((metric) => (
                        <div key={metric} className="flex items-center space-x-2">
                          <input type="checkbox" id={metric} defaultChecked={metric === 'Accuracy'} />
                          <Label htmlFor={metric} className="text-sm">{metric}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Training Jobs
              </CardTitle>
              <CardDescription>
                Monitor current and historical training jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div key={job.id} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          job.status === 'completed' ? 'bg-success' :
                          job.status === 'training' ? 'bg-warning animate-pulse' :
                          'bg-muted-foreground'
                        }`} />
                        <div>
                          <h4 className="font-medium">{job.model}</h4>
                          <p className="text-sm text-muted-foreground">Started {job.started}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {job.accuracy && (
                          <div className="text-right">
                            <p className="font-medium">{job.accuracy}%</p>
                            <p className="text-xs text-muted-foreground">Accuracy</p>
                          </div>
                        )}
                        {job.duration && (
                          <div className="text-right">
                            <p className="font-medium">{job.duration}</p>
                            <p className="text-xs text-muted-foreground">Duration</p>
                          </div>
                        )}
                        <Badge 
                          variant="outline"
                          className={
                            job.status === 'completed' ? 'border-success text-success' :
                            job.status === 'training' ? 'border-warning text-warning' :
                            'border-muted-foreground text-muted-foreground'
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelTraining;