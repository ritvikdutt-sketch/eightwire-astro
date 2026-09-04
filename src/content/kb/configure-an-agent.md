---
title: "Configure an Agent"
description: "This page shows you to make changes to an installed Agent - such as changing permissions, manually updating or deleting the Agent. You must have local administrator privileges on the computer to configure the installed Agent"
category: "Install an Agent"
order: 10
sourceUrl: "https://www.eightwire.io/knowledge-base/configure-an-agent"
---

## Access the Agent

Log onto the Windows computer where the Agent is installed.

Locate the folder where the Agent is installed. This will likely be:

*C:\\Program Files (x86)\\Eight-wire Agent*

Run the 'AgentConfiguration.exe' utility.

You will be asked to confirm that you want to allow this app to make changes. Click **Yes** to continue.

This utility will tell you if the Agent service is running or not, what its unique identifier is, and what proxy settings in use.

Click Update to restart the service or make any changes to;

-   Proxy Settings
-   Windows Account credentials.

## Manually Update the Agent

Log onto the Windows computer where the Agent is installed.

Locate the folder where the Agent is installed. This will likely be: *C:\\Program Files (x86)\\Eight-wire Agent*

Click on the Agent Update application and click to allow the application to make changes

![File Explorer in the Program Files (x86) Conductor Agent folder, showing the AgentUpdate application](./images/agent-updates-2.webp)

You will see if the update has succeeded and what the new version is.

Use any key to exit.

![AgentUpdate.exe console window showing Succeeded! after each configuration step and the Press any key to exit prompt](./images/agent-updates-3.webp)

## Uninstall an Agent

If for any reason you need to uninstall - then you need to do this through the Program Files and  through the Eightwire Agents page.

Locate the folder where the Agent is installed.

Click on the **unins000** Application and allow the Application to make changes.

Click **Yes** to confirm the delete.

![Conductor Agent Uninstall confirmation dialog with the Yes button, shown over the Agent folder with unins000 selected](./images/configure-an-agent-3.webp)

The Agent is uninstalled. You can delete the remaining text files and the folder.

![Conductor Agent Uninstall dialog confirming successful removal with an OK button; remaining text documents in the Agent folder](./images/configure-an-agent-4.webp)

In the Eightwire portal on the Agent page click **Delete**.

![Agent page details panel with Machine, OS and Version, Admin Controls Stop and Uninstall, and the Delete button highlighted](./images/configure-an-agent-5.webp)

Confirm by clicking **Delete**, the Agent will no longer appear on the Agent page or be available on the datastore page.

![Are you sure? dialog warning that deleting an agent removes it from your account but does not uninstall it, with the Delete button](./images/configure-an-agent-6.webp)

As well as the steps to configure your Agent, there are other factors that you can consider when troubleshooting an Agent that is not connecting — check out [Agent FAQs and Connectivity Troubleshooting](../agent-faqs-and-connectivity-troubleshooting/)
