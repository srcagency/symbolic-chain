'use strict'

const symbol = Symbol('Symbolic chain node')

module.exports = {
	symbol: symbol,
	create: create,
	insertBefore: insertBefore,
	insertAfter: insertAfter,
	before: before,
	after: after,
	toArray: toArray,
}

function create(items){
	if (!items) throw new Error('Expected an array')

	const first = items[0]

	if (!first) throw new Error('At least one item is required')

	first[symbol] = {prev: null, next: null}

	for (let i = 1;i < items.length;i++) insertAfter(first, items[i])
}

function insertBefore(next, item){
	const nextNode = next[symbol]
	const prev = nextNode.prev
	item[symbol] = {prev: prev, next: next}
	nextNode.prev = item
	if (prev !== null) prev[symbol].next = item
}

function insertAfter(prev, item){
	const prevNode = prev[symbol]
	const next = prevNode.next
	item[symbol] = {prev: prev, next: next}
	prevNode.next = item
	if (next !== null) next[symbol].prev = item
}

function before(item){ return item[symbol].prev }
function after(item){ return item[symbol].next }

function toArray(begin){
	const arr = [begin]

	let next = begin
	while (next = after(next)) arr.push(next)

	next = begin
	while (next = before(next)) arr.unshift(next)

	return arr
}
