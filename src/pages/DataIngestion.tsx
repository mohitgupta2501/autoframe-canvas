import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Upload, 
  Database, 
  Cloud, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Info,
  ExternalLink,
  Eye,
  Download,
  Loader2
} from "lucide-react";
import { apiService, ColumnInfo } from "@/services/api";
import { downloadSampleData } from "@/utils/exportUtils";
import { DataConnectorModal } from "@/components/modals/DataConnectorModal";
import { CloudStorageModal } from "@/components/modals/CloudStorageModal";
import { useToast } from "@/hooks/use-toast";

const DataIngestion = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State management
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [columnTypes, setColumnTypes] = useState<ColumnInfo[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Modal states
  const [showDataConnectorModal, setShowDataConnectorModal] = useState(false);
  const [showCloudStorageModal, setShowCloudStorageModal] = useState(false);
  const [showAllColumnsModal, setShowAllColumnsModal] = useState(false);

  // File upload handlers
  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/json',
    ];

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV, Excel, or JSON file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile(file);

    try {
      const response = await apiService.uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });

      if (response.success && response.data) {
        setPreviewData(response.data.sample_rows);
        setColumnTypes(response.data.column_info);
        setTotalRows(response.data.total_rows);
        
        toast({
          title: "Upload Successful",
          description: `${file.name} uploaded successfully`,
        });

        // Auto-validate schema
        await validateDataSchema(response.data);
      } else {
        toast({
          title: "Upload Failed",
          description: response.error || "Failed to upload file",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred during upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [toast]);

  const validateDataSchema = async (data: any) => {
    setIsValidating(true);
    try {
      const validation = await apiService.validateSchema(data);
      
      if (validation.is_valid) {
        toast({
          title: "Schema Valid",
          description: "Your dataset schema is valid for machine learning",
        });
      } else {
        toast({
          title: "Schema Issues Found",
          description: `${validation.issues.length} issues detected`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Schema validation error:', error);
    } finally {
      setIsValidating(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Export handlers
  const handleExportSample = () => {
    if (previewData.length > 0) {
      downloadSampleData(previewData, uploadedFile?.name);
      toast({
        title: "Export Started",
        description: "Sample data is being downloaded",
      });
    }
  };

  // External source handlers
  const handleExternalSourceSuccess = (data: any) => {
    setPreviewData(data.sample_rows);
    setColumnTypes(data.column_info);
    setTotalRows(data.sample_rows.length);
    
    toast({
      title: "Connection Successful",
      description: "External data source connected successfully",
    });
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
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <Button onClick={handleFileSelect} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Select Files"
                    )}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls,.json"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>

                {isUploading && uploadedFile && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading {uploadedFile.name}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {isValidating && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validating schema...
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
                {columnTypes.length > 0 ? (
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
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a file to see column analysis</p>
                  </div>
                )}
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
              {previewData.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(previewData[0]).map((key) => (
                            <TableHead key={key} className="font-semibold">
                              {key}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, i) => (
                              <TableCell key={i}>
                                {String(value)}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {previewData.length} of {totalRows.toLocaleString()} rows
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowAllColumnsModal(true)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View All Columns
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleExportSample}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Sample
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Data to Preview</h3>
                  <p>Upload a file or connect to a data source to see preview</p>
                </div>
              )}
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
                      onClick={() => connector.status === 'available' && setShowDataConnectorModal(true)}
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
                    <Button 
                      className="w-full bg-gradient-primary"
                      onClick={() => setShowCloudStorageModal(true)}
                    >
                      Connect & Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <DataConnectorModal
        isOpen={showDataConnectorModal}
        onClose={() => setShowDataConnectorModal(false)}
        onSuccess={handleExternalSourceSuccess}
      />

      <CloudStorageModal
        isOpen={showCloudStorageModal}
        onClose={() => setShowCloudStorageModal(false)}
        onSuccess={handleExternalSourceSuccess}
      />

      {/* View All Columns Modal */}
      <Dialog open={showAllColumnsModal} onOpenChange={setShowAllColumnsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Columns</DialogTitle>
            <DialogDescription>
              Complete column information and data types
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {columnTypes.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column Name</TableHead>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Detected Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sample Values</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columnTypes.map((col) => (
                    <TableRow key={col.name}>
                      <TableCell className="font-medium">{col.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{col.type}</Badge>
                      </TableCell>
                      <TableCell>{col.detected}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {col.status === 'valid' ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : col.status === 'target' ? (
                            <Info className="w-4 h-4 text-accent" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-warning" />
                          )}
                          <span className="capitalize">{col.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {previewData.slice(0, 3).map((row, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {String(row[col.name])}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No data available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataIngestion;