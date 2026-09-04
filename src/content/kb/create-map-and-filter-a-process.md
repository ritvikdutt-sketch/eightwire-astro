---
title: "Create, Map, and Filter a Process"
description: ""
category: "Create a Process"
order: 20
sourceUrl: "https://www.eightwire.io/knowledge-base/create-map-and-filter-a-process"
---

## Create a Process

To create, edit or delete Processes, you need to navigate to a Project, navigate to Process Groups, expand one Process Group panel on that page, then click **View Processes**. Click **Add processes to this group**

![Transfer Data process group panel showing 0 processes, the Add processes to this group area and the View Processes button](./images/create-map-and-filter-a-process-1.webp)

Click **Add Source** to select the source data objects you would like to use in the transfer.

Double click on a Datastore name to expand the list

![Add Source dialog with the Data Inputs datastore expanded to show AA\_Inputs.xlsx, and the Add button](./images/create-map-and-filter-a-process-2.webp)

You are shown all the source data stores in the current Project. Select one or more objects and click **Add** (to select multiple objects, hold the Ctrl or Shift key while you click).

Eightwire will compare the structure of the source objects you have selected against all the objects that exist in the project destination Datastores.

Using that comparison it will suggest the best match for each table, and display a percentage. If Eightwire can't find a good match it will instead suggest creating a new object on the destination.

![Choose Destination Object dialog listing New options and Matching objects rated Good with 77%, 73% and 72% scores](./images/create-map-and-filter-a-process-3.webp)

**EITHER**

Choose an existing destination object

Using the suggested options of matching objects, select the one you want to use.

Click the blue tick or **Accept All** to create the process.

![Suggested Mappings panel with ClientLists.csv, the blue tick and red cross buttons, and the Accept All link](./images/create-map-and-filter-a-process-4.webp)

**OR**

Create a new destination object.

Click **New** for the appropriate destination datastore.

Click the pencil icon to rename the destination object.

![Editing Destination Database Table Name dialog for DailyRecordInput with the Save and Close button; New object row below with pencil icon](./images/create-map-and-filter-a-process-5.webp)

> *The destination object will be created using the object naming convention for the Datastore. For example, a new file Delimited Text in datastore will be named with .csv once created and a database object would start with the schema name or dbo.*

Complete creation of the process by clicking the Blue tick or **Accept All**

![Creating Process... and Scanning successful notifications shown after accepting the mapping](./images/create-map-and-filter-a-process-6.webp)

## Map a Process

From within a process group, hover the mouse over a process to see the **Edit Refresh Delete** and **Execute** buttons.

Click **Edit process** (the pencil icon).

![Process row ClientLists.csv to Landing.ClientRecords with the Edit Process pencil icon tooltip and refresh, delete and execute buttons](./images/create-map-and-filter-a-process-7.webp)

The mapping from source table to destination table will appear.

![Mapping screen with mapped columns joined by grey arrows, Unmapped Source and Destination Columns, and TaxFileNumber marked Do not use](./images/create-map-and-filter-a-process-8.webp)

Automatically mapped columns have a light grey arrow between them

Unmapped Source and destination columns may also appear.

Any column that appear with **x Do not use** have been restricted in the source data store, and cannot be mapped.

To manually map a column click on the source and destination columns.

A message will confirm manual mapping has been successful and the columns will appear with a dark grey tick between them.

To remove a manual mapping, simply click on the **dark grey arrow** and confirm.

![Manually mapped UnionAccountNo and ClientProfile columns with dark grey arrows, the ClientProfile arrow highlighted, and blue ticks](./images/create-map-and-filter-a-process-9.webp)

When the mapping is complete, click **Save**

## Filter a Process

A process can have row-level filters applied. Only rows where the filter criteria are met will be processed.

To apply a filter, edit the process.

Click on the **filter icon**.

Enter the criteria.

Click **Ok**

![EDIT FILTER popup on the ClientStatus column with Copy data when 'is equal to' 'Active', and Do not filter, Ok and Cancel buttons](./images/create-map-and-filter-a-process-10.webp)

> A *column does* ***not*** *have to mapped to have a filter applied.*

> *A filter* ***cannot*** *be applied on an expression column*

## Check out this video for an example — building processes

<div class="kb-embed"><iframe src="https://www.youtube.com/embed/frwgrwmJpWE" title="Eightwire: Create a Process" loading="lazy" allowfullscreen=""></iframe></div>

More options working with processes are in the following pages;

-   Create [Process Expressions](../create-process-expressions/)
-   Work with [System Expressions and Constants](../use-process-constants-and-system-expressions/)
-   Configure [Process tolerances and Options](../process-options-thresholds-and-toleration/)
-   Test a Process by [manually executing](../execute-a-process/)
-   Apply [a time based schedule](../process-group-time-schedule/) to your Process Groups
-   Apply [an event based schedule](../process-event-execution-schedule/) to your Process Groups
