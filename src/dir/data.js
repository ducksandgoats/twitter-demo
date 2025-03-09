import Dexie from 'relay-dexie'

const obj = {'bt:': 'msg:', 'hyper:': 'topic:', 'ipfs:': 'pubsub:'}
const proto = Object.keys(obj).includes(window.location.protocol) ? obj[window.location.protocol] : null
// const proto = 'msg:'
const id = window.location.hostname
// const id = 'testing'
const dexie = new Dexie({debug: false, ben: 'str', version: 1, proto, id, name: 'test', schema: {posts: 'iden, stamp, edit, user, text, *list, *for, *tags'}, sync: true})
setTimeout(() => {dexie.initUser().then(console.log).catch(console.error)}, 10000)
export {dexie}