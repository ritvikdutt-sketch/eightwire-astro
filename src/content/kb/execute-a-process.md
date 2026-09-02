---
title: "Execute a Process"
description: "An individual process — from one source to one destination — can be executed manually, or a process group can also be run."
category: "Create a Process"
order: 24
sourceUrl: "https://www.eightwire.io/knowledge-base/execute-a-process"
---

## Run a Process

To manually execute an individual Process, hover your mouse over the Process in the Process list. You will see four buttons under your mouse cursor. Click the right-most **execute** icon.

![Screenshot](./images/execute-a-process-1.webp)

As the process executes this page will show you the progress of the data transfer.

![Screenshot](./images/execute-a-process-2.webp)

When the data transfer completes, you will see a green or red indicator, showing success, or failure for the process.

![Screenshot](./images/execute-a-process-3.webp)

You can check the detail of the process by clicking on **View History.**

![Screenshot](./images/execute-a-process-4.webp)

You can confirm the row counts for each phase of the process and double click on a bar to drill down to any messages or warnings — including the potential for truncation and the reason why rows were excluded.

![Screenshot](./images/execute-a-process-5.webp)

> *To see the history of all Processes in the Project, go to the Activity page.*

## Stop a Process execution

To stop a process while it is executing, click on the red wheel at the top right of the screen. This will be visible with the count of processes executing.

![Screenshot](./images/execute-a-process-6.webp)

Double click on the process — a running process will be blue.

![Screenshot](./images/execute-a-process-7.webp)

Click the **Stop** button.

![Screenshot](./images/execute-a-process-8.webp)

In the activity page the process that has been stopped will appear with the red icon.

![Screenshot](./images/execute-a-process-9.webp)

> *In the case of a stopped process regardless of when you click STOP, no data will be written to the destination - then the entire batch is aborted.*

## Run a Process Group

A process group can be executed manually and the order that each process runs is determined by the destination relational data integrity constraints or in parallel (when there are no constraints).

A Process Group can be run from the Process Group page — click **Execute Now**

![Screenshot](./images/execute-a-process-10.webp)

Or it can be executed from within the detail of the process group — click **Execute Group Now** at the top right hand of the page.

![Screenshot](./images/execute-a-process-11.webp)

More options working with processes are in the following pages;

-   Create [Process Expressions](../create-process-expressions/)
-   Work with [System Expressions and Constants](../use-process-constants-and-system-expressions/)
-   Configure [Process tolerances and Options](../process-options-thresholds-and-toleration/)
-   Apply [a time based schedule](../process-group-time-schedule/) to your Process Groups
-   Apply [an event based schedule](../process-event-execution-schedule/) to your Process Groups
