---
title: "Salesforce Connector"
description: "Connecting to your Salesforce Account using an Eightwire datastore enables you to read and write data to standard or custom objects. The Datastore can be used after you setup access using the Salesforce Platform Tools. Once the Datastore is connected it can be shared with another Eightwire Account or used in a process for data transfer."
category: "Datastore Features"
order: 39
sourceUrl: "https://www.eightwire.io/knowledge-base/salesforce-connector"
---

## Salesforce Account Access

In order to connect Eightwire must be created as a connected app using the Salesforce Platform Tools.

Connected App Name \_\_\_\_\_\_\_\_\_\_\_\_\_\_

API Name \_\_\_\_\_\_\_\_\_\_\_\_\_\_

Contact Email \_\_\_\_\_\_\_\_\_\_\_

Check to **‘Enable OAuthSettings’**

Enter  **Callback URL**

https://login.salesforce.com/services/oauth2/callback

Add **Full Access** to Selected OAuth Scopes

Check **‘Require Secret for Web Server Flow’**

![Salesforce Account Access (screenshot)](./images/salesforce-connector-1.webp)

## Create a Datastore

From the Datastore Page click **+New**

Name your Datastore and select **‘In the cloud’** and **‘Salesforce’**

![Create a Datastore (screenshot)](./images/salesforce-connector-2.webp)

**Connection**

**UserName** — User that has access to your Salesforce Account

**Password —** User Password+SecurityToken

**SecretKey —** Consumer Secret for the API

**AccessKey —** Consumer Key for the API

**Option —** Choose Source or Destination

**Region Lock —** Select a processing Region (recommended)

Click **CREATE**

Test and Scan the Datastore

## Process Types

The following process types are supported;

Source Datastore

-   Read from a Custom Object
-   Read from a Standard Object

Destination Datastore

-   Overwrite to an Standard or Custom Object
-   Append to a Standard or Custom Object
-   Merge New and Changed to a Custom Object
