> **The issue have been fixed.**

## Prerequisites

yarn, node.js, docker, docker-compose

## 1. Run local graph-node

```sh
docker-compose up -d
```

Use `docker-compose logs --tail 50 -f graph-node` to check graph-node logs, make sure it is ready before proceeding to subgraph deployment. It may take a few minutes to download block data.

## 2. Deploy test subgraph

```sh
yarn install
yarn codegen
yarn build
yarn graph create test/test --node http://127.0.0.1:8020
yarn graph deploy test/test --ipfs http://127.0.0.1:5001 --node http://127.0.0.1:8020
```

## Check the result

Open http://127.0.0.1:8000/subgraphs/name/test/test/graphql?query=%7B%0A%20%20tests(first%3A%201)%20%7B%0A%20%20%20%20id%0A%20%20%20%20history%0A%20%20%20%20latest%0A%20%20%7D%0A%7D%0A, click "play" button on the upper left.

```diff
{
  "data": {
    "tests": [
      {
        "id": "0xea54182ea1cc48745ce381ff3810acc14532a631",
-        "history": [
-          "Trade"
-          "AskNew",
-        ],
-        "latest": "AskNew"
+        "history": [
+          "AskNew",
+          "Trade"
+        ],
+        "latest": "Trade"
      }
    ]
  }
}
```

Check block 165467 transactions order:

https://gw-mainnet-explorer.nervosdao.community/block/165467/transactions

```sh
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x2865b", true],"id":1}' "https://v1.mainnet.godwoken.io/rpc"
```
