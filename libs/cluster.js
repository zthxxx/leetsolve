const cluster = require('cluster')

let run = function (fn, timeout = 2000) {
  if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`)
    let worker = cluster.fork()
    let waiting = setTimeout(() => {
      console.log(`工作进程 ${worker.process.pid} 已超时`)
      worker.process.kill('SIGKILL')
    }, timeout)
    cluster.on('exit', (worker, code, signal) => {
      clearTimeout(waiting)
      if (!worker.exitedAfterDisconnect) {
        console.log(`工作进程 ${worker.process.pid} 失去同步`)
      }
    })
    worker.on('message', msg => console.log(msg.answer))
  } else {
    console.log(`工作进程 ${process.pid} ${fn.name} 已启动`)
    let result = fn()
    cluster.worker.send(result)
    cluster.worker.disconnect()
    cluster.worker.kill()
  }
}

module.exports = run
