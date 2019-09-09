const log = console.log;

const line = arg =>
	console.log(
		arg + '==========================='
	);

// curry
const curry = f => (..._) =>
	f.length === _.length
		? f(..._)
		: (...nextArgs) =>
				currySecond(f)(..._, ...nextArgs);

// map
const map = (f, iter) => {
	let res = [];
	for (const p of iter) {
		res.push(f(p));
	}

	return res;
};

// filter
const filter = (f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}

	return res;
};

// reduce
const reduce = (f, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const a of iter) {
		acc = f(acc, a);
	}

	return acc;
};
