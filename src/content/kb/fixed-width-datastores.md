---
title: "Fixed Width Datastores"
description: "When working with file sources that do not have column headers — Eightwire will attempt to identify columns in the scan using the delimiter settings, and apply arbitrary column labels. This page shows how to create a Fixed Width Datastore and options to edit the datastore to apply any documented column widths and descriptions to the datastore objects."
category: "Datastore Features"
order: 36
sourceUrl: "https://www.eightwire.io/knowledge-base/fixed-width-datastores"
---

From the Datastore page click **+New**

Name your Datastore and choose **Fixed Width**

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-1.webp)

Choose a path that the files are located in

In File Settings — select whether Column Headers are included and where Data starts

Select Padding character and row delimiter or leave at the defaults.

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-2.webp)

Complete the other tabs of the Datastore setup and click **Create**

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-3.webp)

Once the Datastore has been created, **browse** to check how the objects have been discovered and scanned.

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-4.webp)

In this example, default column names have been applied, and potential column width has been detected.

You may have data that needs to have the column width defined (that differs to what has been detected in the scan).

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-5.webp)

Click on the tab  **Fixed Width**

For each column —click on the pencil to edit the column name and define the start position and text length — for left or right alignment.

When you have defined the columns enter **Save**

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-6.webp)

Your datastore has been saved with the required definition.

This switched the scan process over to **Manual**.

Be aware that any scan of the data may result in losing the manually applied definition.

Making any change to the Datastore or running a scan will therefore generate this warning.

![Fixed Width Datastores (screenshot)](./images/fixed-width-datastores-7.webp)
