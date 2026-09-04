---
title: "Connector Types"
description: "Each Data Store makes use of a Connector to access data on your chosen platform. Each Connector is required to perform the same basic tasks but they accomplish those tasks in quite different ways. For example, when asked to write data, an Excel Spreadsheet Connector will create an Excel file containing the data and store it in a folder system, whereas an SQL Server Connector will execute database commands to write the same data into the database. From a user perspective, both achieve the same task, but internally they work quite differently. Because all data formats have differing capabilities and limitations, so do the Eightwire connectors that work with them. Where possible Eightwire will attempt to bridge the capability gap by inferring the missing information from the data, even where this is not provided by the data format itself. For example, the Delimited Text format does not provide any way to designate a primary key column. Instead, Eightwire analyses some of your data and infers an appropriate column for you. Conversely, most database platforms explicitly allow you to specify a primary key, which Eightwire will detect and use. This page shows our current selection - there are always new connectors on our roadmap, so let us know if there is something specific you are looking for;"
category: "Connectors"
order: 40
sourceUrl: "https://www.eightwire.io/knowledge-base/connector-types"
---

**Application**

| CONNECTOR TYPE | INTERNAL NETWORK | IN THE CLOUD | QUERIES | WILDCARDS | CONNECTION FIELDS | DESTINATION ACTION | AVAILABILITY |
|---|---|---|---|---|---|---|---|
| SALESFORCE | ✗ | ✓ | ✓ | ✗ | Username<br>Password<br>Secret key<br>Access key | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |

**Database**

| CONNECTOR TYPE | GROUP | INTERNAL NETWORK | IN THE CLOUD | QUERIES | WILDCARDS | CONNECTION FIELDS | DESTINATION ACTION | AVAILABILITY |
|---|---|---|---|---|---|---|---|---|
| ANSISQL | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| DB2 | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| DB2GENERIC | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| HADOOP HIVE | Database | ✗ | ✓ | ✗ | ✗ | URL<br>Username<br>Protocol<br>Connection String<br>Database | Full merge<br>Partial merge<br>Append<br>Overwrite | Request |
| INTERBASE | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| MYOB | Database | ✓ | ✗ | ✗ | ✗ | Protocol<br>Connection String<br>Schema | Append<br>Overwrite | Default |
| MYSQL | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| NETEZZASQL | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| ORACLE | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| POSTGRESQL | Database | ✓ | ✓ | ✓ | ✗ | Protocol<br>Connection String<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| REDSHIFT | Database | ✗ | ✓ | ✓ | ✗ | Server<br>Username<br>Password<br>Database<br>Bucket<br>Secret key<br>Access key<br>AWS Region | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| SQLSERVER | Database | ✓ | ✓ | ✓ | ✗ | Protocol<br>Connection string<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| SYBASE | Database | ✓ | ✗ | ✓ | ✗ | Protocol<br>Connection string<br>Schema | Full merge<br>Partial merge<br>Append<br>Overwrite<br>Incremental loading | Default |
| CLOUDANT | NoSql | ✗ | ✓ | ✗ | ✗ | Username<br>Database<br>Entity | Append, Overwrite | Default |
| COUCHDB | NoSql | ✓ | ✓ | ✗ | ✗ | URL<br>PORT<br>UserName<br>Database<br>Entity | Append, Overwrite | Default |
| DOCUMENTDB | NoSql | ✗ | ✓ | ✗ | ✗ | URL<br>Database<br>Access Key | Append, Overwrite | Default |
| DYNAMODB | NoSql | ✗ | ✓ | ✗ | ✗ | AWS Region<br>Access Key<br>Secret Key | Append, Overwrite | Default |
| MONGODB | NoSql | ✗ | ✓ | ✗ | ✗ | URL<br>UserName<br>Database | Append, Overwrite | Default |

**File**

| CONNECTOR TYPE | INTERNAL NETWORK | IN THE CLOUD | QUERIES | WILDCARDS | CONNECTION FIELDS | DESTINATION ACTION | AVAILABILITY |
|---|---|---|---|---|---|---|---|
| CSV | ✓ | ✗ | ✗ | ✓ | Path<br>Column headers<br>Data Starts<br>Column delimiter<br>Row delimiter<br>Text qualifier | Overwrite | Default |
| FIXEDWIDTH | ✓ | ✗ | ✗ | ✓ | Path<br>Column headers<br>Data starts<br>Padding character<br>Row delimiter | Overwrite | Default |
| FOLDER | ✓ | ✗ | ✗ | ✗ | Path | Overwrite, Append | Request |
| FTPCSV | ✓ | ✗ | ✗ | ✓ | Path<br>Column Headers<br>Data Starts<br>Column Delimiter<br>Row Delimiter<br>Test Qualifier<br>Port<br>Server<br>User Name<br>Protocol<br>Private key file path<br>Passphrase | Overwrite | Default |
| FTPXLSX | ✓ | ✗ | ✗ | ✓ | Path<br>Column Headers<br>Data Starts<br>Column Delimiter<br>Row Delimiter<br>Test Qualifier<br>Port<br>Server<br>UserName<br>Protocol<br>Private key file path<br>Passphrase | Overwrite | Default |
| HADOOP DFS | ✗ | ✓ | ✗ | ✓ | Path<br>Column headers<br>Data starts<br>Column Delimiter<br>Test Qualifier<br>URL<br>Username | Overwrite | Default |
| S3CSV | ✗ | ✓ | ✗ | ✗ | Bucket name<br>Secret key<br>Access key<br>AWS region<br>Path<br>Column headers<br>Data starts<br>Column delimiter<br>Row delimiter<br>Text qualifier | Overwrite | Request |
| XLSX | ✓ | ✗ | ✗ | ✓ | Path<br>Column headers<br>Data starts | Overwrite | Default |

**Eightwire Tile**

| CONNECTOR TYPE | INTERNAL NETWORK | IN THE CLOUD | QUERIES | WILDCARDS | CONNECTION FIELDS | DESTINATION ACTION | AVAILABILITY |
|---|---|---|---|---|---|---|---|
| CSV TILE | ✗ | ✓ | ✗ | ✗ | Destination Datastore | Defined by Destination | Default |
| EXCEL TILE | ✗ | ✓ | ✗ | ✗ | Destination Datastore | Defined by Destination | Default |
| GENERIC TILE | ✗ | ✓ | ✗ | ✗ | Defined by Destination | Insert, Overwrite | Request |
