---
title: "Account Alerts"
description: "Configure email notifications for events across your entire Account using Account Alerts. Make sure Agents are online and Datastores and Processes are in operation without needing to log in to Eightwire."
category: "Account and Project Alerts"
order: 28
sourceUrl: "https://www.eightwire.io/knowledge-base/account-alerts"
---

Navigate to **Account Alerts** from the Quick Access menu on the account dashboard.

![Dashboard Quick Access panel with the Alerts bell icon highlighted among Projects, Agents, Account, Users, Audit, Reports and Help](./images/account-alerts-1.webp)

Select an Alert threshold to apply to the selected Alert options;

![Alert me for dropdown open on Account Activity Alerts, listing Success, Warnings and Failures; Warnings and Failures; Failures Only](./images/account-alerts-2.webp)

For an Alert option, toggle to ON and enter any email addresses for notifications.

![Alert rows with Alert me for set to Warnings and Failures, process activity, Datastore connection and scan toggles ON with email tags](./images/account-alerts-3.webp)

Choose as many of the alert options as you require;

-   **Process Activity** The outcome of a data transfer is notified here.

-   ‍**Datastore Connection** The connectivity to the Datastore generates an email (Test Datastore)

-   **Datastore Scan** The automatic scan of objects in your Datastore generates an email (Scan Datastore).

-   **Datastore Object Scan** The results of a deep scan of the objects (Browse Datastore) generates an email.

-   **Agent Connection** Any change in the connectivity of an Agent generates an email.

In the example shown – any failed process within the entire Account or any Agent going offline will generate a separate email.

![Account Activity Alerts set to Failures Only with process activity and agent goes offline toggled ON and the Save button](./images/account-alerts-4.webp)

![Agent alert email with Connection details showing Status Connection lost, Agent Name Construction and the Last heartbeat time](./images/account-alerts-5.webp)

Automated emails will give a summary description of a failure or that warnings have been generated.

You can use the relevant Batch and ProcessID shown in the email to check the detail of the Project Activity by clicking on the link in the email.

Let us know at support@eight-wire.com if you need help interpreting the warning or error message.

![Batch Details alert email listing the process, BatchID and ProcessID, a dashboard link and Status Succeeded with warnings](./images/account-alerts-6.webp)

![History for dbo.ExcelApplesCon showing a data truncation warning on ClaimNumber followed by Batch succeeded](./images/account-alerts-7.webp)

To restrict your Alerts for specific Projects, check out [Project Alerts](../project-alerts/)
