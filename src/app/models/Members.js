const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`SELECT * 
    FROM members
    ORDER BY name ASC`, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {

    const query = `
      INSERT INTO members (
        name,
        avatar_url,
        gender,
        email,
        birth,
        meta,
        weight,
        height,
        member_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.gender,
      data.email,
      date(data.birth).iso,
      data.meta,
      data.weight,
      data.height,
      data.member
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`
      
      callback(results.rows[0])
    })


  },
  find(id, callback) {
    db.query(`
    SELECT members.*, members.name as member_name
    FROM members 
    LEFT JOIN members ON (members.member_id = members.id)
    WHERE members.id = $1`, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`
      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE members SET 
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      email=($5),
      meta=($6),
      weight=($7),
      height=($8),
      member_id=($9)
    WHERE id = $10
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.gender,
      data.email,
      data.meta,
      data.weight,
      data.height,
      data.member,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`
      DELETE FROM members
      WHERE id = $1`, [id], (err) => {
        if(err) throw `Database Error! ${err}`
        
        return callback()
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = '',
      filterQuery = '',
      totalQuery = `(
        SELECT count(*) FROM members
      ) AS total`
    
    if(filter){

      filterQuery = `
      WHERE members.name ILIKE '%${filter}%'
      OR members.email ILIKE '%${filter}%'     
      `

      totalQuery = `(
        SELECT count(*) FROM members
        ${filterQuery}
        ) AS total`
    }

    query = `
    SELECT members.*, ${totalQuery}
    FROM members
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if(err) throw `Database Error! ${err}` 

      callback(results.rows)
    })
  }
}