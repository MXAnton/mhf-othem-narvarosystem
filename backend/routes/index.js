const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router
  .route("/member")
  .get(controllers.getAllMembers)
  .post(controllers.createMember);
router.route("/member/:personnummer").get(controllers.getMember);
router
  .route("/member/:id")
  .put(controllers.updateMember)
  .delete(controllers.deleteMember);

router.route("/narvaro").post(controllers.createNarvaro);
router.route("/narvaro/year/:year").get(controllers.getAllNarvaroYear);
router.route("/narvaro/date/:date").get(controllers.getAllNarvaroDate);
router
  .route("/narvaro/amount/date/:date")
  .get(controllers.getNarvaroAmountDate);
router
  .route("/narvaro/date/:date/:personnummer")
  .get(controllers.getNarvaroDate);

router
  .route("/admin")
  .get(controllers.getLoggedInAdmin)
  .post(controllers.createAdmin);
router.route("/admin/login").post(controllers.login);
router.route("/admin/logout").post(controllers.logout);

module.exports = router;
