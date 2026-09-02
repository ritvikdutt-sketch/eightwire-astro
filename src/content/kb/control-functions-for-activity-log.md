---
title: "Control Functions for Activity Log"
description: "Where the other functions described will write data to a destination column — control flow —functions are designed to write arbitrary data to the Batch Log, with different levels of severity. In the case of the Error function, this will additionally cause the Batch to abort. These can be used to log specific conditions, monitor the data for specific conditions and generate warnings, or in extreme cases, force the batch to abort before the Write phase has begun if some condition has arisen that you wish to avoid. These functions should be used very carefully. Consider whether the tolerances in Process options can achieve the same result."
category: "Process Expressions Syntax"
order: 50
sourceUrl: "https://www.eightwire.io/knowledge-base/control-functions-for-activity-log"
---

Each control function includes an optional second parameter. If you call these functions with only one parameter they will return an empty string after they have written information to the Batch Log. If you wish them to return a useful value that might get written into the destination table or used elsewhere in your expression, then you should provide a second parameter, which is returned unmodified instead of an empty string.

It is unwise to use these functions on their own without a conditional operator because seldom would you ever want to write a log entry for every row of a table – this would cause the log to grow very large and would slow down the Batch execution. For this reason, the example below uses a conditional operator before deciding to write a message to the log.

For example, to log a Warning in the Batch Log for each row where the *"Flow"* column contains data with a value over *100*, you could use the following expression – note this uses a conditional operator to check the value before deciding whether to return the data directly or generate a warning:

*Data("Flow") < 100 ? Data("Flow") : Warning("Too high")*

The following example is the same, except the additional *value* parameter is added to the function so that the whole expression returns data no matter which way the conditional operator goes:

*Data("Flow") < 100 ? Data("Flow") : Warning("Too high"****, Data("Flow")****)*

It’s also useful to understand that Eightwire  internally processes data in parallel. This means that when the source data comes in, it’s broken up into pieces and each piece is processed at the same time as some or all of the other pieces. This parallel processing may result in Batch Log messages written using these functions arriving in the Batch Log out of order. If you use the Error function to abort a batch, you may occasionally still see other messages written to the Batch Log after the error message because a parallel block is still processing and may not be aborted until that block of records has been dealt with.
