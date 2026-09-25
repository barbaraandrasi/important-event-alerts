# User Prompts 1

## 1

[$grill-me](C:\Users\andra\.agents\skills\grill-me\SKILL.md) I have the following vague requirements:

We want users to be able to set up alerts so they get notified when something important happens in the world — like breaking news, market movements, natural disasters, that kind of thing. Should work for both email and Slack. Make it flexible enough that we can add more channels later.

We need an admin view too.

Keep in mind that this a take-home task for a frontend job.

Here are my initial thoughts, let's discuss them and let's clear out ambiguities. You can suggest other ideas and solutions if necessary.

Thoughts:

- in my opinion, for this task, I have to provide a UI for users to ask for alerts, mock SSE to continuously deliver notifications, implement a worker (which also better be mocked for now) which often gets the latest events, connect the solution to Slack and email
- I assume channel means email and Slack at the moment
- I will choose Vite + React + JavaScript for the solution
- I'm using Vite, because it's modern and fast
- I would like to only mock the backend part that this project might require (like getting the event data and no real Slack or Resend integration)
- will have to sort them out based on the user's preferences (i would like to list all the topics that are currently available), probably an AI agent can decide on the level of importance of each event
- I think it would be a good idea for the user to be able to add some keywords of what kind of events matter the most, like earthquake above 7, and feed the input to the LLM
- for the admin part I would add settings like which AI model to use, which APIs to include as option
- since there are many missing details about this project, the first thing I will do is to have a grilling session with Codex, so we can be on the same page of ideas
- I'm not familiar with how do I integrate this notification system into Slack, but luckily there is AI to make things clearer

## 2

Q1: The things they evaluate: We are not evaluating the solution itself. We are evaluating how you arrived at it. A working, polished implementation with no visible process tells us very little. What we want to see is how you directed the AI: how you framed the problem, what decisions you made and why, where you course-corrected, and how you validated output before accepting it. The artifacts of that process — plans, decision logs, prompt drafts, notes, intermediate outputs — are the submission. The code is evidence, not the point.

So the product is not supposed to be perfect, I think mock data is fine, my decisions overall are much more important.

Q2: A. because the main purpose of the task is related to the user feature, and also, the admin panels requirements are not specified anyway

Q3: A. sounds right

Q4: A.

Q5: C. because for a demo version being able to simulate event directly is useful

Q6: B. because dynamic channels are a must

Q7: let's stick to A, to keep the admin part simple

Q8: tell me more about lightweight A, because I might choose that option

Q9: A.

Q10: A. is enough

## 3

Q8: A. because it will look more like a real application

Q11: I'm already filling a document with steps I make and also added the thoughts I showed you, once I'll have a plan markdown I will send it separately. I like the idea of curating the most important reasoning behind the decisions, it provides a nice overview besides reading the whole grill me session. Add the artifacts you have mentioned.

Q12: C.

Q13: C., since the natural language input was my idea of integrating an LLM to help in a real life example, let's add it as a possibility but only mocked for now

Q14: B. sounds ok

Q15: B. so we mock how an LLM would behave

Q16: A. is a good idea since it includes monitorization too in one place

Q17: B. but with a caveat - let's also handle if the structure of data that local storage will save changes, because it can lead to data mismatches, outdated version and the application to break. We might add a version number to keep track of actual data structure

Q18: A. good for demo purposes

Q19: C. because making a visual distinction between channel types is important

Q20: B.

I have one more question: the task specifically mentions that notify if something important happens - is there any other way of evaluating importance than needing an LLM to evaluate by itself or by user input?

## 4

Q21: recommended is enough
Q22: recommended, but make sure that other type of events are also testable
Q23: B. because having at least earthquakes as a very realistic example is good enough
Q24: did not think of an exact structure, so let's try B then
Q25: sounds fair
Q26: ok
Q27: ok
Q28: of course not, transparency is important

## 5

[$to-spec](C:\Users\andra\.agents\skills\to-spec\SKILL.md) make a spec from the conversation

## 6

[$to-tickets](C:\Users\andra\.agents\skills\to-tickets\SKILL.md) turn the plan into local tickets

## 7

sounds good

## 8

will this whole conversation also be included in docs as a result of ticket 8?

## 9

# AGENTS.md instructions for D:\Projects\important-event-alerts

<INSTRUCTIONS>
# Development rules

These rules apply to all code changes in this repository.

## Readability

- Prefer readable, vertically spaced code over compressed one-line expressions.
- Put one import, statement, prop, and JSX element per line when a line would otherwise become crowded.
- Keep functions focused. Extract a component or helper when a function becomes difficult to scan.
- Use descriptive names such as `activeAlerts`, `selectedTopic`, and `deliveryRecords`.
- Keep event handlers short. Move evaluation, persistence, and transformation logic into named domain functions.
- Use early returns for simple branches and keep the main render path easy to follow.
- Preserve blank lines between imports, state declarations, helpers, effects, handlers, and returned JSX.

## React components

- One exported React component per file under `src/components`.
- Keep shared constants and non-React helpers in separate files.
- Use multiline JSX for elements with multiple props or nested content.
- Keep conditional rendering explicit; use a small named component when a conditional block becomes hard to read.
- Keep state ownership at the lowest common owner that still makes data flow clear.

## Verification

- Run `npm run lint` and `npm run build` after code changes.
- Keep non-trivial domain logic covered by a small runnable self-check or focused test.
- Review the generated diff for readability before committing.

</INSTRUCTIONS>
