import Dexie from 'relay-dexie'

const obj = {'bt:': 'msg:', 'hyper:': 'topic:', 'ipfs:': 'pubsub:'}
const proto = import.meta.env.VITE_PROTO ? import.meta.env.VITE_PROTO : Object.keys(obj).includes(window.location.protocol) ? obj[window.location.protocol] : null
const id = import.meta.env.VITE_ID ? import.meta.env.VITE_ID : window.location.hostname
const dexie = new Dexie({debug: false, ben: 'str', version: 1, proto, id, name: 'test', schema: {posts: 'iden, stamp, edit, user, text, *list, *for, *tags'}, sync: true})
setTimeout(() => {dexie.initUser().then(console.log).catch(console.error)}, 10000)
export {dexie}