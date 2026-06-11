// Connector catalogue — mirrors public/connectors/ (downloaded by download-connectors.mjs).
// `file` is relative to the site base; categories drive the sphere filters and grid grouping.

export interface Connector {
  name: string;
  file: string;
  cat: 'Databases' | 'Files & formats' | 'Transfer & storage' | 'Cloud & SaaS';
  kind: string;
}

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const c = (name: string, cat: Connector['cat'], kind: string, ext = 'svg'): Connector => ({
  name,
  file: `connectors/${slug(name)}.${ext}`,
  cat,
  kind,
});

export const CONNECTORS: Connector[] = [
  // Cloud & SaaS
  c('Azure', 'Cloud & SaaS', 'Cloud platform'),
  c('HubSpot', 'Cloud & SaaS', 'CRM platform'),
  c('Salesforce', 'Cloud & SaaS', 'CRM platform'),
  c('MYOB', 'Cloud & SaaS', 'Accounting platform'),

  // Databases & warehouses
  c('SQL Server', 'Databases', 'Relational database'),
  c('PostgreSQL', 'Databases', 'Relational database'),
  c('MySQL', 'Databases', 'Relational database'),
  c('Oracle', 'Databases', 'Relational database'),
  c('Snowflake', 'Databases', 'Data warehouse'),
  c('Redshift', 'Databases', 'Data warehouse'),
  c('Netezza SQL', 'Databases', 'Data warehouse', 'png'),
  c('Hadoop Hive', 'Databases', 'Data warehouse'),
  c('MongoDB', 'Databases', 'NoSQL database'),
  c('DynamoDB', 'Databases', 'NoSQL database'),
  c('DocumentDB', 'Databases', 'NoSQL database', 'png'),
  c('CouchDB', 'Databases', 'NoSQL database'),
  c('Cloudant', 'Databases', 'NoSQL database'),
  c('Sybase', 'Databases', 'Relational database'),
  c('DB2', 'Databases', 'Relational database'),
  c('DB2 Generic', 'Databases', 'Relational database'),
  c('Interbase', 'Databases', 'Relational database'),
  c('ANSI SQL', 'Databases', 'SQL standard'),

  // Files & formats
  c('Parquet', 'Files & formats', 'Columnar file format', 'png'),
  c('XLSX', 'Files & formats', 'Spreadsheet format'),
  c('Excel', 'Files & formats', 'Spreadsheet format'),
  c('CSV', 'Files & formats', 'Delimited file format'),
  c('Fixed Width', 'Files & formats', 'Flat file format'),
  c('Folder', 'Files & formats', 'File system'),
  c('Generic', 'Files & formats', 'Custom format'),

  // Transfer & storage
  c('SFTP Generic', 'Transfer & storage', 'Transfer protocol'),
  c('SFTP XLSX', 'Transfer & storage', 'Transfer protocol'),
  c('SFTP CSV', 'Transfer & storage', 'Transfer protocol'),
  c('S3 CSV', 'Transfer & storage', 'Object storage'),
  c('Hadoop DFS', 'Transfer & storage', 'Distributed storage'),
];

export const CATEGORIES: Connector['cat'][] = ['Databases', 'Files & formats', 'Transfer & storage', 'Cloud & SaaS'];
