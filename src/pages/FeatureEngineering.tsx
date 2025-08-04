import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Zap, 
  TrendingUp, 
  Filter,
  CheckCircle,
  Clock,
  BarChart3,
  Brain
} from "lucide-react";

const FeatureEngineering = () => {
  const [features, setFeatures] = useState([
    { id: 1, name: "age", type: "original", selected: true, importance: 0.85 },
    { id: 2, name: "income", type: "original", selected: true, importance: 0.92 },
    { id: 3, name: "education_encoded", type: "transformed", selected: true, importance: 0.76 },
    { id: 4, name: "age_income_ratio", type: "generated", selected: false, importance: 0.45 },
    { id: 5, name: "income_log", type: "transformed", selected: false, importance: 0.63 },
    { id: 6, name: "education_age_interaction", type: "generated", selected: false, importance: 0.38 },
  ]);

  const autoFeatures = [
    { name: "Polynomial Features", description: "Generate polynomial and interaction features", enabled: false },
    { name: "Target Encoding", description: "Encode categorical variables using target statistics", enabled: true },
    { name: "Date Extractions", description: "Extract day, month, year, weekday from datetime", enabled: false },
    { name: "Binning", description: "Create bins for continuous variables", enabled: false },
    { name: "Text Features", description: "TF-IDF and n-gram features from text columns", enabled: false },
  ];

  const dimensionalityOptions = [
    { name: "PCA", description: "Principal Component Analysis", variance: 95, components: 8 },
    { name: "UMAP", description: "Uniform Manifold Approximation", neighbors: 15, components: 3 },
    { name: "t-SNE", description: "t-Distributed Stochastic Neighbor Embedding", perplexity: 30, components: 2 },
  ];

  const toggleFeature = (id: number) => {
    setFeatures(features => 
      features.map(feature => 
        feature.id === id ? { ...feature, selected: !feature.selected } : feature
      )
    );
  };

  const selectedCount = features.filter(f => f.selected).length;
  const totalCount = features.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Feature Engineering
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and select features to improve model performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Feature Importance
          </Button>
          <Button className="bg-gradient-primary">
            <Zap className="w-4 h-4 mr-2" />
            Auto Generate
          </Button>
        </div>
      </div>

      {/* Feature Selection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{selectedCount}</p>
            <p className="text-sm text-muted-foreground">Selected Features</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{totalCount}</p>
            <p className="text-sm text-muted-foreground">Total Features</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{features.filter(f => f.type === 'generated' && f.selected).length}</p>
            <p className="text-sm text-muted-foreground">Generated</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-model-training">92.3%</p>
            <p className="text-sm text-muted-foreground">Avg Importance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="features" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Feature Selection</TabsTrigger>
          <TabsTrigger value="generation">Auto Generation</TabsTrigger>
          <TabsTrigger value="dimensionality">Dimensionality</TabsTrigger>
          <TabsTrigger value="importance">Importance</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Feature Selection
              </CardTitle>
              <CardDescription>
                Select features to include in your model training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={feature.selected}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline"
                            className={
                              feature.type === 'original' ? 'border-primary text-primary' :
                              feature.type === 'transformed' ? 'border-accent text-accent' :
                              'border-success text-success'
                            }
                          >
                            {feature.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Importance: {(feature.importance * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress value={feature.importance * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Automated Feature Generation
              </CardTitle>
              <CardDescription>
                Configure automatic feature generation techniques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {autoFeatures.map((technique, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{technique.name}</h4>
                      <p className="text-sm text-muted-foreground">{technique.description}</p>
                    </div>
                    <Switch defaultChecked={technique.enabled} />
                  </div>
                  {technique.enabled && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <Button size="sm" variant="outline" className="w-full">
                        Configure Parameters
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4">
                <Button className="w-full bg-gradient-primary">
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dimensionality" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Dimensionality Reduction
              </CardTitle>
              <CardDescription>
                Reduce feature dimensions while preserving information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dimensionalityOptions.map((option, index) => (
                <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    {option.name === 'PCA' && (
                      <p>Variance Explained: {option.variance}% → {option.components} components</p>
                    )}
                    {option.name === 'UMAP' && (
                      <p>Neighbors: {option.neighbors} → {option.components} components</p>
                    )}
                    {option.name === 't-SNE' && (
                      <p>Perplexity: {option.perplexity} → {option.components} components</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="importance" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Feature Importance Analysis
              </CardTitle>
              <CardDescription>
                Understand which features contribute most to predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Feature Importance Bar Chart</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">Permutation Importance</p>
                    </div>
                  </div>
                  <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-8 h-8 mx-auto text-muted-foreground mb-1" />
                      <p className="text-xs text-muted-foreground">SHAP Values</p>
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

export default FeatureEngineering;