import { TreeNode, Key } from '../../interface'

export function expectArrayEqual (array1: Array<Key>, array2: Array<Key>) {
  expect(Array.from(array1).sort())
    .toEqual(Array.from(array2).sort())
}

export function expectCheckedStatusSame (
  status1: {
    checkedKeys: Key[],
    indeterminateKeys: Key[]
  },
  status2: {
    checkedKeys: Key[],
    indeterminateKeys: Key[]
  }
) {
  expect(Array.from(status1.checkedKeys).sort())
    .toEqual(Array.from(status2.checkedKeys).sort())
  expect(Array.from(status1.indeterminateKeys).sort())
    .toEqual(Array.from(status2.indeterminateKeys).sort())
}

export function expectTreeNodesEqual (
  nodes1: TreeNode[] | undefined,
  nodes2: TreeNode[] | undefined
) {
  if (nodes1 === undefined || nodes2 === undefined) {
    expect(nodes1).toEqual(nodes2)
    return
  }
  nodes1?.forEach((node, index) => {
    expectTreeNodeEqual(node, nodes2[index])
  })
}

export function expectTreeNodeEqual (node1: TreeNode, node2: TreeNode) {
  Object.keys(node1).forEach(key => {
    if (key === 'rawNode') {
      expect(node1.rawNode).toStrictEqual(node2.rawNode)
    } else if (key === 'parent') {
      if (node1.parent === null) expect(node2.parent).toEqual(null)
      expect(node1.parent?.key).toEqual(node2.parent?.key)
    } else if (key === 'children') {
      expectTreeNodesEqual(node1.children, node2.children)
    } else {
      expect((node1 as any)[key]).toStrictEqual((node2 as any)[key])
    }
  })
}