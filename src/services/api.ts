import axios from 'axios';

// API Base URL - in production this would come from environment variables
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for file uploads
});

// Types for API responses
export interface ColumnInfo {
  name: string;
  type: string;
  detected: string;
  status: 'valid' | 'invalid' | 'target' | 'warning';
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    filename: string;
    columns: string[];
    sample_rows: any[];
    inferred_types: Record<string, string>;
    column_info: ColumnInfo[];
    total_rows: number;
  };
  error?: string;
}

export interface ValidationResponse {
  is_valid: boolean;
  issues: string[];
  target_column?: string;
  recommendations: string[];
}

export interface ExternalSourceResponse {
  success: boolean;
  message: string;
  data?: {
    source_type: string;
    columns: string[];
    sample_rows: any[];
    inferred_types: Record<string, string>;
    column_info: ColumnInfo[];
  };
  error?: string;
}

// File Upload API
export const uploadFile = async (file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: 'Upload failed',
        error: error.response?.data?.message || error.message,
      };
    }
    return {
      success: false,
      message: 'Upload failed',
      error: 'An unexpected error occurred',
    };
  }
};

// Schema Validation API
export const validateSchema = async (data: any): Promise<ValidationResponse> => {
  try {
    const response = await api.post('/validate-schema', data);
    return response.data;
  } catch (error) {
    console.error('Schema validation failed:', error);
    return {
      is_valid: false,
      issues: ['Failed to validate schema'],
      recommendations: [],
    };
  }
};

// External Data Source Connection API
export const connectExternalSource = async (sourceConfig: {
  source_type: string;
  credentials: Record<string, string>;
}): Promise<ExternalSourceResponse> => {
  try {
    const response = await api.post('/external-source', sourceConfig);
    return response.data;
  } catch (error) {
    console.error('External source connection failed:', error);
    return {
      success: false,
      message: 'Connection failed',
      error: 'Failed to connect to external source',
    };
  }
};

// Mock API responses for development (when backend is not available)
export const mockUploadFile = async (file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> => {
  // Simulate upload progress
  if (onProgress) {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      onProgress(i);
    }
  }

  return {
    success: true,
    message: 'File uploaded successfully',
    data: {
      filename: file.name,
      columns: ['id', 'age', 'income', 'education', 'target'],
      sample_rows: [
        { id: 1, age: 25, income: 50000, education: 'Bachelor', target: 'Yes' },
        { id: 2, age: 32, income: 75000, education: 'Master', target: 'No' },
        { id: 3, age: 28, income: 60000, education: 'Bachelor', target: 'Yes' },
        { id: 4, age: 45, income: 90000, education: 'PhD', target: 'No' },
        { id: 5, age: 23, income: 40000, education: 'Bachelor', target: 'Yes' },
        { id: 6, age: 35, income: 80000, education: 'Master', target: 'No' },
        { id: 7, age: 29, income: 55000, education: 'Bachelor', target: 'Yes' },
        { id: 8, age: 41, income: 95000, education: 'PhD', target: 'No' },
        { id: 9, age: 26, income: 48000, education: 'Bachelor', target: 'Yes' },
        { id: 10, age: 38, income: 85000, education: 'Master', target: 'No' },
      ],
      inferred_types: {
        id: 'integer',
        age: 'integer',
        income: 'float',
        education: 'categorical',
        target: 'categorical',
      },
      column_info: [
        { name: 'id', type: 'Numeric', detected: 'Integer', status: 'valid' },
        { name: 'age', type: 'Numeric', detected: 'Integer', status: 'valid' },
        { name: 'income', type: 'Numeric', detected: 'Float', status: 'valid' },
        { name: 'education', type: 'Categorical', detected: 'String', status: 'valid' },
        { name: 'target', type: 'Categorical', detected: 'String', status: 'target' },
      ],
      total_rows: 10000,
    },
  };
};

export const mockValidateSchema = async (): Promise<ValidationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    is_valid: true,
    issues: [],
    target_column: 'target',
    recommendations: [
      'Dataset looks good for classification',
      'Consider feature scaling for numerical columns',
      'Target variable is well balanced',
    ],
  };
};

export const mockConnectExternalSource = async (sourceConfig: {
  source_type: string;
  credentials: Record<string, string>;
}): Promise<ExternalSourceResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: `Connected to ${sourceConfig.source_type} successfully`,
    data: {
      source_type: sourceConfig.source_type,
      columns: ['user_id', 'timestamp', 'feature_a', 'feature_b', 'label'],
      sample_rows: [
        { user_id: 'user_001', timestamp: '2024-01-01', feature_a: 1.2, feature_b: 'A', label: 1 },
        { user_id: 'user_002', timestamp: '2024-01-02', feature_a: 2.3, feature_b: 'B', label: 0 },
        { user_id: 'user_003', timestamp: '2024-01-03', feature_a: 1.8, feature_b: 'A', label: 1 },
      ],
      inferred_types: {
        user_id: 'string',
        timestamp: 'datetime',
        feature_a: 'float',
        feature_b: 'categorical',
        label: 'integer',
      },
      column_info: [
        { name: 'user_id', type: 'Identifier', detected: 'String', status: 'valid' },
        { name: 'timestamp', type: 'Datetime', detected: 'Datetime', status: 'valid' },
        { name: 'feature_a', type: 'Numeric', detected: 'Float', status: 'valid' },
        { name: 'feature_b', type: 'Categorical', detected: 'String', status: 'valid' },
        { name: 'label', type: 'Target', detected: 'Integer', status: 'target' },
      ],
    },
  };
};

// Use mock APIs for development
export const apiService = {
  uploadFile: process.env.NODE_ENV === 'development' ? mockUploadFile : uploadFile,
  validateSchema: process.env.NODE_ENV === 'development' ? mockValidateSchema : validateSchema,
  connectExternalSource: process.env.NODE_ENV === 'development' ? mockConnectExternalSource : connectExternalSource,
};