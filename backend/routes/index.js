const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router
  .route("/member")
  .get(controllers.getAllMembers)
  .post(controllers.createMember);
router
  .route("/member/:personnummer")
  .get(controllers.getMember)
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

router.route("/admin").post(controllers.createAdmin);
router.route("/admin/:username/:password").get(controllers.login);

module.exports = router;
