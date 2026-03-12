---
title: "AI Agent Discovery in Cartography"
date: "2026-03-12"
summary: "Open source Cartography now discovers AI agents in container images and maps them into the infrastructure graph."
author: "Alex Chantavy"
authorUrl: "https://www.linkedin.com/in/alexchantavy"
---

Everyone is excited about AI agents because of what they can do on their own, but if you look at what an agent actually is at the infrastructure level, it looks a lot like a microservice:

- It talks to storage
- It has networking
- It runs on compute
- It executes tools using permissions tied to an identity
- It talks to other agents

As an industry we've mostly solved microservice visibility with cloud APIs, service meshes, distributed tracing, and SBOMs. However, things are still incredibly early with AI.

Most teams have no idea which of their container images have AI agents in them, what tools those agents have declared, what IAM roles they assume, or whether they're exposed to the internet.

We're thrilled to share that [Cartography](https://github.com/cartography-cncf/cartography) can now answer all of these questions. We scan container images for AI components - agents, models, tools, memory, prompts - and map them directly into the infrastructure graph alongside everything else Cartography already tracks.

## The query

If you skip through the rest of this post, just read this. This single query answers the question: which AI agents are reachable from the internet, at what DNS name, using what IAM role, using which LLM and tools?

```cypher
MATCH (agent:AIAgent)-[:DETECTED_IN]->(img:ECRImage)
      <-[:HAS_IMAGE]-(:ECSContainer)
      <-[:HAS_CONTAINER]-(task:ECSTask)
      -[:HAS_TASK_DEFINITION]->(:ECSTaskDefinition)
      -[:HAS_TASK_ROLE]->(role:AWSRole)
MATCH (task)-[:NETWORK_INTERFACE]->(:NetworkInterface)
      -[:PRIVATE_IP_ADDRESS]->(:EC2PrivateIp)
      <-[:EXPOSE]-(lb:AWSLoadBalancerV2)
      <-[:DNS_POINTS_TO]-(dns:AWSDNSRecord)
OPTIONAL MATCH (agent)-[:USES_TOOL]->(tool:AITool)
OPTIONAL MATCH (agent)-[:USES_MODEL]->(model:AIModel)
RETURN agent.name, agent.framework,
       dns.name AS fqdn, role.arn AS iam_role,
       collect(DISTINCT tool.name) AS tools,
       collect(DISTINCT model.name) AS models
```

This traverses from the **AI agent** detected inside a **container image**, through the **ECS task** running it, to the **IAM role** it assumes and the **load balancer** and **DNS record** that expose it to the internet.

We use scanners to find the agent, AWS APIs to find the surrounding infrastructure, and Cartography to connect them in the same graph.

## Why this matters

The agent discovery ecosystem today feels a lot like container security in the 2010s. The [EU AI Act](https://artificialintelligenceact.eu/) and [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) are pushing organizations toward maintaining inventories of the AI systems they operate. You can't govern what you can't see, and you can't assess the blast radius of an agent you don't know exists.

Agents in production are different from traditional apps because they are designed to be helpful and adaptive, so they may make use of whatever resources, permissions, and tools available to them. A traditional application, by contrast, is constrained by the logic its devs explicitly coded into it. For it to go off the rails, it would have to be compromised by an attacker; I talked about this in this [video](https://www.youtube.com/watch?v=PocX2RiNO0k).

I'm paying a lot of attention to this space because so little of the security and governance infrastructure exists yet. The goal is straightforward: help organizations adopt AI with more confidence because they can understand and control what they're running. We're using old graph techniques to get a handle on modern problems :).

## How this works

The first step is figuring out what's inside the container. 

We use Cisco's [AIBOM](https://github.com/cisco-ai-defense/aibom) scanner to analyze container images and detect agents by framework (`pydantic_ai`, `langchain`, `openai`, and others), down to the file path and line number - special thanks to the maintainers! It picks up declared tools, models, memory, embeddings, and prompts. Each component becomes an `AIBOMComponent` node in the Cartography graph, with agents getting an additional `AIAgent` label, connected to `ECRImage` nodes via manifest digest.

The second step is figuring out where the image is running, and this is just stock Cartography:
- ECR images link to ECS containers
- ECS containers link to ECS tasks
- ECS tasks link to network interfaces, subnets, VPCs, security groups, load balancers, and DNS records

The third step is figuring out what the agent can actually do from an infra perspective. This is also stock Cartography:
- ECS tasks link to task definitions
- Task definitions link to IAM roles and their attached policies

On the AI side, agents link to their declared tools, models, and multi-agent workflows. The combination of IAM permissions and declared tool integrations is the agent's real capability set.

The key join is `manifest_digest` between AIBOM scan results and ECR images. This forms a bridge between "what's in the image" and "where it runs in your cloud".

## Queries this unlocks

### Which agents are reachable from the internet, and have access to read from a storage bucket?

```cypher
MATCH (agent:AIAgent)-[:DETECTED_IN]->(:ECRImage)
      <-[:HAS_IMAGE]-(c:ECSContainer {exposed_internet: true})
      <-[:HAS_CONTAINER]-(task:ECSTask)
      -[:HAS_TASK_DEFINITION]->(:ECSTaskDefinition)
      -[:HAS_TASK_ROLE]->(role:AWSRole)
      -[:CAN_READ]->(bucket:S3Bucket)
RETURN agent.name, role.arn, bucket.name
```

### Show me all agents reachable at *.mycompany.com:

```cypher
MATCH (dns:AWSDNSRecord)
      -[:DNS_POINTS_TO]->(lb:AWSLoadBalancerV2)
      -[:EXPOSE]->(:EC2PrivateIp)
      <-[:PRIVATE_IP_ADDRESS]-(:NetworkInterface)
      <-[:NETWORK_INTERFACE]-(task:ECSTask)
      -[:HAS_CONTAINER]->(:ECSContainer)
      -[:HAS_IMAGE]->(img:ECRImage)
      <-[:DETECTED_IN]-(agent:AIAgent)
WHERE dns.name ENDS WITH '.mycompany.com'
RETURN dns.name, agent.name, agent.framework
```

## Things are early and we are damn excited

We're quickly adding support to discover agents and correlate them to more pieces of infrastructure beyond AWS ECS. 

Now that the data is in the graph, we can also build Cartography security rules that alert when an agent violates governance policies, such as an agent with no tool restrictions or one using an unapproved model provider.

Try it out on your environment - Cartography is [here](https://github.com/cartography-cncf/cartography), and PRs are always welcome. Join the [Slack community](https://github.com/cartography-cncf/cartography/?tab=readme-ov-file#community). We'd love to hear feedback and have your help building the agent discovery ecosystem in open source.
