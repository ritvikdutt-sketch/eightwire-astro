---
title: "Process Groups and Types"
description: "A process is the instruction to transfer data. Many separate processes can be contained within a group that share a process type and may have a schedule. If the objects (tables) contained within the Processes in the group relate to each other, these relationships will be respected during data transfer when the Process Group itself is executed (e.g. with relational database referential integrity constraints)."
category: "Create a Process"
order: 19
sourceUrl: "https://www.eightwire.io/knowledge-base/process-groups-and-types"
---

## Create a Process Group

Go to the **Process Group** from the Project page

![Screenshot](./images/process-groups-and-types-1.webp)

Click **+New** to add a new Process Group

Enter the name and (optional description) for your Process Group.

Choose the destination action (Process Group Type) for the processes within the group.

Click **Save and Close**

![Screenshot](./images/process-groups-and-types-2.webp)

**Process Group Type**

This type is how you determine the way data is written to the destination object.

If the destination object is a relational database - you have all the types available whereas if you are writing to a file, you have a subset of types available.

For the full list of destination actions by connector type please refer to [Connectors](https://wiki.eight-wire.com/connector-types)

‍**Destination Actions**

The key tasks a Connector performs are reading and writing. Reading is usually straightforward, but writing can be complex, depending on the platform and on the other data being written at the same time.

![Screenshot](./images/process-groups-and-types-3.webp)

Ready to create processes? Go to this page to see how: [Create, Map, and Filter a Process](../create-map-and-filter-a-process/)
