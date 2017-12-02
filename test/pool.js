const path = require('path')
const cluster = require('cluster')
const EventEmitter = require('events')
const { config, configName } = require('../libs/configs')

cluster.setupMaster({
  exec: path.join(__dirname, 'worker.js'),
  args: ['--config', configName],
  silent: !config.workerLog
})

class Pool extends EventEmitter {
  constructor (size) {
    super()
    this.size = size
    this.counter = {}
    this.pool = new Map()
    while (this.pool.size < size) {
      this.create()
    }
    this.idles = [...this.pool.keys()]
  }

  remove (id) {
    let worker = this.pool.get(id)
    if (worker && !worker.isDead()) worker.process.kill('SIGKILL')
    this.pool.delete(id)
  }

  create () {
    let worker = cluster.fork()
    this.pool.set(worker.id, worker)
    return worker
  }

  reset (id) {
    this.remove(id)
    return this.create()
  }

  clear () {
    for (let worker of this.pool.values()) {
      worker.disconnect()
    }
    this.pool.clear()
    this.idles = []
  }

  count (id) {
    this.counter[id] = this.counter[id] && this.counter[id] + 1 || 1
  }

  showCounter () {
    console.log(JSON.stringify(this.counter, null, 4))
  }

  get () {
    return new Promise(resolve => {
      let { idles, pool } = this
      let get = () => {
        let id = idles.shift()
        let worker = pool.get(id)
        this.count(id)
        resolve(worker)
      }
      if (idles.length) get()
      else this.once('push', get)
    })
  }

  idle ({ id }) {
    this.idles.push(id)
    this.emit('push')
  }
}

module.exports = Pool
