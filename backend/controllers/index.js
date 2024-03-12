const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllMembers = (req, res, next) => {
  conn.query("SELECT * FROM member", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

exports.getMember = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No member id found", 404));
  }
  conn.query(
    "SELECT * FROM member WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.createMember = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));

  conn.query(
    "INSERT INTO member (personnummer, first_name, last_name, end_date) VALUES(?, ?, ?, ?)",
    [
      req.body.personnummer,
      req.body.first_name,
      req.body.last_name,
      req.body.end_date,
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "member created!",
      });
    }
  );
};

exports.updateMember = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No member id found", 404));
  }

  conn.query(
    "UPDATE member SET personnummer=?, first_name=?, last_name=?, end_date=? WHERE id=?",
    [
      req.body.personnummer,
      req.body.first_name,
      req.body.last_name,
      req.body.end_date,
      req.params.id,
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "member updated!",
      });
    }
  );
};

exports.deleteMember = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No member id found", 404));
  }
  conn.query(
    "DELETE FROM member WHERE id=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "member deleted!",
      });
    }
  );
};

exports.getAllNarvaroYear = (req, res, next) => {
  if (!req.params.year) {
    return next(new AppError("No narvaro year found", 404));
  }
  conn.query(
    `SELECT * FROM narvaro_${req.params.year}`,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.getAllNarvaroDate = (req, res, next) => {
  if (!req.params.date) {
    return next(new AppError("No date found", 404));
  }
  if (req.params.date.length < 10) {
    return next(new AppError("Date not complete", 500));
  }

  const year = req.params.date.substring(0, 4);

  conn.query(
    `SELECT * FROM narvaro_${year} WHERE date=?`,
    [req.params.date],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

/*
exports.getNarvaroDate = (req, res, next) => {
  if (!req.params.personnummer) {
    return next(new AppError("No personnummer found", 404));
  }
  if (!req.params.date) {
    return next(new AppError("No date found", 404));
  }
  if (req.params.date.length < 10) {
    return next(new AppError("Date not complete", 500));
  }

  const year = req.params.date.substring(0, 4);

  conn.query(
    `SELECT * FROM narvaro_${year} WHERE date=? AND personnummer=?`,
    [req.params.date, req.params.personnummer],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};
*/

exports.createNarvaroYear = (req, res, next) => {
  if (!req.params.year) {
    return next(new AppError("No narvaro year found", 404));
  }
  if (!req.body) return next(new AppError("No form data found", 404));

  conn.query(
    `INSERT INTO narvaro_${req.params.year} (personnummer, first_name, last_name, type, has_license) VALUES(?, ?, ?, ?, ?)`,
    [
      req.body.personnummer,
      req.body.first_name,
      req.body.last_name,
      req.body.type,
      req.body.has_license || 0,
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "narvaro created/added!",
      });
    }
  );
};
