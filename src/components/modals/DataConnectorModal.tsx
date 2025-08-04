import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Database, Loader2 } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface DataConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const DataConnectorModal = ({ isOpen, onClose, onSuccess }: DataConnectorModalProps) => {
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionForm, setConnectionForm] = useState({
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
    query: '',
  });

  const { toast } = useToast();

  const connectors = [
    { 
      id: 'postgresql', 
      name: 'PostgreSQL', 
      description: 'Connect to PostgreSQL database',
      status: 'available',
      defaultPort: '5432'
    },
    { 
      id: 'mysql', 
      name: 'MySQL', 
      description: 'Connect to MySQL database',
      status: 'available',
      defaultPort: '3306'
    },
    { 
      id: 'mongodb', 
      name: 'MongoDB', 
      description: 'Connect to MongoDB database',
      status: 'available',
      defaultPort: '27017'
    },
    { 
      id: 'redis', 
      name: 'Redis', 
      description: 'Connect to Redis cache',
      status: 'coming_soon',
      defaultPort: '6379'
    },
  ];

  const handleConnectorSelect = (connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    setSelectedConnector(connectorId);
    setConnectionForm(prev => ({
      ...prev,
      port: connector?.defaultPort || '',
    }));
  };

  const handleConnect = async () => {
    if (!selectedConnector) return;

    setIsConnecting(true);
    try {
      const response = await apiService.connectExternalSource({
        source_type: selectedConnector,
        credentials: {
          host: connectionForm.host,
          port: connectionForm.port,
          database: connectionForm.database,
          username: connectionForm.username,
          password: connectionForm.password,
          query: connectionForm.query,
        },
      });

      if (response.success && response.data) {
        toast({
          title: "Connection Successful",
          description: response.message,
        });
        onSuccess(response.data);
        onClose();
      } else {
        toast({
          title: "Connection Failed",
          description: response.error || "Failed to connect to database",
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
    setSelectedConnector(null);
    setConnectionForm({
      host: '',
      port: '',
      database: '',
      username: '',
      password: '',
      query: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect to Database</DialogTitle>
          <DialogDescription>
            Choose a database connector and provide connection details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedConnector ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Database Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connectors.map((connector) => (
                  <Card 
                    key={connector.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      connector.status !== 'available' ? 'opacity-50' : ''
                    }`}
                    onClick={() => connector.status === 'available' && handleConnectorSelect(connector.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Database className="w-5 h-5" />
                        {connector.name}
                      </CardTitle>
                      <CardDescription>{connector.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge 
                        variant={connector.status === 'available' ? 'default' : 'secondary'}
                        className={
                          connector.status === 'available' 
                            ? 'bg-success text-success-foreground' 
                            : 'bg-warning text-warning-foreground'
                        }
                      >
                        {connector.status === 'available' ? 'Available' : 'Coming Soon'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={() => setSelectedConnector(null)}>
                  ← Back
                </Button>
                <h3 className="text-lg font-semibold">
                  Configure {connectors.find(c => c.id === selectedConnector)?.name} Connection
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="host">Host</Label>
                  <Input
                    id="host"
                    placeholder="localhost"
                    value={connectionForm.host}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, host: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="5432"
                    value={connectionForm.port}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, port: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="my_database"
                    value={connectionForm.database}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, database: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="username"
                    value={connectionForm.username}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={connectionForm.password}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="query">SQL Query (Optional)</Label>
                  <Textarea
                    id="query"
                    placeholder="SELECT * FROM table_name LIMIT 1000"
                    value={connectionForm.query}
                    onChange={(e) => setConnectionForm(prev => ({ ...prev, query: e.target.value }))}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave empty to browse tables, or provide a SELECT query to import specific data
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button 
                  onClick={handleConnect} 
                  disabled={isConnecting || !connectionForm.host || !connectionForm.database}
                >
                  {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};