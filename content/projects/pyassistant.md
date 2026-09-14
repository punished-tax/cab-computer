---
title: "pyassistant"
date: "2025-06-1"
stack: ["Typescript", "NextJS", "OpenAI API", "Redis"]
excerpt: "Daily python challenges alongside an AI assistant for small hints"
github: "github.com/punished-tax/pyassistant"
demo: "pyassistant.dev"
screenshots: ["/projects/pyassistant/pyassistant-1.png", "/projects/pyassistant/pyassistant-2.png"]
---

A Leetcode and Wordle fusion that tests your mettle in python programming. Alongside your daily problem is an assistant that is purposely holding back information and will only give you hints. The assistant has the question in its context and it will allude to you ideas of how to approach a solution. Any attempt at a solution can also be sent to the assistant by pressing the circular purple button and typing in your question. 

## How it works

Besides the question, 5 different expected outputs are generated based on the problem. A python standard library is fetched via CDN which allows browser code execution. The user's code is expected to pass all 5 test cases assuming the code runs without issues. For example, The problem Target Sum has a expected output 0 when the array only has zeroes. The user's code needs to account for that possibility.



