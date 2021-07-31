const makeNode = (type, key, oldValue, newValue = null, children = null) => ({
  type, key, oldValue, newValue, children,
});

const getKey = (node) => node.key;

const getType = (node) => node.type;

const getChildren = (tree) => tree.children;

export {
  makeNode,
  getKey,
  getType,
  getChildren,
};
