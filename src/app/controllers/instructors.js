const Instructors = require('../models/Instructor')
const { age, date } = require('../../lib/utils')


module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors){
        const pagination = {
          total: Math.ceil(instructors[0].total / limit),
          page
        }
        return res.render('instructors/index' , { instructors, pagination, filter });
        
      }   
    } 
    
    Instructors.paginate(params)

  },
  create(req, res) {
    return res.render('instructors/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Instructors.create(req.body, (instructor) => {
      return res.redirect(`/instructors/${instructor.id}`)
    })
    

  },
  show(req, res) { 

    Instructors.find(req.params.id, (instructor) => {
      if(!instructor) return res.send("Instructor Not Found!")

      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(",")
      instructor.created_at = date(instructor.created_at).format

      return res.render("instructors/show", { instructor })
    })

  },
  edit(req, res) {  
    
    Instructors.find(req.params.id, (instructor) => {
      if(!instructor) return res.send("Instructor Not Found!")

      instructor.birth = date(instructor.birth).iso

      return res.render("instructors/edit", { instructor })
    })
  },
  put(req, res) { 

    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Instructors.update(req.body, () => {
      return res.redirect(`/instructors/${req.body.id}`)
    })
  },
  delete(req, res) {
    Instructors.delete(req.body.id, () => {
      return res.redirect(`/instructors`)
    })
   },
  home(req, res) {
    return res.redirect('/instructors');
  }
}