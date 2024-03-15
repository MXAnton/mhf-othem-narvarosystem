const AppError = require("../utils/appError");
const conn = require("../services/db");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  if (!req.params.personnummer) {
    return next(new AppError("No member personnummer found", 404));
  }
  conn.query(
    "SELECT * FROM member WHERE personnummer = ?",
    [req.params.personnummer],
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
      res.status(204).json({
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

exports.getNarvaroAmountDate = (req, res, next) => {
  if (!req.params.date) {
    return next(new AppError("No date found", 404));
  }
  if (req.params.date.length < 10) {
    return next(new AppError("Date not complete", 500));
  }

  const year = req.params.date.substring(0, 4);

  conn.query(
    `SELECT id FROM narvaro_${year} WHERE date=?`,
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

exports.createNarvaro = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));

  const currentYear = new Date().getFullYear();

  // Check if the table exists, and if not, create it
  conn.query(
    `CREATE TABLE IF NOT EXISTS narvaro_${currentYear} (
        id INT(10) NOT NULL AUTO_INCREMENT,
        date DATE NULL DEFAULT (curdate()),
        personnummer VARCHAR(12) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        first_name VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        last_name VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        type VARCHAR(10) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
        has_license TINYINT(1) NOT NULL DEFAULT '0',
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX unique_person_date (personnummer, date) USING BTREE
      )
      COLLATE='utf8mb4_0900_ai_ci'
      ENGINE=InnoDB
      ;`,

    function (err, result) {
      if (err) return next(new AppError(err, 500));

      // Once the table is created or confirmed to exist, insert the row
      conn.query(
        `INSERT INTO narvaro_${currentYear} (personnummer, first_name, last_name, type, has_license) VALUES(?, ?, ?, ?, ?)`,
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
    }
  );
};

exports.createAdmin = async (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  if (!req.body.username)
    return next(new AppError("No form username found", 404));
  if (!req.body.password)
    return next(new AppError("No form password found", 404));

  // hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  conn.query(
    "INSERT INTO admin (username, password) VALUES(?, ?)",
    [req.body.username, hashedPassword],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));

      res.status(201).json({
        status: "success",
        message: "admin created!",
      });
    }
  );
};

exports.login = (req, res, next) => {
  if (!req.body.username) {
    return next(new AppError("No admin username found", 404));
  }
  if (!req.body.password) {
    return next(new AppError("No admin password found", 404));
  }

  conn.query(
    "SELECT * FROM admin WHERE BINARY username = ?",
    [req.body.username],
    async function (err, data, fields) {
      if (err) return next(new AppError(err, 500));

      const user = data[0];
      if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new AppError("Fel användarnamn eller lösenord", 401));

      // Store JWT token to stay logged in
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
        secure: true, // Only set this if you are using HTTPS
        sameSite: "none",
      });

      res.status(200).json({
        status: "success",
        length: data?.length,
        data: user.id,
      });
    }
  );
};

exports.getLoggedInAdmin = (req, res, next) => {
  if (!req.cookies || !req.cookies["token"]) {
    return next(new AppError("No admin token found", 404));
  }
  const cookie = req.cookies["token"];

  // Verify JWT token to stay logged in
  const claims = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
  if (!claims) {
    return next(new AppError("Token unauthenticated", 401));
  }

  res.status(200).json({
    status: "success",
    data: claims.id,
  });
};

exports.logout = (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    status: "success",
  });
};
