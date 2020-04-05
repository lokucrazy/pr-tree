## PR-Tree

A tool for me to get visually pinged on replies to comments i make on pull requests.

I hate getting spammed with outlook emails, but I also still want to be notified of when a review comment i placed gets replied to.

flow:
get comments from pr -> find my comments and their ids -> find all other comments that `in_reply_to_id` my comments id -> long poll and ping when a new comment has arrived