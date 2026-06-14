---
title: "向量相似度"
date: 2026-06-14
description: "记录向量相似度中 cosine、dot 和 euclidean distance 的基本区别。"
tags:
  - Search
  - Embedding
  - Recommendation Systems
author: Aqwddda
draft: False
---

对于物品x和query的向量相似度 $S(q,x)$，常用的有以下3种衡量方法：cosine，dot，euclidean distance。

我们来具体说说cosine和dot这俩种方法：

## cosine方法

相似度等于俩个向量之间夹角的余弦值：

$$
S(q,x) = \cos(q,x) = \frac{q \cdot x}{\|q\|\|x\|}
$$

## dot方法

相似度等于俩个向量的点积：

$$
S(q,x) = q \cdot x = \|q\|\|x\|\cos(q,x)
$$

因此，如果俩个向量做了归一化，那么dot和cosine这俩种方法就是等价的。

如果没有做归一化，那么dot方法相较于cosine方法有以下特点：

1. 对于训练集中频繁出现的物品，可能会学习到更大的向量模长，因此，使用 dot 方法时，模型可能会更倾向于召回这些热门物品。如果想要减轻热门物品模长的影响，可以使用一些变种，比如：

   $$
   S(q,x) = (\|q\|^\alpha) * (\|x\|^\alpha) * \cos(q,x), \quad 0 < \alpha < 1
   $$

2. 另外，对于训练时很少被更新的物品，如果初始化时有很大的模长，那么dot方法也会被这种情况所影响。
