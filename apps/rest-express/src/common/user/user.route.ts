import {Router} from 'express';

const express = require('express');

const router = express.Router();
const {
  authenticate,
  authorize,
} = require('../authentication/auth.middleware');

/**
 * @param {import('./users.service')} service
 */
function usersRouter(service: User) {
  router.use(authenticate);
  /* GET users listing. */
  router.get('/', [
    authorize('admin'),
    async (req, res, _next) => {
      const users = await service.findAll({});
      const data = users.map(user => {
        const { password: _, ...rest } = user;
        return rest;
      });
      res.json({ data });
    },
  ]);

  /* POST a user */
  router.post('/', async (req, res, _next) => {
    return service
      .create(req.body)
      .then(r => {
        res.status(201).send({ id: r[0] });
      })
      .catch(e => {
        res.status(400).send(e.message);
      });
  });

  /* Get By Id */
  router.get('/:id', async (req, res, _next) => {
    const user = await service.findById(+req.params.id);
    if (user) {
      const { password: _, ...data } = user;
      res.json({ data });
    } else {
      res.status(404).send();
    }
  });

  // user roles

  /* POST add a role */
  router.post('/:id/roles', async (req, res, _next) => {
    return service
      .addUserRole(+req.params.id, req.body.role_id)
      .then(r => {
        res.status(200).send({ id: r[0] });
      })
      .catch(e => {
        res.status(400).send(e.message);
      });
  });

  /* GET User roles */
  router.get('/:id/roles', async (req, res, _next) => {
    const data = await service.findUserRoles(+req.params.id);
    if (data) res.json({ data });
    else {
      res.status(404).send();
    }
  });

  /* DELETE User role */
  router.delete('/:id/roles/:roleId', async (req, res, _next) => {
    const data = await service.removeUserRole(
      +req.params.id,
      +req.params.roleId,
    );
    if (data) res.json({ data });
    else {
      res.status(404).send();
    }
  });

  router.get('/:userId/*', (req, res, _next) => {
    res.send(`this is too much id${JSON.stringify(req.params)}`);
  });
  return router;
}
module.exports = usersRouter;
