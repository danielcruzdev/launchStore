const Member = require('../models/Members')
const { fixMetaString, date } = require('../../lib/utils')


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
      callback(members){
        const pagination = {
          total: Math.ceil(members[0].total / limit),
          page
        }
        return res.render('members/index' , { members, pagination, filter });
        
      }   
    } 
    
    Member.paginate(params)
    
  },
  create(req, res) {

    Member.membersSelectOptions((options) => {
      return res.render('members/create', { memberOptions: options });
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Member.create(req.body, (member) => {
      return res.redirect(`/members/${member.id}`)
    })
    

  },
  show(req, res) { 

    Member.find(req.params.id, (member) => {
      if(!member) return res.send("Member Not Found!")

      member.birth = date(member.birth).birthDay
      member.meta = fixMetaString(member.meta)

      return res.render("members/show", { member })
    })

  },
  edit(req, res) {  
    
    Member.find(req.params.id, (member) => {
      if(!member) return res.send("Member Not Found!")

      member.birth = date(member.birth).iso

      Member.membersSelectOptions((options) => {
        return res.render('members/edit', { member, memberOptions: options });
      })

    })
  },
  put(req, res) { 

    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Por favor preencha todos os campos!");
      }
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`)
    })
   },
  home(req, res) {
    return res.redirect('/members');
  }
}