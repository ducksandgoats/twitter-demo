import Dexie from 'relay-dexie'

const dexie = new Dexie({debug: true, version: 1, proto: 'msg:', id: '7e6520e2fe505702ec644226ccb0a8bc467c5a2c', name: 'test', schema: {posts: 'iden, stamp, edit, user, text, *list, *for, *tags'}, sync: true})
setInterval(() => {dexie.initUser().then(console.log).catch(console.error)}, 10000)
export {dexie}