const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router
  .route("/member")
  .get(controllers.getAllMembers)
  .post(controllers.createMember);
router
  .route("/member/:id")
  .get(controllers.getMember)
  .put(controllers.updateMember)
  .delete(controllers.deleteMember);

router
  .route("/narvaro/year/:year")
  .get(controllers.getAllNarvaroYear)
  .post(controllers.createNarvaroYear);
router.route("/narvaro/date/:date").get(controllers.getAllNarvaroDate);

module.exports = router;
