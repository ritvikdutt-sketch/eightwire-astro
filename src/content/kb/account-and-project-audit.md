---
title: "Account and Project Audit"
description: "Audit reports can be run to see any configuration change within an Account and Project. They can be run by Account and Project Administrators as required."
category: "Reporting and Audit"
order: 74
sourceUrl: "https://www.eightwire.io/knowledge-base/account-and-project-audit"
---

Navigate to Audit from the Account or Project Dashboards.

![Datashare Project dashboard General Stats tiles with the Audit tile highlighted](./images/account-and-project-audit-1.webp)

## The report can be run using these options

Select and click **Filter** to execute the report

**Project**  

Available in Account Audit Page

**User**

Select from Users assigned to a Project or Account

**From**

Start of a date range

**To**

The end of a date range

**Entity**

Choose a specific element within Eightwire to audit (for example Datastore, Mapping, Schedule)

**Audit Action**

Filter for Insert, Update, Delete or All

**EntityID**

A specific Entity can be queried using its ID - the ID appears in the URL when you are on a specific page. For example - click on a Datastore and you will see a 4 digit ID that is its unique identifier.

This example filters for a specific user changing the configuration of a Datastore,

![Audit Logger filters set to a user, date range, Entity DataStore, Audit action Update and Entity ID 4227, with the Filter button](./images/account-and-project-audit-2.webp)

The results are shown as a full description of a State Before and a State After - in the example, the change of RegionID = 7 to RegionID = 2, shows that the Datastore Sovereignty was changed.

![Audit result State Before and State After text panes, showing RegionID changed from 7 to 2](./images/account-and-project-audit-3.webp)

The information can be exported by selecting the download icon and choosing an Export setting (all data shows the summary as well as the State Before and State After text).

![Audit results grid download icon open, listing Export all data as csv, visible data as csv, selected data as csv and all data as pdf](./images/account-and-project-audit-4.webp)

> *Eightwire retains all Audit data for existing entities.*
