finnish-holidays-web
====================

## Setup

Requirements: *Node*, *Ruby*

```
$ sudo npm install -g gulp
$ npm install
$ cp .env.dist .env
```

Open and configure the `.env` file.

## Start Development Environment

```
$ gulp
```

Launch your browser and navigate to: `http://localhost:1337`

## Deploy

```
$ gulp deploy
```

Deploy with images:

```
$ gulp deploy:all
```
