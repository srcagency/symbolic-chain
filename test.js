'use strict'

const test = require('tape')
const list = require('./')

test(t => {
	const a = new Char('a')
	const b = new Char('b')
	const c = new Char('c')
	const d = new Char('d')
	const e = new Char('e')
	const f = new Char('f')
	const g = new Char('g')
	const h = new Char('h')

	t.throws(() => list.create(), /Expected an array/)
	t.throws(() => list.create([]), /At least one item is required/)

	list.create([d, e])

	t.equal(list.before(d), null)
	t.equal(list.after(d), e)

	t.equal(list.before(e), d)
	t.equal(list.after(e), null)

	list.insertBefore(d, c)

	t.equal(list.before(c), null)
	t.equal(list.after(c), d)

	t.equal(list.before(d), c)
	t.equal(list.after(d), e)

	t.equal(list.before(e), d)
	t.equal(list.after(e), null)

	list.insertAfter(e, h)

	t.equal(list.before(c), null)
	t.equal(list.after(c), d)

	t.equal(list.before(d), c)
	t.equal(list.after(d), e)

	t.equal(list.before(e), d)
	t.equal(list.after(e), h)

	t.equal(list.before(h), e)
	t.equal(list.after(h), null)

	list.insertBefore(c, a)

	t.equal(list.before(c), a)
	t.equal(list.after(c), d)
	t.equal(list.before(a), null)
	t.equal(list.after(a), c)

	list.insertBefore(c, b)

	t.equal(list.before(c), b)
	t.equal(list.after(c), d)
	t.equal(list.before(b), a)
	t.equal(list.after(b), c)
	t.equal(list.before(a), null)
	t.equal(list.after(a), b)

	list.insertAfter(e, f)
	list.insertBefore(h, g)


	t.equal(list.before(b), a)
	t.equal(list.before(a), null)
	t.equal(list.after(e), f)

	t.deepEqual(list.toArray(b).map(c => c.c), 'abcdefgh'.split(''))

	t.end()
})

function Char(c){
	this.c = c
}
