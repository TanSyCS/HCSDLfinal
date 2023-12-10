const pool = require("../database");
const util = require("util");
const query = util.promisify(pool.query).bind(pool);
module.exports = (app) => {
  //get all actor
  app.get("/actor", async (req, res, next) => {
    try {
      const query1 = `SELECT * FROM actor`;
      const results = await query(query1);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.DOB);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, DOB: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  //get all director
  app.get("/director", async (req, res, next) => {
    try {
      const query1 = `SELECT * FROM director`;
      const results = await query(query1);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.DOB);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, DOB: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  //login
  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const results = await query("SELECT * FROM smanager WHERE EMAIL = ?", [
        email,
      ]);
      if (results.length > 0 && results[0].PASSWORD == password) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      next(error);
    }
  });
  //create new film
  app.post("/film/create", async (req, res, next) => {
    try {
      const { genre, release_day, movie_name, duration, restriction } =
        req.body;
      const query1 = `INSERT INTO movie (genre, release_day, movie_name, duration, restriction) 
                     VALUES (?, ?, ?, ?, ?)`;
      const values = [genre, release_day, movie_name, duration, restriction];
      const results = await query(query1, values);
      res.status(200).json({ message: "Film created successfully", results });
    } catch (error) {
      next(error);
    }
  });
  // update film
  app.post("/film/update", async (req, res, next) => {
    try {
      const {
        movie_ID,
        genre,
        release_day,
        movie_name,
        duration,
        restriction,
        old_movie_ID,
      } = req.body;
      const query1 = `
        UPDATE movie
        SET movie_ID = ?, genre = ?, release_day = ?, movie_name = ?, duration = ?, restriction = ?
        WHERE movie_ID = ?
      `;
      const values = [
        movie_ID,
        genre,
        release_day,
        movie_name,
        duration,
        restriction,
        old_movie_ID,
      ];
      const results = await query(query1, values);
      res.status(200).json({ message: "Film updated successfully", results });
    } catch (error) {
      next(error);
    }
  });
  // create production company
  app.post("/film/create/company", async (req, res, next) => {
    try {
      const { Cname, country, address, movie_name } = req.body;
      const query1 = `INSERT INTO productioncompany (Cname, country, address) 
                      VALUES (?, ?, ?)`;
      const query2 = `UPDATE movie
                      SET Company_name = ?
                      WHERE movie_name = ?`;
      const values1 = [Cname, country, address];
      const values2 = [Cname, movie_name];

      await query(query1, values1);
      const results = await query(query2, values2);
      res
        .status(200)
        .json({ message: "Film company created successfully", results });
    } catch (error) {
      next(error);
    }
  });
  // update production company
  app.post("/film/update/company", async (req, res, next) => {
    try {
      const { Cname, country, address, old_Cname, movie_name } = req.body;
      const query1 = `
        UPDATE productioncompany
        SET Cname = ?, country = ?, address = ?
        WHERE Cname = ?
      `;
      const query2 = `UPDATE movie
                      SET Company_name = ?
                      WHERE movie_name = ?`;
      const values1 = [Cname, country, address, old_Cname];
      const values2 = [Cname, movie_name];

      await query(query1, values1);
      const results = await query(query2, values2);
      res.status(200).json({ message: "Film company updated successfully" });
    } catch (error) {
      next(error);
    }
  });
  //create director
  app.post("/film/create/director", async (req, res, next) => {
    try {
      const { D_name, dob, nationality, movie_name } = req.body;
      const query1 = `INSERT INTO director (D_Name, dob, nationality)
      values(?,?,?)`;
      const query2 = `INSERT INTO direct (Direct_name, movie_ID)
      VALUES (?, (SELECT movie_ID FROM movie WHERE movie_name = ?))`;
      values1 = [D_name, dob, nationality];
      values2 = [D_name, movie_name];
      await query(query1, values);
      const results = await query(query2, values2);
      res.status(200).json({ message: "director create successfully" });
    } catch (error) {
      next(error);
    }
  });
  //update director
  // app.post("/film/update/director", async (req, res, next) => {
  //   try {
  //     const query1 = `
  //   UPDATE director
  //   SET D_name = ?, dob = ?, nationality = ?
  //   WHERE D_name = ?
  //   `;
  //     const { D_name, dob, nationality, old_D_name } = req.body;
  //     const value = [D_name, dob, nationality, old_D_name];
  //     const result = await query(query1, value);
  //     res.status(200).json({ message: "success" });
  //   } catch (error) {
  //     next(error);
  //   }
  // });
  app.post("/film/update/director", async (req, res, next) => {
    try {
      const { D_name, dob, nationality, old_D_name } = req.body;
      const checkDirectorQuery = `SELECT * FROM director WHERE D_NAME = ?`;
      const directorCheckResult = await query(checkDirectorQuery, D_name);

      if (directorCheckResult.length === 0) {
        const insertDirectorQuery = `INSERT INTO director (D_NAME, dob, nationality) VALUES (?, ?, ?)`;
        await query(insertDirectorQuery, [D_name, dob, nationality]);
      }

      const updateDirectQuery = `UPDATE direct SET DIRECT_NAME = ? WHERE DIRECT_NAME = ?`;
      await query(updateDirectQuery, [D_name, old_D_name]);
      const query1 = `DELETE FROM director
      WHERE D_name = ?`;
      const query2 = `DELETE FROM direct
      WHERE Direct_name = ?
      `;
      const values = [D_name, movie_ID, D_name];
      await query(query2, values);
      await query(query1, values);
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  });

  //create actor
  app.post("/film/create/actor", async (req, res, next) => {
    try {
      const { name, dob, nationality, movie_name } = req.body;
      const query1 = `INSERT  INTO actor ( nationality,dob,name)
      values(?,?,?)`;
      const query2 = `INSERT  INTO perform (Actor_ID, movie_ID)
    values((SELECT Actor_ID FROM actor WHERE name = ?), 
            (SELECT movie_ID FROM movie WHERE movie_name = ?))`;
      values1 = [nationality, dob, name];
      values2 = [name, movie_name];
      await query(query1, values);
      const results = await query(query2, values2);
      res.status(200).json({ message: "actor create successfully" });
    } catch (error) {
      next(error);
    }
  });
  //update actor
  app.post("/film/update/actor", async (req, res, next) => {
    try {
      const query1 = `
      UPDATE actor
      SET nationality = ?, dob = ?, name = ?
      WHERE Actor_ID = ?
    `;

      const { name, dob, nationality, Actor_ID } = req.body;
      console.log(req.body);
      const value = [nationality, dob, name, Actor_ID];
      console.log("aTesst", value);
      const result = await query(query1, value);
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  });

  app.get("/film", async (req, res, next) => {
    try {
      const query1 = `SELECT movie_ID, genre, release_day, movie_name,
      duration, restriction, Company_name FROM movie`;
      const results = await query(query1);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.release_day);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, release_day: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  app.post("/actor-director", async (req, res, next) => {
    try {
      const actorQuery = `
        SELECT name
        FROM actor
        NATURAL JOIN perform
        WHERE movie_ID = ?`;

      const directorQuery = `
        SELECT D_NAME AS name
        FROM director
        WHERE movie_ID = ?`;

      const { movie_ID } = req.body;
      const actorResults = await query(actorQuery, [movie_ID]);
      const directorResults = await query(directorQuery, [movie_ID]);

      res
        .status(200)
        .json({ actors: actorResults, directors: directorResults });
    } catch (error) {
      console.error("Error in /actor-director:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/actor", async (req, res, next) => {
    try {
      const query1 = `select name
    from actor NATURAL JOIN perform
    WHERE movie_ID = ? `;
      const { movie_ID } = req.body;
      value1 = [movie_ID];
      const results = await query(query1, value1);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  });
  app.post("/director", async (req, res, next) => {
    try {
      const query1 = `SELECT director.D_Name
    FROM director
    JOIN direct ON director.D_Name = direct.Direct_name
    WHERE direct.movie_ID = ?`;
      const { movie_ID } = req.body;
      value1 = [movie_ID];
      const results = await query(query1, value1);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  });
  //get film with input
  app.get("/film/input", async (req, res, next) => {
    try {
      const { input } = req.body;
      const query1 = `SELECT * FROM movie
      WHERE genre LIKE ?  OR movie_name LIKE ? OR Company_name LIKE ?`;
      const values = [`%${input}%`, `%${input}%`, `%${input}%`];
      const results = await query(query1, values);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.release_day);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, release_day: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  app.get("/film/duration", async (req, res, next) => {
    try {
      const { min, max } = req.body;
      const query1 = `
      SELECT * FROM movie
      WHERE duration BETWEEN ? AND ?
    `;
      const values = [parseInt(min), parseInt(max)];
      const results = await query(query1, values);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.release_day);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, release_day: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  //delete film
  app.delete("/film/delete", async (req, res, next) => {
    try {
      const { movie_ID } = req.body;
      const query1 = `DELETE director
      FROM director
      JOIN Direct ON director.D_Name = Direct.Direct_name
      WHERE Direct.movie_ID = ?`;
      const query0 = `DELETE FROM direct
      WHERE movie_ID = ?
      `;
      const query3 = `DELETE actor
      FROM actor
      JOIN perform ON actor.Actor_ID = perform.Actor_ID
      WHERE perform.movie_ID = ?`;
      const query2 = `DELETE FROM perform
      WHERE movie_ID = ?
      `; //
      const query4 = `
      DELETE FROM movie
      WHERE movie_ID = ?
      `;
      values1 = [nationality, dob, name];
      await query(query0, values);
      await query(query1, values);
      await query(query2, values);
      await query(query3, values);
      const results = await query(query4, values);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  });
  //sort film with sepcified field (name or duration) and order ( descending or anscending)
  app.get("/film/order", async (req, res, next) => {
    try {
      let query1 = `
      SELECT * FROM movie
      ORDER BY
    `;
      if (data.field === "name") {
        query1 += `movie_name ${data.sort_order}`;
      } else if (data.field === "duration") {
        query1 += `duration ${data.sort_order}`;
      } else {
        // Handle invalid sortBy value
        next(new Error("Invalid value"));
        return;
      }
      const results = await query(query1, values);
      const formattedResults = results.map((row) => {
        const releaseDay = new Date(row.release_day);
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };
        const formattedReleaseDay = formatDate(releaseDay);
        return { ...row, release_day: formattedReleaseDay };
      });
      res.status(200).json(formattedResults);
    } catch (error) {
      next(error);
    }
  });
  app.get("/revenue", async (req, res, next) => {
    try {
      const query1 = `
        SELECT
            MONTHS.month,
            COALESCE(SUM(BILL.TOTAL_PRICE), 0) AS total_price,
            COALESCE(SUM(BILL.FINAL_PRICE), 0) AS final_price
        FROM
            (
              SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
              UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
              UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
            ) AS MONTHS
        LEFT JOIN
            BILL ON MONTHS.month = MONTH(BILL.printing_day)
              AND YEAR(BILL.printing_day) = YEAR(CURRENT_DATE())
        GROUP BY
            MONTHS.month
        ORDER BY
            MONTHS.month
      `;
      const results = await query(query1);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  });
  app.delete("/actor/delete", async (req, res, next) => {
    try {
      const { ACTOR_ID } = req.body;
      const query1 = `DELETE FROM actor
        WHERE ACTOR_ID = ?`;
      const query2 = `DELETE FROM perform
        WHERE ACTOR_ID = ?
      `;
      const values = [ACTOR_ID, ACTOR_ID];
      await query(query2, values);
      await query(query1, values);
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  });
  // app.delete("/actor/delete", async (req, res, next) => {
  //   try {
  //     const { ACTOR_ID, movie_ID } = req.body;
  //     const query1 = `DELETE FROM actor
  //       WHERE ACTOR_ID = ?`;
  //     const query2 = `DELETE FROM perform
  //       WHERE movie_ID = ? AND ACTOR_ID = ?
  //     `;
  //     const values = [ACTOR_ID, movie_ID, ACTOR_ID];
  //     await query(query1, values);
  //     await query(query2, values);
  //     res.status(200).json({ message: "success" });
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  app.delete("/director/delete", async (req, res, next) => {
    try {
      const { D_name, movie_ID } = req.body;
      const query1 = `DELETE FROM director
      WHERE D_name = ?`;
      const query2 = `DELETE FROM direct
      WHERE Direct_name = ?
      `;
      const values = [D_name, movie_ID, D_name];
      await query(query2, values);
      await query(query1, values);
      res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  });
};
