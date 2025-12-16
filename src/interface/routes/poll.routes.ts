import { Router } from 'express';
import { ensureAuthenticated } from '@/interface/middlewares/ensure-authenticated';
import { makeCreatePollController } from '@/main/factories/make-create-poll';
import { makeVoteOnPollController } from '@/main/factories/make-vote-on-poll';
import { makeGeneratePollQRCodeController } from '@/main/factories/make-generate-poll-qrcode';
import { makeClosePollController, makeExtendPollController } from '@/main/factories/make-manage-poll';
import { makeGetPollResultsController } from '@/main/factories/make-get-poll-results';
import { makeListPollsController } from '@/main/factories/make-list-polls';
import { makeGetUserHistoryController } from '@/main/factories/make-get-user-history';
import { makeGetPollDetailsController } from '@/main/factories/make-get-poll-details';

const pollRoutes = Router();


pollRoutes.post('/', ensureAuthenticated, (req, res) => {
  const controller = makeCreatePollController();
  return controller.handle(req, res);
});

pollRoutes.post('/:pollId/votes', ensureAuthenticated, (req, res) => {
  const controller = makeVoteOnPollController();
  return controller.handle(req, res);
});

pollRoutes.get('/:pollId/qrcode', (req, res) => {
  const controller = makeGeneratePollQRCodeController();
  return controller.handle(req, res);
});

pollRoutes.post('/:pollId/close', ensureAuthenticated, (req, res) => {
  const controller = makeClosePollController();
  return controller.handle(req, res);
});

pollRoutes.patch('/:pollId/extend', ensureAuthenticated, (req, res) => {
  const controller = makeExtendPollController();
  return controller.handle(req, res);
});

pollRoutes.get('/:pollId/results', ensureAuthenticated, (req, res) => {
  const controller = makeGetPollResultsController();
  return controller.handle(req, res);
});

pollRoutes.get('/', (req, res) => {
  const controller = makeListPollsController();
  return controller.handle(req, res);
});

pollRoutes.get('/me/created', ensureAuthenticated, (req, res) => {
  const controller = makeGetUserHistoryController();
  return controller.handleCreated(req, res);
});


pollRoutes.get('/me/voted', ensureAuthenticated, (req, res) => {
  const controller = makeGetUserHistoryController();
  return controller.handleVoted(req, res);
});

pollRoutes.get('/:pollId', ensureAuthenticated, (req, res) => {
  const controller = makeGetPollDetailsController();
  return controller.handle(req, res);
});

export { pollRoutes };