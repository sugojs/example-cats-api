import { MongoDbQueryParams } from "@sugo/mongodb-queryparams";
import { Router } from "@sugo/router";
import { SuGoRequest, SuGoResponse } from "@sugo/server";
import { Cats } from "./db";

const router = new Router()
  .options("/(.)*", (req: SuGoRequest, res: SuGoResponse) => res.end())
  .get("/cats", async (req: SuGoRequest, res: SuGoResponse) => {
    const {
      filter,
      limit,
      select,
      skip,
      sort
    } = MongoDbQueryParams.parseQueryParams(req.query);
    res.json(await Cats.list(filter, select, limit, skip, sort));
  })
  .post("/cats", async (req: SuGoRequest, res: SuGoResponse) =>
    res.status(201).json(await Cats.create(req.body))
  )
  .patch("/cats", async (req: SuGoRequest, res: SuGoResponse) =>
    res.json(await Cats.patchById(req.params.id, req.body))
  )
  .delete("/cats", async (req: SuGoRequest, res: SuGoResponse) =>
    res.json(await Cats.deleteById(req.params.id))
  );

export default router;
