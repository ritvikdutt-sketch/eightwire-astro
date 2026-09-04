---
title: "Authenticate an Agent"
description: "An Agent must be authenticated by generating and registering a unique key. This is a requirement after a new Agent installation and for existing Agents after the update on 30 August 2022 to Agent version 2.2022.830.1 At any time you can generate and register a new key for your Agent. We recommend that you register a new key at least once a year. Manual and Automatic updates to the Agent do not require the registration of a new key."
category: "Install an Agent"
order: 11
sourceUrl: "https://www.eightwire.io/knowledge-base/authenticate-an-agent"
---

To authenticate an Agent, you need to be an Administrator on the Eightwire Account and have local administrator access to the computer or server where the Agent is installed.

1.  Go to the Agent page and click on an Agent
2.  Click **Authentication Key**
3.  Click **Proceed** to generate the authentication key.

![Generate a new key for 'Agent 99' dialog with the offline warning and the cursor on the Proceed button](./images/authenticate-an-agent-1.webp)

4\. Copy the generated Key

![Generate a new key dialog showing the generated key in the Key generated field with the copy icon and 'copied!' tooltip](./images/authenticate-an-agent-2.webp)

5\. On the computer where the Agent is installed — navigate to the Eightwire Conductor Agent folder.

6\. Click on the AgentConfiguration application

![Windows Explorer view of the Conductor Agent folder in Program Files (x86) with the AgentConfiguration application selected](./images/authenticate-an-agent-3.webp)

7\.  Click **Upload New Key**

8\.  Paste the Authentication Key into the field.

9\.  Click **Save**

10\. Click **Update**

11\. Click **Yes** to confirm the Service restart

![Conductor Agent Configuration window with the Authentication Key field and the Service restart required prompt, cursor on Yes](./images/authenticate-an-agent-4.webp)

12\. Close the Agent Configuration Application.

13\. On the Eightwire Agent page — click the **refresh icon** on the top right of the Agent .

14\. A message will appear **New Values Updated** and the Agent label will show **Online**

![Agent 99 page with the cursor on the refresh icon at the top right and the Agent label showing Online](./images/authenticate-an-agent-5.webp)

## To see the process for authenticating an existing Agent, check out this video...

<div class="kb-embed"><iframe src="https://www.youtube.com/embed/JEW_mpqYxDw" title="Eightwire Agent Authentication" loading="lazy" allowfullscreen=""></iframe></div>

## To see the complete process from installation to authentication of a new Agent, check out this video...

<div class="kb-embed"><iframe src="https://www.youtube.com/embed/1Qqy_NI_Fo4" title="Basic Steps to Install an Agent" loading="lazy" allowfullscreen=""></iframe></div>

Congratulations! Your Agent is online. To connect to data go to [Create and Connect](../create-and-connect/)
