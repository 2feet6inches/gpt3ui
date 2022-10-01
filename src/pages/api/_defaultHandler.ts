import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

export default function defaultHandler(requiredLogin = true) {
  return nextConnect<NextApiRequest, NextApiResponse>({
    attachParams: true,
    onError: (err, req, res) => {
      console.error(err);
      res.status(500).json({error: err.meesasge ?? err});
    },
    onNoMatch: (req, res) => {
      res.status(404).end('Page is not found');
    },
  });
}
