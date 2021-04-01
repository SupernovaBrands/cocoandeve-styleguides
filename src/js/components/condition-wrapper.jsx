const ConditionWrapper = ({
	condition, wrapper, wrapperFalse, children,
}) => {
	if (condition) {
		return wrapper(children);
	}
	if (typeof wrapperFalse === 'function') {
		return wrapperFalse(children);
	}
	return children;
};

export default ConditionWrapper;
