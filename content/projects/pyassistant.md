---
title: "pyassistant"
date: "2025-06-1"
stack: ["Typescript", "NextJS", "OpenAI API", "Redis"]
excerpt: "Daily python challenges alongside an AI assistant for small hints"
github: "github.com/punished-tax/pyassistant"
demo: "pyassistant.dev"
screenshots: ["/projects/pyassistant/pyassistant-1.png", "/projects/pyassistant/pyassistant-2.png"]
---

A Leetcode and Wordle fusion that tests your mettle in python programming. Alongside your daily problem is an assistant that is purposely holding back information and will only give you hints. The assistant has the question in its context and can allude to you ideas of how to approach a solution. Any attempt at a solution can also be analyzed by the assistant by pressing the circular purple button and typing in your question. 

## How it works

Besides the question, 5 different inputs and expected outputs are generated. The user's code is expected to pass all 5 test cases assuming no runtime errors. For example, The problem 'Two sum' has the expected output 11 when the array is: [2, 7, 11, 16].

## Test cases

A python standard library is fetched via CDN which enables code execution both internally and in the coding sandbox. The fetched expected inputs are plugged in the fetched solution. The results of each input are the internally generated expected outputs that the user's code needs to account for. If the user's code misses any number of test cases that will reflect on the homepage.



