<!--
  If you have a relevant JIRA issue number, please put it in the issue title.
  Example: UIMS-1 Add "Configuration options" page to settings
-->

## Purpose
<!--
  Why are you making this change? There is nothing more important
  to provide to the reviewer and to future readers than the cause
  that gave rise to this pull request. Be careful to avoid circular
  statements like "the purpose is to update the schema." and
  instead provide an explanation like "there is more data to be provided and stored for Purchase Orders
  which is currently missing in the schema"

  The purpose may seem self-evident to you now, but the standard to
  hold yourself to should be "can a developer parachuting into this
  project reconstruct the necessary context merely by reading this
  section."

  If you have a relevant JIRA issue, add a link directly to the issue URL here.
  Example: https://folio-org.atlassian.net/browse/UIMS-1
 -->

## Approach
<!--
 How does this change fulfill the purpose? It's best to talk
 high-level strategy and avoid code-splaining the commit history.

 The goal is not only to explain what you did, but help other
 developers *work* with your solution in the future.
-->

## Screenshots
<!-- OPTIONAL
 One picture is literally worth a thousand words. When the feature is
 an interaction, an animated GIF or video is best. Most of the time it helps to
 include "before" and "after" screenshots to quickly demonstrate the
 value of the feature.

 Here are some great tools to help you record gifs:

 Windows: https://getsharex.com/
 Mac: https://gifox.io/
-->

<!-- OPTIONAL
#### TODOS and Open Questions
- [ ] Use GitHub checklists. When solved, check the box and explain the answer.
-->

<!-- OPTIONAL
## Learning
  Help out not only your reviewer, but also your fellow developer!
  Sometimes there are key pieces of information that you used to come up
  with your solution. Don't let all that hard work go to waste! A
  pull request is a *perfect opportunity to share the learning that
  you did. Add links to blog posts, patterns, libraries or addons used
  to solve this problem.
-->

## Pre-Merge Checklist
Before merging this PR, please go through the following list and take appropriate actions.
- [ ] I've added appropriate record to the CHANGELOG.md
- Does this PR meet or exceed the expected quality standards?
  - [ ] Code coverage on new code is 80% or greater
  - [ ] Duplications on new code is 3% or less
  - [ ] There are no major code smells or security issues
- Does this introduce breaking changes?
  - [ ] If any API-related changes - okapi interfaces and permissions are reviewed/changed correspondingly
  - [ ] There are no breaking changes in this PR.

If there are breaking changes, please **STOP** and consider the following:

- What other modules will these changes impact?
- Do JIRAs exist to update the impacted modules?
  - [ ] If not, please create them
  - [ ] Do they contain the appropriate level of detail?  Which endpoints/schemas changed, etc.
  - [ ] Do they have all they appropriate links to blocked/related issues?
- Are the JIRAs under active development?
  - [ ] If not, contact the project's PO and make sure they're aware of the urgency.
- Do PRs exist for these changes?
  - [ ] If so, have they been approved?

Ideally all of the PRs involved in breaking changes would be merged in the same day to avoid breaking the folio-testing environment.  Communication is paramount if that is to be achieved, especially as the number of intermodule and inter-team dependencies increase.

While it's helpful for reviewers to help identify potential problems, ensuring that it's safe to merge is ultimately the responsibility of the PR assignee.
