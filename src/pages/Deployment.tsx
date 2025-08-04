import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Rocket, 
  Activity, 
  Server, 
  Key,
  Globe,
  Monitor,
  AlertCircle,
  CheckCircle,
  Copy,
  Settings,
  BarChart3
} from "lucide-react";

const Deployment = () => {
  const [deploymentType, setDeploymentType] = useState("api");
  const [apiKey] = useState("ak_prod_9f8e7d6c5b4a3210fedcba0987654321");

  const deployments = [
    { 
      id: 1, 
      name: "Customer Churn API", 
      model: "XGBoost v2.1", 
      status: "active", 
      endpoint: "https://api.automl.com/predict/churn",
      requests: 15420,
      uptime: 99.9,
      latency: 45,
      created: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Sales Forecast Batch", 
      model: "LightGBM v1.3", 
      status: "active", 
      endpoint: "https://api.automl.com/batch/forecast",
      requests: 8750,
      uptime: 99.5,
      latency: 120,
      created: "2024-01-12"
    },
    { 
      id: 3, 
      name: "Fraud Detection RT", 
      model: "CatBoost v1.0", 
      status: "stopped", 
      endpoint: "https://api.automl.com/realtime/fraud",
      requests: 0,
      uptime: 0,
      latency: 0,
      created: "2024-01-10"
    },
  ];

  const metrics = {
    totalRequests: 24170,
    successRate: 99.2,
    avgLatency: 67,
    activeEndpoints: 2,
    dataProcessed: "1.2TB",
    errorRate: 0.8
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Model Deployment
          </h1>
          <p className="text-muted-foreground mt-2">
            Deploy and monitor your models in production
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Monitor className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button className="bg-gradient-primary">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy New Model
          </Button>
        </div>
      </div>

      {/* Deployment Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{metrics.totalRequests.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{metrics.successRate}%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{metrics.avgLatency}ms</p>
            <p className="text-sm text-muted-foreground">Avg Latency</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">{metrics.activeEndpoints}</p>
            <p className="text-sm text-muted-foreground">Active Endpoints</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-model-training">{metrics.dataProcessed}</p>
            <p className="text-sm text-muted-foreground">Data Processed</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{metrics.errorRate}%</p>
            <p className="text-sm text-muted-foreground">Error Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deployments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="deployments">Active Deployments</TabsTrigger>
          <TabsTrigger value="deploy">Deploy Model</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="api">API Management</TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Active Deployments
              </CardTitle>
              <CardDescription>
                Monitor and manage your deployed models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deployments.map((deployment) => (
                  <div key={deployment.id} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          deployment.status === 'active' ? 'bg-success animate-pulse' : 'bg-muted-foreground'
                        }`} />
                        <div>
                          <h4 className="font-semibold">{deployment.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {deployment.model} • Created {deployment.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline"
                          className={
                            deployment.status === 'active' ? 'border-success text-success' :
                            'border-muted-foreground text-muted-foreground'
                          }
                        >
                          {deployment.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          {deployment.status === 'active' ? (
                            <Button variant="outline" size="sm">
                              Stop
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" className="bg-success/10 text-success border-success/20">
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Requests (24h)</p>
                        <p className="text-lg font-bold">{deployment.requests.toLocaleString()}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Uptime</p>
                        <p className="text-lg font-bold">{deployment.uptime}%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Avg Latency</p>
                        <p className="text-lg font-bold">{deployment.latency}ms</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Endpoint</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-mono truncate">{deployment.endpoint}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(deployment.endpoint)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deployment Configuration */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Deploy New Model
                </CardTitle>
                <CardDescription>
                  Configure and deploy a model to production
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deploy-model">Select Model</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Customer Churn XGBoost v2.1</SelectItem>
                      <SelectItem value="2">Sales Forecast LightGBM v1.3</SelectItem>
                      <SelectItem value="3">Fraud Detection CatBoost v1.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deployment-name">Deployment Name</Label>
                  <Input
                    id="deployment-name"
                    placeholder="Enter deployment name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Deployment Type</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="api-type" 
                        name="deployment-type" 
                        value="api"
                        checked={deploymentType === "api"}
                        onChange={(e) => setDeploymentType(e.target.value)}
                      />
                      <Label htmlFor="api-type">REST API Endpoint</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="batch-type" 
                        name="deployment-type" 
                        value="batch"
                        checked={deploymentType === "batch"}
                        onChange={(e) => setDeploymentType(e.target.value)}
                      />
                      <Label htmlFor="batch-type">Batch Processing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="realtime-type" 
                        name="deployment-type" 
                        value="realtime"
                        checked={deploymentType === "realtime"}
                        onChange={(e) => setDeploymentType(e.target.value)}
                      />
                      <Label htmlFor="realtime-type">Real-time Streaming</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-scaling">Auto Scaling</Label>
                    <Switch id="auto-scaling" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monitoring">Enable Monitoring</Label>
                    <Switch id="monitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="logging">Request Logging</Label>
                    <Switch id="logging" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Configuration */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Resource Configuration
                </CardTitle>
                <CardDescription>
                  Configure compute resources and scaling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instance-type">Instance Type</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (1 CPU, 2GB RAM)</SelectItem>
                      <SelectItem value="standard">Standard (2 CPU, 4GB RAM)</SelectItem>
                      <SelectItem value="performance">Performance (4 CPU, 8GB RAM)</SelectItem>
                      <SelectItem value="gpu">GPU Accelerated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-instances">Min Instances</Label>
                    <Input
                      id="min-instances"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-instances">Max Instances</Label>
                    <Input
                      id="max-instances"
                      type="number"
                      min="1"
                      max="100"
                      defaultValue="5"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    min="1"
                    max="300"
                    defaultValue="30"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                  <Input
                    id="memory-limit"
                    type="number"
                    min="128"
                    max="8192"
                    defaultValue="512"
                    className="mt-1"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-gradient-primary">
                    <Rocket className="w-4 h-4 mr-2" />
                    Deploy Model
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Real-time performance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Requests/minute</p>
                      <p className="text-2xl font-bold text-primary">245</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">Error Rate</p>
                      <p className="text-2xl font-bold text-destructive">0.8%</p>
                    </div>
                  </div>

                  <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Request Volume Chart</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System Health
                </CardTitle>
                <CardDescription>
                  Infrastructure and service status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Gateway</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Load Balancer</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Model Instances</span>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-sm">2/3 Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Healthy</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk Usage</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Logs */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Recent Alerts & Logs
              </CardTitle>
              <CardDescription>
                System alerts and deployment logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="font-medium text-sm">High Latency Alert</span>
                    <span className="text-xs text-muted-foreground">2 minutes ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer Churn API response time increased to 120ms (threshold: 100ms)
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-medium text-sm">Deployment Successful</span>
                    <span className="text-xs text-muted-foreground">15 minutes ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sales Forecast API v1.3 deployed successfully to production
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Auto-scaling Event</span>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scaled up Customer Churn API from 2 to 3 instances due to increased load
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Keys */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Key Management
                </CardTitle>
                <CardDescription>
                  Manage API keys and access tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Production API Key</span>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted p-2 rounded flex-1 font-mono">
                      {apiKey}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyToClipboard(apiKey)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last used: 5 minutes ago • Created: Jan 15, 2024
                  </p>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Key className="w-4 h-4 mr-2" />
                    Generate New API Key
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Documentation */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  API Documentation
                </CardTitle>
                <CardDescription>
                  Integration guides and examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Example Request</h4>
                    <code className="text-xs bg-card p-3 rounded block">
                      {`curl -X POST \\
  https://api.automl.com/predict/churn \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"age": 35, "income": 50000}'`}
                    </code>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Example Response</h4>
                    <code className="text-xs bg-card p-3 rounded block">
                      {`{
  "prediction": "No",
  "probability": 0.87,
  "model_version": "2.1",
  "request_id": "req_123456"
}`}
                    </code>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Globe className="w-4 h-4 mr-2" />
                    Full Docs
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Code Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deployment;