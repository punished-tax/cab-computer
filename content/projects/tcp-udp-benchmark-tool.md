---
title: "TCP/UDP benchmark tool"
date: "2026-02-14"
stack: ["Python", "sockets", "threading", "matplotlib"]
excerpt: "A local, multi-client chatroom where a user could send a set number of packets using either TCP or UDP to measure packet loss and time to arrival."
github: ""
demo: ""
screenshots: []
---

## the goal

I wanted a hands-on answer to a question that's easy to state and annoying to actually feel: what does "TCP is reliable, UDP is fast" cost in practice, on the same machine, with the same payloads, side by side? So instead of reading another diagram of the two handshakes, I built a small chatroom-shaped test harness where every message could be sent over either protocol and timed.

## the shape of it

A single server process holds a TCP listener and a UDP socket on two different ports, and any number of clients can connect to either. Each client picks a protocol, then fires a configurable number of packets at the server as fast as it can, each one stamped with a sequence number and a send timestamp.

```
client --(N packets, protocol=tcp|udp)--> server
server --(echo + receive timestamp)-------> client
```

The server just echoes each packet straight back with its own timestamp attached, so the client can compute round-trip time and, separately, tally which sequence numbers never came home.

## measuring loss on a protocol that doesn't lose things

TCP doesn't drop packets — the protocol itself hides that from you, retransmitting under the hood. So "loss" for the TCP side really means something different: not missing data, but the layer where the guarantee gets paid for. To make the comparison fair, I measured throughput degradation and latency variance instead of raw loss on the TCP side, while UDP got the honest version — count what came back within a timeout window, mark the rest lost.

For UDP specifically, loss tracking was simple: keep a set of sent sequence numbers, remove each one as its echo arrives, and after a grace period whatever's left in the set is gone.

## what showed up

At low packet rates the two were close enough to not matter. The gap opened once I pushed send rate up: UDP kept its per-packet latency flat while quietly losing more packets as I saturated the socket buffer, and TCP kept every packet but its effective throughput collapsed as retransmits and window backoff kicked in under the same load. Neither result was surprising in the abstract — but watching the latency-vs-loss tradeoff show up as two diverging lines on a chart, from packets I sent myself, made it click in a way the textbook description never did.

## what I'd change

The chatroom framing was mostly a fun way to make the traffic feel like something instead of synthetic noise, but it added UI work that didn't help the measurement. A pure headless benchmark mode would've gotten me to the interesting data faster.

## outcome

A local tool, not shipped anywhere, but it did what side projects are supposed to do — turned a fact I could recite into a graph I'd actually watched happen.
