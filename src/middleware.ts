import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "~/lib/auth";

export const middleware = (req: NextApiRequest, res: NextApiResponse) => {
  return auth(req, res);
};
