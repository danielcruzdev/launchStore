const Category = require("../models/Category");
const Product = require("../models/Product");
const File = require("../models/File")
const { formatPrice } = require("../../lib/utils")



module.exports = {
  create(request, response) {
    Category.all()
      .then((results) => {
        const categories = results.rows;
        return response.render("products/create.njk", { categories });
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  async post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos!");
      }
    }

    if(request.files.length == 0){
      return response.send("Por favor envie pelo menos uma imagem!")
    }

    let results = await Product.create(request.body)
    const productId = results.rows[0].id

    const filesPromise = req.files.map(file => {File.create({...file, product_id: productId})})
    await Promise.all(filesPromise)

    return response.redirect(`/products/${productId}`)

  },
  async edit(request, response) {

    let results = await Product.find(request.params.id)
    const product = results.rows[0]

    if (!product) return response.send(`Produto não encontado!`)

    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    results = await Category.all()
    const categories = results.rows

    return response.render("products/edit.njk", { product, categories })
  },
  async put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send("Por favor preencha todos os campos!");
      }
    }

    request.body.price = request.body.price.replace(/\D/g, "")

    if (request.body.old_price != request.body.price){
      const oldProduct = await Product.find(request.body.id)

      request.body.old_price = oldProduct.rows[0].price
    }

    await Product.update(request.body)

    return response.redirect(`/products/${request.body.id}/edit`)
  },
  async delete(request, response) {
    await Product.delete(request.body.id)

    return response.redirect(`/products/create`)
  }
};