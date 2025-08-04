import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Database, 
  Cloud, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Info,
  ExternalLink
} from "lucide-react";

const DataIngestion = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mock data preview
  const previewData = [
    { id: 1, age: 25, income: 50000, education: "Bachelor", target: "Yes" },
    { id: 2, age: 32, income: 75000, education: "Master", target: "No" },
    { id: 3, age: 28, income: 60000, education: "Bachelor", target: "Yes" },
    { id: 4, age: 45, income: 90000, education: "PhD", target: "No" },
    { id: 5, age: 23, income: 40000, education: "Bachelor", target: "Yes" },
  ];

  const columnTypes = [
    { name: "id", type: "Numeric", detected: "Integer", status: "valid" },
    { name: "age", type: "Numeric", detected: "Integer", status: "valid" },
    { name: "income", type: "Numeric", detected: "Float", status: "valid" },
    { name: "education", type: "Categorical", detected: "String", status: "valid" },
    { name: "target", type: "Categorical", detected: "String", status: "target" },
  ];

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Data Ingestion
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload and connect your data sources for machine learning
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Documentation
        </Button>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            File Upload
          </TabsTrigger>
          <TabsTrigger value="connectors" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data Connectors
          </TabsTrigger>
          <TabsTrigger value="cloud" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Cloud Storage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Files
                </CardTitle>
                <CardDescription>
                  Upload CSV, Excel, or JSON files for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <Button onClick={handleFileUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Select Files"}
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading customer_data.csv</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  <p>Supported formats: CSV, Excel (.xlsx), JSON</p>
                  <p>Maximum file size: 500MB</p>
                </div>
              </CardContent>
            </Card>

            {/* Schema Validation */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Schema Validation
                </CardTitle>
                <CardDescription>
                  Auto-detected column types and validation results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columnTypes.map((col) => (
                    <div key={col.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{col.name}</p>
                          <p className="text-sm text-muted-foreground">{col.detected}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={col.status === 'target' ? 'default' : 'secondary'}
                          className={col.status === 'target' ? 'bg-accent text-accent-foreground' : ''}
                        >
                          {col.type}
                        </Badge>
                        {col.status === 'valid' ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : col.status === 'target' ? (
                          <Info className="w-4 h-4 text-accent" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-warning" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
              <CardDescription>
                Preview of the first 10 rows from your dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="text-left p-3 font-semibold">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="p-3">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing 5 of 10,000 rows
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View All Columns</Button>
                  <Button variant="outline" size="sm">Export Sample</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connectors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "PostgreSQL", icon: Database, status: "available" },
              { name: "MongoDB", icon: Database, status: "available" },
              { name: "MySQL", icon: Database, status: "available" },
              { name: "Redis", icon: Database, status: "coming_soon" },
              { name: "Elasticsearch", icon: Database, status: "coming_soon" },
              { name: "Snowflake", icon: Database, status: "enterprise" },
            ].map((connector) => (
              <Card key={connector.name} className="bg-card shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <connector.icon className="w-5 h-5" />
                    {connector.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge 
                    variant={connector.status === 'available' ? 'default' : 'secondary'}
                    className={
                      connector.status === 'available' ? 'bg-success text-success-foreground' :
                      connector.status === 'coming_soon' ? 'bg-warning text-warning-foreground' :
                      'bg-accent text-accent-foreground'
                    }
                  >
                    {connector.status === 'available' ? 'Available' :
                     connector.status === 'coming_soon' ? 'Coming Soon' :
                     'Enterprise'}
                  </Badge>
                  <div className="mt-4">
                    <Button 
                      className="w-full" 
                      disabled={connector.status !== 'available'}
                      variant={connector.status === 'available' ? 'default' : 'outline'}
                    >
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cloud" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Amazon S3", icon: Cloud, description: "Connect to your S3 buckets" },
              { name: "Google Drive", icon: Cloud, description: "Access files from Google Drive" },
              { name: "Dropbox", icon: Cloud, description: "Import from Dropbox storage" },
              { name: "Azure Blob", icon: Cloud, description: "Connect to Azure storage" },
            ].map((service) => (
              <Card key={service.name} className="bg-card shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <service.icon className="w-5 h-5" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`${service.name}-key`}>API Key</Label>
                      <Input 
                        id={`${service.name}-key`}
                        type="password" 
                        placeholder="Enter your API key"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${service.name}-path`}>Path/Bucket</Label>
                      <Input 
                        id={`${service.name}-path`}
                        placeholder="Enter path or bucket name"
                        className="mt-1"
                      />
                    </div>
                    <Button className="w-full bg-gradient-primary">
                      Connect & Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataIngestion;