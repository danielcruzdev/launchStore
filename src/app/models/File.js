const db = require("../../config/db");

module.exports = {
  create(fileName, path, product_id) {
    const query = `
          INSERT INTO files (
            name,
            path,
            product_id
          ) VALUES ($1, $2, $3)
          RETURNING id
        `;


    const values = [
        fileName,
        path,
        product_id
    ];

    return db.query(query, values)
  },
}