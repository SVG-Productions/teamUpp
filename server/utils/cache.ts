import { NextFunction, Request, Response } from "express";

const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

declare global {
  namespace Express {
    interface Response {
      originalSend: any;
    }
  }
}

const cache =
  (duration: number) => (req: Request, res: Response, next: NextFunction) => {
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
      res.send = (body: any) => {
        res.originalSend(body);
        return nodeCache.set(key, body, duration);
      };
      next();
    }
  };

const deleteCache =
  (route: string) => (req: Request, res: Response, next: NextFunction) => {
    const key = route ? route : req.originalUrl;
    nodeCache.del(key);
    next();
  };

module.exports = { cache, deleteCache };
