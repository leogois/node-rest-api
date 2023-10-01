const logRequest = (log = console.log) => (req, res, netx) => {
  log({
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  })
  netx()
}

module.exports = logRequest
