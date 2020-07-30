const db = require("../../config/db")
const { hash } = require("bcryptjs")
const Product = require("./Product")
const fs = require('fs');
const { update, delete } = require("../controllers/UserController")

module.exports = {
    async FindOne(filters) {
        try {
            let query = "SELECT * FROM users"

            Object.keys(filters).map(key => {
                query = `${query}
                    ${key}
                `

                Object.keys(filters[key]).map(field => {
                    query = `${query} ${field} = '${filters[key][field]}'`
                })
            })

            const results = await db.query(query)

            return results.rows[0]
        } catch (error) {
            throw new Error(error)
        }

    },
    async Create(data) {
        try {
            const query = `
          INSERT INTO users (
            name,
            email,
            password,
            cpf_cnpj,
            cep,
            address
          ) VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `;
        
        const passwordHash = await hash(data.password, 8)

        const values = [
            data.name,
            data.email || 1,
            passwordHash,
            data.cpf_cnpj.replace(/\D/g, ""),
            data.cep.replace(/\D/g, ""),
            data.address
        ];
        
        const results = await db.query(query, values)
        return results.rows[0].id

        } catch (error) {
            throw new Error(error)
        }

    },
    async Update(id, fields){
        try {
            let query = `
          UPDATE users SET `;

          Object.keys(fields).map((key, index, array) => {
              if((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
              } else {
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `
              }
          })
    
          await db.query(query)
          return

        } catch (error) {
            throw new Error(error)
        }
    },
    async delete(id) {
        try {
            let products = (await Product.all()).rows

            const allFilesPromise = products.map(product => 
                Product.files(product.id)
            ) 

            let promiseResults = await Promise.all(allFilesPromise)

            await db.query("DELETE FROM users WHERE id = $1", [id])

            promiseResults.map(results => {
                results.rows.map(file => fs.unlinkSync(file.path))
            })

        } catch (error) {
            throw new Error(error)
        }
    }
}