const path = require('path')
const cluster = require('cluster')
const { config, configName } = require('../libs/configs')
const Queue = require('../libs/queue')

cluster.setupMaster({
  exec: path.join(__dirname, './worker.js'),
  args: ['--config', configName],
  silent: !config.workerLog
})

class Pool extends Queue {
  constructor (size) {
    super(size)
    this.counter = {}
    /**
     * processing workers pool
     * @type {Map<cluster.worker>}
     */
    this.pool = new Map()
    while (this.pool.size < size) {
      this.create()
    }
    for (let id of this.pool.keys()) {
      this.put(id)
    }
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
    while (this.size()) {
      this._get()
    }
  }

  count (id) {
    this.counter[id] = this.counter[id] && this.counter[id] + 1 || 1
  }

  showCounter () {
    console.log(JSON.stringify(this.counter, null, 4))
  }

  /**
   * get a worker instance blocked
   * @return {Worker} worker
   */
  async get () {
    let id = await super.get()
    return this.pool.get(id)
  }

  idle ({ id }) {
    this.put(id)
  }
}

module.exports = Pool
