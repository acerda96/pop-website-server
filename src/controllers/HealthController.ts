import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
  res.status(200).send("Success :) :)");
});

export default router;
