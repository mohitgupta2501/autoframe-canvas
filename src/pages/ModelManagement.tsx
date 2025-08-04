import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FolderOpen, 
  Download, 
  Upload, 
  Archive,
  GitBranch,
  Star,
  Clock,
  Target,
  Settings,
  BarChart3,
  BarChart
} from "lucide-react";

const ModelManagement = () => {
  const [selectedModels, setSelectedModels] = useState<number[]>([]);

  const models = [
    { 
      id: 1, 
      name: "Customer Churn XGBoost v2.1", 
      version: "2.1", 
      accuracy: 94.2, 
      f1: 92.8, 
      created: "2024-01-15", 
      status: "production",
      size: "12.5 MB",
      framework: "XGBoost",
      author: "John Doe",
      deployments: 3
    },
    { 
      id: 2, 
      name: "Sales Forecast LightGBM v1.3", 
      version: "1.3", 
      accuracy: 89.1, 
      f1: 87.5, 
      created: "2024-01-12", 
      status: "staging",
      size: "8.2 MB",
      framework: "LightGBM",
      author: "Jane Smith",
      deployments: 1
    },
    { 
      id: 3, 
      name: "Fraud Detection CatBoost v1.0", 
      version: "1.0", 
      accuracy: 91.8, 
      f1: 90.2, 
      created: "2024-01-10", 
      status: "archived",
      size: "15.1 MB",
      framework: "CatBoost",
      author: "Mike Johnson",
      deployments: 0
    },
    { 
      id: 4, 
      name: "Recommendation Neural Net v3.2", 
      version: "3.2", 
      accuracy: 88.5, 
      f1: 86.9, 
      created: "2024-01-08", 
      status: "development",
      size: "45.8 MB",
      framework: "TensorFlow",
      author: "Sarah Wilson",
      deployments: 0
    },
  ];

  const modelVersions = [
    { version: "2.1", accuracy: 94.2, created: "2024-01-15", status: "current", changes: "Improved hyperparameters" },
    { version: "2.0", accuracy: 93.8, created: "2024-01-10", status: "previous", changes: "Added new features" },
    { version: "1.9", accuracy: 92.1, created: "2024-01-05", status: "archived", changes: "Initial production version" },
    { version: "1.8", accuracy: 90.5, created: "2024-01-01", status: "archived", changes: "Beta testing version" },
  ];

  const exportFormats = [
    { name: "Pickle", extension: ".pkl", description: "Python pickle format", supported: true },
    { name: "ONNX", extension: ".onnx", description: "Open Neural Network Exchange", supported: true },
    { name: "PMML", extension: ".pmml", description: "Predictive Model Markup Language", supported: true },
    { name: "TensorFlow", extension: ".pb", description: "TensorFlow SavedModel", supported: false },
    { name: "CoreML", extension: ".mlmodel", description: "Apple Core ML format", supported: false },
  ];

  const toggleModelSelection = (id: number) => {
    setSelectedModels(prev => 
      prev.includes(id) 
        ? prev.filter(modelId => modelId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Model Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage, version, and export your trained models
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Model
          </Button>
          <Button 
            variant="outline" 
            disabled={selectedModels.length !== 2}
          >
            <BarChart className="w-4 h-4 mr-2" />
            Compare Selected
          </Button>
          <Button className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Models
          </Button>
        </div>
      </div>

      <Tabs defaultValue="registry" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="registry">Model Registry</TabsTrigger>
          <TabsTrigger value="versions">Version Control</TabsTrigger>
          <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          <TabsTrigger value="export">Export & Import</TabsTrigger>
        </TabsList>

        <TabsContent value="registry" className="space-y-6">
          {/* Filter and Search */}
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="search">Search Models</Label>
                  <Input
                    id="search"
                    placeholder="Search by name, author, or framework..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="mt-1 w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="framework-filter">Framework</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="mt-1 w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Frameworks</SelectItem>
                      <SelectItem value="xgboost">XGBoost</SelectItem>
                      <SelectItem value="lightgbm">LightGBM</SelectItem>
                      <SelectItem value="catboost">CatBoost</SelectItem>
                      <SelectItem value="tensorflow">TensorFlow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Registry */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Model Registry
              </CardTitle>
              <CardDescription>
                All registered models with metadata and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.id} className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedModels.includes(model.id)}
                          onChange={() => toggleModelSelection(model.id)}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{model.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {model.framework} • {model.author} • {model.created}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-medium">{model.accuracy}% Accuracy</p>
                          <p className="text-xs text-muted-foreground">{model.f1}% F1</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{model.size}</p>
                          <p className="text-xs text-muted-foreground">v{model.version}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{model.deployments} deployments</p>
                          <Badge 
                            variant="outline"
                            className={
                              model.status === 'production' ? 'border-success text-success' :
                              model.status === 'staging' ? 'border-warning text-warning' :
                              model.status === 'development' ? 'border-primary text-primary' :
                              'border-muted-foreground text-muted-foreground'
                            }
                          >
                            {model.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          {model.status === 'production' && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 text-warning" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Version History */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Version History
                </CardTitle>
                <CardDescription>
                  Track model versions and changes over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {modelVersions.map((version, index) => (
                  <div key={index} className="p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          version.status === 'current' ? 'bg-success' :
                          version.status === 'previous' ? 'bg-warning' :
                          'bg-muted-foreground'
                        }`} />
                        <span className="font-medium">v{version.version}</span>
                        <Badge 
                          variant="outline"
                          className={
                            version.status === 'current' ? 'border-success text-success' :
                            version.status === 'previous' ? 'border-warning text-warning' :
                            'border-muted-foreground text-muted-foreground'
                          }
                        >
                          {version.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{version.created}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{version.changes}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accuracy: {version.accuracy}%</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                        {version.status !== 'current' && (
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Version Comparison */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Tracking
                </CardTitle>
                <CardDescription>
                  Performance metrics across versions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Version Performance Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Model Comparison
              </CardTitle>
              <CardDescription>
                Compare selected models side by side
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedModels.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select Models to Compare</h3>
                  <p className="text-muted-foreground">
                    Choose 2 or more models from the registry to see a detailed comparison
                  </p>
                </div>
              ) : selectedModels.length === 1 ? (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select One More Model</h3>
                  <p className="text-muted-foreground">
                    Select at least one more model to enable comparison
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold">Metric</th>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return (
                              <th key={id} className="text-left p-3 font-semibold">{model?.name}</th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Accuracy</td>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return <td key={id} className="p-3">{model?.accuracy}%</td>;
                          })}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">F1 Score</td>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return <td key={id} className="p-3">{model?.f1}%</td>;
                          })}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Model Size</td>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return <td key={id} className="p-3">{model?.size}</td>;
                          })}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Framework</td>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return <td key={id} className="p-3">{model?.framework}</td>;
                          })}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="p-3 font-medium">Status</td>
                          {selectedModels.map(id => {
                            const model = models.find(m => m.id === id);
                            return (
                              <td key={id} className="p-3">
                                <Badge variant="outline">{model?.status}</Badge>
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Options */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Models
                </CardTitle>
                <CardDescription>
                  Export models in various formats for deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="export-model">Select Model</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map(model => (
                        <SelectItem key={model.id} value={model.id.toString()}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Export Formats</Label>
                  {exportFormats.map((format, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          disabled={!format.supported}
                          defaultChecked={format.name === 'Pickle' && format.supported}
                        />
                        <div>
                          <p className="font-medium">{format.name}</p>
                          <p className="text-sm text-muted-foreground">{format.description}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={format.supported ? 'border-success text-success' : 'border-muted-foreground text-muted-foreground'}
                      >
                        {format.supported ? 'Supported' : 'Coming Soon'}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected Formats
                </Button>
              </CardContent>
            </Card>

            {/* Import Models */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import Models
                </CardTitle>
                <CardDescription>
                  Import pre-trained models from external sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <h4 className="font-medium mb-2">Upload Model Files</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Supports .pkl, .onnx, .pmml, .pb files
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input
                      id="model-name"
                      placeholder="Enter model name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model-description">Description</Label>
                    <Input
                      id="model-description"
                      placeholder="Brief description of the model"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model-tags">Tags</Label>
                    <Input
                      id="model-tags"
                      placeholder="classification, ensemble, production"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary" disabled>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Model
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelManagement;