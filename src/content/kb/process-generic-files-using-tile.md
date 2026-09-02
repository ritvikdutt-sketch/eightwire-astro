---
title: "Process Generic Files using Tile"
description: "Once you have a Generic Tile Datastore created, you need to map it in a process to a destination folder Datastore before sharing it with your data providers."
category: "Build Tile Datashares"
order: 58
sourceUrl: "https://www.eightwire.io/knowledge-base/process-generic-files-using-tile"
---

Navigate to Project > Process Groups

Click **+New** to add a new Process Group

Select the Process Group Type

Click **+Add Source** and select your Tile Datastore

Highlight the source object and click **Add**

![Screenshot](./images/process-generic-files-using-tile-1.webp)

For Generic Tile the source object available will be called 'File'

The process will make a suggestion from the available Destination Datastores — select a Folder Datastore

![Screenshot](./images/process-generic-files-using-tile-2.webp)

Click on the ellipsis to navigate and select an existing Datastore folder, or create a new Folder in the Datastore.

Click **Accept All** or the **blue tick** to create the Process.

![Screenshot](./images/process-generic-files-using-tile-3.webp)

The mapping will be applied automatically and is for a binary file (showing default properties as columns).

![Screenshot](./images/process-generic-files-using-tile-4.webp)

Run a test process by using the Tile that is shown in your Project Dashboard.

Drag a file into the tile and check that the process executes successfully (on the Activity Page).

![Screenshot](./images/process-generic-files-using-tile-5.webp)

Nice work! — you have mapped the Tile to its destination, all that remains is to [share the Tile with your Data Providers](../share-a-tile-datastore/)
