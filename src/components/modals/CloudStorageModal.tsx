import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface CloudStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const CloudStorageModal = ({ isOpen, onClose, onSuccess }: CloudStorageModalProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionForm, setConnectionForm] = useState({
    apiKey: '',
    secretKey: '',
    bucketPath: '',
    region: '',
  });

  const { toast } = useToast();

  const cloudServices = [
    {
      id: 's3',
      name: 'Amazon S3',
      description: 'Connect to your S3 buckets and access files',
      icon: Cloud,
      fields: ['apiKey', 'secretKey', 'bucketPath', 'region'],
      fieldLabels: {
        apiKey: 'Access Key ID',
        secretKey: 'Secret Access Key',
        bucketPath: 'Bucket Name/Path',
        region: 'Region',
      },
      placeholders: {
        apiKey: 'AKIA...',
        secretKey: 'Your secret access key',
        bucketPath: 'my-bucket/path/to/data',
        region: 'us-east-1',
      },
    },
    {
      id: 'gcs',
      name: 'Google Cloud Storage',
      description: 'Import data from Google Cloud Storage',
      icon: Cloud,
      fields: ['apiKey', 'bucketPath'],
      fieldLabels: {
        apiKey: 'Service Account Key (JSON)',
        bucketPath: 'Bucket Name/Path',
      },
      placeholders: {
        apiKey: 'Paste your service account JSON key',
        bucketPath: 'my-bucket/path/to/data',
      },
    },
    {
      id: 'azure',
      name: 'Azure Blob Storage',
      description: 'Connect to Azure storage containers',
      icon: Cloud,
      fields: ['apiKey', 'secretKey', 'bucketPath'],
      fieldLabels: {
        apiKey: 'Account Name',
        secretKey: 'Account Key',
        bucketPath: 'Container/Path',
      },
      placeholders: {
        apiKey: 'mystorageaccount',
        secretKey: 'Your account key',
        bucketPath: 'mycontainer/path/to/data',
      },
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Access files from your Dropbox account',
      icon: Cloud,
      fields: ['apiKey', 'bucketPath'],
      fieldLabels: {
        apiKey: 'Access Token',
        bucketPath: 'Folder Path',
      },
      placeholders: {
        apiKey: 'Your Dropbox access token',
        bucketPath: '/path/to/folder',
      },
    },
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setConnectionForm({
      apiKey: '',
      secretKey: '',
      bucketPath: '',
      region: '',
    });
  };

  const handleConnect = async () => {
    if (!selectedService) return;

    setIsConnecting(true);
    try {
      const response = await apiService.connectExternalSource({
        source_type: selectedService,
        credentials: connectionForm,
      });

      if (response.success && response.data) {
        toast({
          title: "Connected Successfully",
          description: response.message,
        });
        onSuccess(response.data);
        onClose();
      } else {
        toast({
          title: "Connection Failed",
          description: response.error || "Failed to connect to cloud storage",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const resetForm = () => {
    setSelectedService(null);
    setConnectionForm({
      apiKey: '',
      secretKey: '',
      bucketPath: '',
      region: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const selectedServiceConfig = cloudServices.find(s => s.id === selectedService);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect to Cloud Storage</DialogTitle>
          <DialogDescription>
            Choose a cloud storage service and provide your credentials
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedService ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Cloud Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cloudServices.map((service) => (
                  <Card 
                    key={service.id} 
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <service.icon className="w-5 h-5" />
                        {service.name}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedService(null)}>
                  ← Back
                </Button>
                <h3 className="text-lg font-semibold">
                  Configure {selectedServiceConfig?.name} Connection
                </h3>
              </div>

              <div className="space-y-4">
                {selectedServiceConfig?.fields.map((field) => (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {selectedServiceConfig.fieldLabels[field as keyof typeof selectedServiceConfig.fieldLabels]}
                    </Label>
                    {field === 'apiKey' && selectedService === 'gcs' ? (
                      <textarea
                        id={field}
                        className="w-full h-32 p-3 border border-input rounded-md bg-background text-sm resize-none"
                        placeholder={selectedServiceConfig.placeholders[field as keyof typeof selectedServiceConfig.placeholders]}
                        value={connectionForm[field as keyof typeof connectionForm]}
                        onChange={(e) => setConnectionForm(prev => ({ ...prev, [field]: e.target.value }))}
                      />
                    ) : (
                      <Input
                        id={field}
                        type={field.includes('secret') || field.includes('key') ? 'password' : 'text'}
                        placeholder={selectedServiceConfig.placeholders[field as keyof typeof selectedServiceConfig.placeholders]}
                        value={connectionForm[field as keyof typeof connectionForm]}
                        onChange={(e) => setConnectionForm(prev => ({ ...prev, [field]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Security Note</h4>
                  <p className="text-sm text-muted-foreground">
                    Your credentials are encrypted and stored securely. We recommend using read-only access keys when possible.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button 
                  onClick={handleConnect} 
                  disabled={isConnecting || !connectionForm.apiKey || !connectionForm.bucketPath}
                >
                  {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isConnecting ? 'Connecting...' : 'Connect & Import'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};