class Queue {
  constructor (maxsize = Infinity) {
    this.maxsize = maxsize
    this.queue = []
    this._emptys = []
    this._fulls = []
  }

  size () {
    return this.queue.length
  }

  _fullWait () {
    return new Promise(resolve => this._fulls.push(resolve))
  }

  _emptyWait () {
    return new Promise(resolve => this._emptys.push(resolve))
  }

  _putNotify () {
    let emptyWait = this._emptys.shift()
    if (emptyWait) emptyWait()
  }

  _getNotify () {
    let fullWait = this._fulls.shift()
    if (fullWait) fullWait()
  }

  async put (item, block = true) {
    let full = this.size() >= this.maxsize
    if (!block && full) throw new Error('queue is full')
    if (full) {
      await this._fullWait()
    }
    this._put(item)
    this._putNotify()
  }

  async get (block = true) {
    let empty = this.size() <= 0
    if (!block && empty) throw new Error('queue is empty')
    if (empty) {
      await this._emptyWait()
    }
    let item = this._get()
    this._getNotify()
    return item
  }

  _put (item) {
    this.queue.push(item)
  }

  _get () {
    return this.queue.shift()
  }
}

module.exports = Queue
