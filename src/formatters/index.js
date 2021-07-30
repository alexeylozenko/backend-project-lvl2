import plainFormate from "./plain/plain.js";
import stylishFormate from "./stylish/stylish.js";

const formate = (data, formater) => {
	if (formater === 'plain') {
		return plainFormate(data);
	}
	return stylishFormate(data);
};

export default formate;