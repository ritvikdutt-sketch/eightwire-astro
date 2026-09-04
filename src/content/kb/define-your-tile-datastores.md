---
title: "Define your Tile Datastores"
description: "This page shows you how to create the Tile as a the party receiving the data."
category: "Build Tile Datashares"
order: 56
sourceUrl: "https://www.eightwire.io/knowledge-base/define-your-tile-datastores"
---

## Define the Destination Datastore

If you plan to receive data from Excel or CSV Tile - then the destination datastore can be any type that can write data to it (for example relational database or file).

If you plan to receive generic files (for example Word, PDF or Images) then the destination needs to be a Folder Datastore.

Create the Datastore that the data will be written to - and remember to mark it as Destination.

## Define the Source — Tile Datastore

On the Datastore page, click **+New**

Where is your data? — select **In the cloud**

Choose a Datastore Type from the Tile section

![Data Hub Datastore form with In the cloud selected and Excel Tile chosen under Tile, beside Delimited Text Tile and Generic Tile](./images/define-your-tile-datastores-1.webp)

Connection — use the dropdown available to select a Destination Datastore — for the data.

Note that for Generic Tile, this is greyed out and not required.

Complete the file settings (Column Headers and Data Starts) dropdown options.

Click **Save**

![Excel Tile Connection panel: Destination datastore dropdown Database Hub, Column Headers In row 1, Data Starts In row 2, Save button](./images/define-your-tile-datastores-2.webp)

![Thin grey horizontal divider line with no visible interface content](./images/applying-column-row-level-filters-2.webp)

## Configure the Tile

Dropfile Options enable you to configure your Tile so that you can present requirements, help text, templates, and an Avatar.

In the Tile Datastore, click on the tab **Dropfile Options**

![Excel Tile Datastore summary with Type, Agent, Connection, Option, Region, Sharing rows and the DropFile Options tab highlighted](./images/define-your-tile-datastores-4.webp)

## Avatar

Click in the Section 'Drop Avatar here' to upload an image that will be presented on the tile.

If you do not wish to use an Avatar, a default image will be presented.

![DropFile Options tab Avatar section with the dashed Drop Avatar here upload box](./images/define-your-tile-datastores-5.webp)

## Instructions

This is a free text section where you can present any instructions to do with the tile - for example 'only submit excel files' or any data definitions that apply.

## Support

This is a free text section where you can offer support channels - contacts for business or technical support within your organisation - when the data submitter needs help.

## Template

The template section allows you to upload a template that your Data Provider can use for data submission or to upload a detailed specification for their information.

You can save multiple documents in this section, and they are versioned.

Click on **New file template** to upload a file.

When you have completed the Dropfile Options, click **Save**

![Template table with Filename, Updated and Actions columns, the New file template button highlighted, and Save button](./images/define-your-tile-datastores-6.webp)

> *The template section must* ***not*** *be used to share data — it is for communicating instructions and not intended as a secure data exchange.*

The next step is to build the process. Check out [Process CSV and Excel Data using Tile](../process-csv-and-excel-data-using-tile/) or [Process Generic Files using Tile](../process-generic-files-using-tile/)
