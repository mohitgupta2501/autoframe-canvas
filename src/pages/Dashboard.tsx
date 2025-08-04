import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Brain, 
  Database, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";
import automlHero from "@/assets/automl-hero.jpg";

const Dashboard = () => {
  const recentModels = [
    { name: "Customer Churn Predictor", accuracy: 94.2, status: "deployed", type: "XGBoost" },
    { name: "Sales Forecasting", mae: 12.5, status: "training", type: "LightGBM" },
    { name: "Fraud Detection", f1: 88.7, status: "evaluating", type: "CatBoost" },
  ];

  const projectStats = [
    { title: "Active Projects", value: "12", icon: Database, change: "+2" },
    { title: "Models Deployed", value: "28", icon: Brain, change: "+5" },
    { title: "Avg Accuracy", value: "91.3%", icon: TrendingUp, change: "+1.2%" },
    { title: "Data Sources", value: "8", icon: BarChart3, change: "+1" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <img 
          src={automlHero} 
          alt="AutoML Platform" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60 flex items-center justify-between p-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to AutoML Pro
            </h1>
            <p className="text-white/90 text-lg">
              Build, train, and deploy machine learning models with ease
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-white/90">
            Start New Project
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat) => (
          <Card key={stat.title} className="bg-card shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Models */}
        <Card className="lg:col-span-2 bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Recent Models
            </CardTitle>
            <CardDescription>
              Your latest machine learning models and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentModels.map((model, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {model.accuracy ? `${model.accuracy}% Accuracy` : 
                         model.mae ? `${model.mae} MAE` : 
                         `${model.f1}% F1-Score`}
                      </p>
                      <Badge 
                        variant={model.status === 'deployed' ? 'default' : 
                                model.status === 'training' ? 'secondary' : 'outline'}
                        className={
                          model.status === 'deployed' ? 'bg-success text-success-foreground' :
                          model.status === 'training' ? 'bg-warning text-warning-foreground' :
                          'border-accent text-accent'
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-primary hover:opacity-90">
                <Database className="w-4 h-4 mr-2" />
                Upload New Dataset
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Train New Model
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Explore Data
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Queue</span>
                  <span>3/10</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>GPU Usage</span>
                  <span>67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Used</span>
                  <span>2.1TB / 5TB</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>All services operational</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-warning" />
                  <span>Maintenance in 2 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;