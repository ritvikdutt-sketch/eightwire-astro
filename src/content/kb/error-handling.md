---
title: "Error Handling"
description: ""
category: "Process Expressions Syntax"
order: 51
sourceUrl: "https://www.eightwire.io/knowledge-base/error-handling"
---

Generally, if your expression fails you will want to know about it and you'll want the batch to fail before writing any data to the destination so that you have an opportunity to fix the data or the expression that failed.

However, in some situations you may know that your expression will fail occasionally due to poor data quality. The best approach is to write a better expression that checks the data before doing anything with it that might break. However, if that is not possible or desirable, you can instead instruct Eightwire to treat any errors as warnings instead of causing an error and stopping the Batch.

To do this, your expression should be prefixed with:

***Try:***

This must appear at the very start of your expression, before anything else. This is not actually part of the expression itself – it simply tells Conductor that you want any errors that might occurs to be treated as warnings instead and that the batch should continue running if **this** expression causes an error.

For example, if your Process contains a column called *ExpiryDate* and you wish to add one month to it before sending it to the destination, you might do something like this:

*DateAdd(Data("ExpiryDate"), "Month", 1)*

However, if the *ExpiryDate* column does not contain a valid date or datetime value, the *DateAdd* function will generate an error and your Batch will fail. To avoid this, there are two simple solutions.

The following example shows a better way to write this expression – it checks whether the column contains valid data first before adding 1 month and if it doesn't contain valid data it returns an empty string ("") instead:

*IsDate(Data("ExpiryDate")) ? DateAdd(Data("ExpiryDate"), "Month", 1) : ""*

This alternative example, shows how to use the ***try*** predicate to suppress any errors instead:

***Try:*** *DateAdd(Data("ExpiryDate"), "Month", 1)*

In the first example, nothing will be written to the Batch Log, even if the data is invalid because the expression won't fail for that reason.

In the second example, if the data is invalid, the expression will fail but only a warning will be written to the Batch Log. The only exception is when you have used the *Error* function in your expression – this will still cause the Batch to abort and report an error regardless of the *Try::* prefix.
