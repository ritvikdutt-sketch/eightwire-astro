---
title: "Create Process Expressions"
description: "Process expressions allow you to use data attributes presented in a source datastore in expressions to build transformations that map to your destination. The syntax for the expressions and available functions are listed in detail in our section on Process Expressions Syntax."
category: "Create a Process"
order: 21
sourceUrl: "https://www.eightwire.io/knowledge-base/create-process-expressions"
---

To create a process expression, navigate to a process.

Highlight the process and select **Edit Process**

![Processes in Presentation for Analytics list with the Edit Process tooltip over the pencil button on the AA\_Inputs.xlsx row](./images/create-process-expressions-1.webp)

Select **+Add Expression Column**

![Editing Process Mapping panel for StagingIn.AcuteAdmissionsProcessCommon with the +Add Expression Column button highlighted](./images/create-process-expressions-2.webp)

Name the column that will be represented by an expression.

Enter the expression and click **Save**

![Expression dialog with Field Name ArrivalMonth, expression Datepart(Data("ArrivalDatetime"),"Month") and the Save button](./images/create-process-expressions-3.webp)

The syntax of the expression will be checked.

![Success toasts reading Expression checking has been successful and Manual mapping has been created successfully](./images/create-process-expressions-4.webp)

The expression can be manually mapped (click on the expression and then the destination column).

![Mapping panel with ArrivalMonth and ArrivalYear expression columns mapped to the ArrivalMonth and ArrivalYear NUMBER destinations](./images/create-process-expressions-5.webp)

**Save** the process.

> *Run the process to check that the expression is successful — for example if your source data contains NULLS or empty strings you may need to handle that in the expression.*

> *A detailed guide to the expression editor syntax can be found in the pages on* [*Process Expressions*](../overview/) *Syntax.*

More options working with processes are in the following pages;

-   Work with [System Expressions and Constants](../use-process-constants-and-system-expressions/)
-   Configure [Process tolerances and Options](../process-options-thresholds-and-toleration/)
-   Test a Process by [manually executing](../execute-a-process/)
-   Apply [a time based schedule](../process-group-time-schedule/) to your Process Groups
-   Apply [an event based schedule](../process-event-execution-schedule/) to your Process Groups
