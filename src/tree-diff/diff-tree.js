const makeNode = (key, value, type) => ({ key, value, type });

const makeTree = (key, children) => ({ key, children, type: 'tree' });

const getValue = (node) => node.value;

const getKey = (node) => node.key;

const getType = (node) => node.type;

const getChildren = (tree) => tree.children;

export {
	makeNode,
	makeTree,
	getValue,
	getKey,
	getType,
	getChildren
};
