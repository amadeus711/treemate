# treemate · [![Coverage Status](https://coveralls.io/repos/github/07akioni/treemate/badge.svg)](https://coveralls.io/github/07akioni/treemate)

[中文](README.zh-CN.md) | English

Help you manipulate tree data structure for user interface. (Can be used in Tree, Select, Dropdown, Table, Menu components and ...)

1. check nodes in the tree
2. move along tree nodes
3. get flattened nodes
4. get node by key
5. get path of nodes
6. support group node
7. meta info of nodes
8. ...

## Installation
```bash
npm install --save treemate
```

## Basic Usage
```js
import { createTreeMate } from 'treemate'

const data = [
  // non-leaf node
  {
    key: 1,
    children: [
      {
        key: 2
      }
    ]
  },
  // leaf node
  {
    key: 3,
  },
  // group node
  {
    key: 4,
    type: 'group',
    children: [
      {
        key: 5
      }
    ]
  }
]

const treeMate = createTreeMate(data)
const treeMateNode = treeMate.getNode(1)
```

## API
### `createTreeMate`
#### `createTreeMate(nodes: RawNode[], options): TreeMate`
Create a `TreeMate` instance.

`nodes` is a array. Every node looks like
```ts
interface RawNode {
  key?: Key
  children?: RawNode[]
  isLeaf?: boolean // Need not to fill if not in async mode
  disabled?: boolean
  [key: string]: any
}
```

`options` looks like
```ts
interface TreeMateOptions {
  getDisabled?: (node: RawNode) => boolean
  getKey?: (node: RawNode) => Key
}
```
`getDisabled` is used to determine the `disabled` status of a node. `getKey` is used to generate the key of a node inside `TreeMate`.

### `TreeMate`
#### `treeNodes`
Corresponding `TreeMateNode` Array of original data. The tree structure is identical to the original data.
#### `treeNodeMap`
A map of `key` to tree node.
#### `flattenedNodes`
The flattened nodes of the tree.
#### `getNode(key)`
Use key to get tree node. Returns `null` if not exists.
#### `getCheckedKeys(checkedKeys, options?)`
Get checked status of the tree.

Param `checkedKeys` has two forms:
```ts
Key[] // 1. currently checked keys

// 2. merged checked status
interface InputMergedKeys {
  checkedKeys?: Key[] | null
  indeterminateKeys?: Key[] | null // 半选
}

// can also be
null | undefined
// at least it won't throw an error
```
Param `options` looks like
```ts
interface CheckOptions {
  cascade?: boolean // cascade check status, default is true
  leafOnly?: boolean // whether only allow leaf node being checked, default is false
}
```
Return value looks like
```ts
interface MergedKeys {
  checkedKeys: Key[]
  indeterminateKeys: Key[] // half checked
}
```
#### `check(keysToCheck, checkedKeys, options)`
Get checked status of the tree after some nodes are checked.

`keysToCheck` could be `Key | Key[] | null | undefined`。

For `checkedKeys`, `options` and return value, see `getCheckedKeys(checkedKeys, options?)`。
#### `uncheck(keysToUncheck, checkedKeys, options)`
Get checked status of the tree after some nodes are unchecked.

`keysToCheck` could be `Key | Key[] | null | undefined`。

For `checkedKeys`, `options` and return value, see `getCheckedKeys(checkedKeys, options?)`。
#### `getPath(key)`
获取从根到该 `key` 对应节点的路径。返回值形如
```ts
interface MergedPath {
  keyPath: Key[],
  treeNodePath: TreeMateNode[],
  treeNode: TreeMateNode | null
}
```
其中 `keyPath` 为路径中各个节点的 `key`。其中 `treeNodePath` 为节点路径。`treeNode` 该 `key` 对应的 `TreeMateNode`。
#### `getFirstAvailableNode()`
获取整个树第一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。
#### `getPrev(key, options)`
获取该 `key` 对应节点的前一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。

`options` 形如 `{ loop?: boolean }`，默认 `loop` 为 `false`，不会循环寻找。
#### `getNext(key, options)`
获取该 `key` 对应节点的后一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。

`options` 形如 `{ loop?: boolean }`，默认 `loop` 为 `false`，不会循环寻找。
#### `getParent(key)`
获取该 `key` 对应节点的父级 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。
#### `getChild(key)`
获取该 `key` 对应节点第一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。

### `TreeMateNode`
#### `rawNode`
Corresponding original data node for `TreeMateNode`.
#### `level`
The level of the node, which starts from 0.
#### `index`
`index` of node itself.
#### `fIndex`
`index` inside `flattenedNodes`.
#### `parent`
Parent `TreeMateNode` of the node. It's `null` if not exists.
#### `isLeaf`
Whether node is leaf node.
#### `isGroup`
Whether node is group node.
#### `isShallowLoaded`
Whether node's direct child node is loaded.
#### `disabled`
Whether the node is disabled.
#### `siblings`
Sibling nodes array of the node. It's a `TreeMateNode` Array.
#### `children`
Child nodes array of the node. It's a `TreeMateNode` Array.
#### `getPrev(options?)`
获取该节点的前一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。

`options` 形如 `{ loop?: boolean }`，默认 `loop` 为 `false`，不会循环寻找。
#### `getNext(options?)`
获取该节点的后一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。

`options` 形如 `{ loop?: boolean }`，默认 `loop` 为 `false`，不会循环寻找。
#### `getParent()`
获取该节点的父级 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。
#### `getChild()`
获取该节点第一个非 `disabled` 的 `TreeMateNode`，寻找过程中 `group` 节点自身会被忽略，不存在时返回 `null`。
