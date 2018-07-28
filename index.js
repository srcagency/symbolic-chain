'use strict'

const next = Symbol('Next node')
const prev = Symbol('Previous node')

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

	first[prev] = null
	first[next] = null

	for (let i = 1;i < items.length;i++) insertAfter(first, items[i])
}

function insertBefore(base, item){
	const tail = base[prev]

	if (tail !== null) tail[next] = item
	base[prev] = item

	item[prev] = tail
	item[next] = base
}

function insertAfter(base, item){
	const head = base[next]

	if (head !== null) head[prev] = item
	base[next] = item

	item[prev] = base
	item[next] = head
}

function before(item){ return item[prev] }
function after(item){ return item[next] }

function toArray(begin){
	const arr = [begin]

	let next = begin
	while (next = after(next)) arr.push(next)

	next = begin
	while (next = before(next)) arr.unshift(next)

	return arr
}
