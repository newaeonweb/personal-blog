---
title: Front-end tools behind a proxy.
description: "How to setup your environment behind a proxy."
tags: [Front-end]
date: 2014-07-15
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: false
---

It's very common when you start to develop web applications in big companies, face some crushing walls with firewall and other network policies, ssh certificates, user roles and other's things.

This post is just to give you a light and a path to follow to work with tools like **Bower**, **NPM**, **Git**, **Brackets**, **Gem**.

As you know all this tools have some plugins and extensions to make our job easer, so let's see what we need.
Almost procedures follow the same conventions, a config file on your root user folder, generally start with ( . )  

## Bower

```json

    {
        "proxy" : "http://yourname:yourpassword@host:port",
        "https-proxy" : "http://yourname:yourpassword@host:port"
    }

```

Save this file as: `.bowerrc´.

## Git

```vim

    [http]
	proxy = http://yourname:yourpassword@host:port
    [https]
	proxy = http://yourname:yourpassword@host:port
```

Save this file as: `.gitconfig´.

## Npm

```

    strict-ssl = true
    proxy = http://yourname:yourpassword@host:port
    https-proxy = http://yourname:yourpassword@host:port

```

Save this file as: `.npmrc´.

## Brackets

```json

    {
    "proxy": "http://yourname:yourpassword@host:port",
    }

```


This file can be found on debug menu, preferences file, just add this line and save.

## Gem

```

    proxy = http://yourname:yourpassword@host:port

```

Save this file as: `.gemrc´.

That's all, now you must be able to use this tools.
