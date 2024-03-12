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

module.exports = router;
