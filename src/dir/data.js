import Dexie from 'relay-dexie'

const obj = {'bt:': 'msg:', 'hyper:': 'topic:', 'ipfs:': 'pubsub:'}
// const proto = Object.keys(obj).includes(window.location.protocol) ? obj[window.location.protocol] : null
// const id = window.location.hostname
const dexie = new Dexie({debug: true, version: 1, proto: 'msg:', id: '7e6520e2fe505702ec644226ccb0a8bc467c5a2c', name: 'test', schema: {posts: 'iden, stamp, edit, user, text, *list, *for, *tags'}, sync: true})
setTimeout(() => {dexie.initUser().then(console.log).catch(console.error)}, 10000)
export {dexie}