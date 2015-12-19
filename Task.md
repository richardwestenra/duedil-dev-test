# Front End Engineering Task

## Intro
The DueDil engineering team have been having a nightmare with their issue tracker. Developers are struggling to find bugs relevant to their department, or what they are working on.

We need an interface for developers to view the current issues, and be able to filter these based on certain attributes. Some of the back end developers are working on a solution for storing these issues. There will be an endpoint returning an array of json objects describing the issues (No need to worry about pagination for this - the backlog never exceeds 20 entries :smirk:).

We might choose to add in more filters and attributes to each issue in the future. Bear this in mind when building an interface.

## Design

No strict layout or aesthetic guidelines for this task, so feel free to show off your skills here. We'd just like to see a list of issues with their corresponding ID, description, category, project and assignee, along with some external controls to filter the list.

One functional requirement we'd like to impose is the ability to add filters inline as well as using the filter controls. For example, when clicking on the assignee "Nick", we'd like to filter the list to only issues assigned to "Nick", and the controls to update to reflect this.

We'd like to keep the interface **simple**, **clear**, **responsive** and **easy to use**.

## Data Structure
The data should be loaded asynchronously from a service. For the UI, use this hard coded sample `json` in a separate file.

Data will be provided in the following format:

```
[
	{
		"id": "001",
		"description": "Make the logo bigger",
		"category": "Front-end",
		"project": "Top bar design",
		"assignee": "Nick"
	} //, ...
]
```

## What we're looking for
 - Mobile/touch friendly responsive interface
 - Well structured, semantic HTML
 - Well designed interface
 - Straight forward to add more attributes for each issue in the future