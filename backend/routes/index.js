const express = require("express");
const controllers = require("../controllers");
const middleware = require("../middleware");
const router = express.Router();

router
  .route("/member")
  .get(middleware.authorize, controllers.getAllMembers)
  .post(middleware.authorize, controllers.createMember);
router.route("/member/:personnummer").get(controllers.getMember);
router
  .route("/member/:id")
  .put(middleware.authorize, controllers.updateMember)
  .delete(middleware.authorize, controllers.deleteMember);

router.route("/narvaro").post(controllers.createNarvaro);
router
  .route("/narvaro/year/:year")
  .get(middleware.authorize, controllers.getAllNarvaroYear);
router
  .route("/narvaro/date/:date")
  .get(middleware.authorize, controllers.getAllNarvaroDate);
router
  .route("/narvaro/amount/date/:date")
  .get(controllers.getNarvaroAmountDate);
router
  .route("/narvaro/date/:date/:personnummer")
  .get(controllers.getNarvaroDate);

router
  .route("/admin")
  .get(controllers.getLoggedInAdmin)
  .post(middleware.authorize, controllers.createAdmin);
router.route("/admin/login").post(controllers.login);
router.route("/admin/logout").post(controllers.logout);

module.exports = router;
