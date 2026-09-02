---
title: "Datastore Scan FAQ's"
description: "A Datastore has options for the scan to keep it updated automatically (every 20 minutes) or manually when requested by a User. This page has information about how the scan works, so you can determine the best setting to select for your datastore"
category: "Set up a Datastore"
order: 16
sourceUrl: "https://www.eightwire.io/knowledge-base/datastore-scan-faqs"
---

## Automatic Scanning

When you create a Data Store, one of the first things that Eightwire does is to look into the underlying repository and gather information on its tables, columns, and data types. This is called Discovery and Scanning.

When this is complete, Eightwire has a complete cached copy of this information, which assists with smart mapping and detecting unexpected data structure changes.You can choose whether to periodically allow Eightwire to rescan and refresh its cache or only do this when requested.If your underlying repository data structures change, you should rescan the Data Store to ensure you are working with accurate data structures.Eightwire will automatically scan each table during a data transfer and report a warning if the cached data structure deviates from the actual data structure in a way that is incompatible.

For more detail - please refer to our article on [Column and Smart Mapping](../column-and-smart-mapping/)

## **A new object will not be visible in a Datastore until a manual scan is performed?**

A manual scan of a datastore will immediately refresh the cache and identify new objects — however Automatic will also discover Excel and discover and scan Relational and CSV Datastores to display the up to date list of objects.

## **Why do I see an object in the datastore when I scan and browse, that is not actually there?**

If the object (file or database table) is used in a process, then it will remain visible in the datastore.

This is the case even if the object (file or databasee table) has been deleted in the source).

When you scan a warning message will tell you that the object is used in a process but no longer exists in the datastore.

The process should be deleted and then the next scan will remove the object from the Datastore.

## How does the Scan detect Data Types in a file?

Data files generally do not contain explicit data type definitions – Eightwire can infer data types by sampling data from the first 1000 rows, but this isn't always completely accurate.

For example, if the first 1000 rows of one column all contain the value '1', Eightwire doesn't know if this is a Boolean (true / false) or a number, so it will guess.

If your destination data store uses data files, you may wish to set the destination Data Store to 'manually' scan for changes, then check and correct the detected column data types for each table/file.

Another consideration is with NULL values. Database platforms often support the use of NULL values, which are different from empty strings, such as "". Data files generally do not support NULL values, so will treat any blank value as an empty string ("") instead, which could be important if you need to maintain a distinction between NULL and empty string.

Excel uses pseudo-typed data, but it isn't strictly adhered to in the same way as database data types. For this reason, Eightwire will attempt to use Excels formatting information to infer sensible data types, but this is not always possible.

You should check the column data types that Eightwire detects and if necessary correct them, setting your Data Store to manually scan.
