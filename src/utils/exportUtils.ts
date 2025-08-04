import { saveAs } from 'file-saver';

export const exportToCSV = (data: any[], filename: string = 'sample_data.csv') => {
  if (!data.length) return;

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and save
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

export const downloadSampleData = (data: any[], originalFilename?: string) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const baseName = originalFilename ? 
    originalFilename.replace(/\.[^/.]+$/, '') : 
    'dataset';
  const filename = `${baseName}_sample_${timestamp}.csv`;
  
  exportToCSV(data, filename);
};