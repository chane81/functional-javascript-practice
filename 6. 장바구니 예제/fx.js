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
				curry(f)(..._, ...nextArgs);

// map
const map = curry((f, iter) => {
	let res = [];
	for (const p of iter) {
		res.push(f(p));
	}

	return res;
});

// filter
const filter = curry((f, iter) => {
	let res = [];
	for (const a of iter) {
		if (f(a)) res.push(a);
	}

	return res;
});

// reduce
const reduce = curry((f, iter) => {
	iter = iter[Symbol.iterator]();

	const acc = iter.next().value;

	return reduceOrg(f, acc, iter);
});

// reduce original
const reduceOrg = curry((f, acc, iter) => {
	for (const a of iter) {
		acc = f(acc, a);
	}

	return acc;
});

// go
const go = (...args) =>
	reduce((a, f) => f(a), args);

// pipe
const pipe = (f, ...fs) => (...a) =>
	go(f(...a), ...fs);
