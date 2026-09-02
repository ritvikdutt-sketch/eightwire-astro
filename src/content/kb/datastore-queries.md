---
title: "Datastore Queries"
description: "If a Source Datastore contains objects from a relational database, then a datastore query can be used to create and transform a set of data. The query is then visible in a shared datastore and can be used in a process. There are 13 Datastores that allow datastore queries — find the full list at Connector Types"
category: "Datastore Features"
order: 32
sourceUrl: "https://www.eightwire.io/knowledge-base/datastore-queries"
---

## Create a Datastore Query

Once you have created the datastore, navigate to the Queries tab

Click **+New** to add a new query

![Screenshot](./images/datastore-queries-1.webp)

Enter the syntax of the query into the query panel (or copy and paste it in).

![Screenshot](./images/datastore-queries-2.webp)

The syntax to be used should be appropriate for the database type you are querying.

Name the query and add an optional description.

Click **Save**

When browsing the objects appear exactly as you have named them with (data query) at the end, their detail can be browsed in the same way as any other datastore object.

To check whether a query is validated, browse the datastore and scan the object.

Any error related to the statement will appear when the datastore is scanned.

![Screenshot](./images/datastore-queries-3.webp)

> You can use a select statement or execute a stored procedure in the query pane.

## Points to consider when using a datastore query

**Referencing database objects** — ensure that all the objects referenced are able to be used - as defined by the security context of the Agent and the connection string.

**You can reference temporary tables** — but in that case, you may receive a warning in the read step that means the schema of the temporary tables cannot be inferred during the query execution.

This does not affect the result of the query but relates to the RetainSameConnectionProperty of the OLEDB Connection Manager.

An alternative is to reference a variable table so that the column properties are defined in the query. In that case, no warnings will be shown.

**You can reference an inline table in the SQL statement** — if you do you will see any columns used in the inline query and presented in the main query repeated as unused source columns. This does not affect the process, which will execute without warnings about unmapped columns.

![Screenshot](./images/datastore-queries-4.webp)

> Always test the datastore query syntax and permissions are correct using [Datastore browse and scan](../scan-browse-and-edit-objects/)
