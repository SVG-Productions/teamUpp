const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

const cache = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.error("Cannot cache non-GET methods.");
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = nodeCache.get(key);

  if (cachedResponse) {
    res.status(200).send(cachedResponse);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      nodeCache.set(key, body, duration);
    };
    next();
  }
};

const deleteCache = (route) => (req, res, next) => {
  const key = route ? route : req.originalUrl;
  nodeCache.del(key);
  next();
};

module.exports = { cache, deleteCache };
