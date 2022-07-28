const express = require("express");
const passport = require ("passport");
const controladorImoveis = require("../controllers/controladorImovel")
const controlador = require("../controllers/controlador");
const { autenticado } = require("../helpers/acesso");
const {admin} = require("../helpers/acesso")
const rotas = express.Router();

rotas.post("/logar",(req,res,next) =>{
    passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash:true
    })(req,res,next)
})
rotas.get("/logout", (req,res) => {
    req.logout()
    req.flash('success_msg',"Você saiu!")
    res.redirect("/")
})

rotas.get("/" ,controladorImoveis.buscarImoveis) ;
rotas.post("/cadastroImoveis" ,controladorImoveis.cadastroImoveis);
rotas.get("/buscarPagina", controladorImoveis.cadastro )
rotas.get("/editar/:id", controladorImoveis.editarImoveis)
rotas.delete("/removr/", controladorImoveis.removerImoveisBanco);

 
rotas.get("/login",controlador.mostrarFormLogin)
rotas.post("/cadastrar/usuario", controlador.inserirUsuarioBanco);
rotas.get("/cadastro/usuario", controlador.cadastro);

//rotas.post("/logar", controlador.buscarUsuario);

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout()
    req.flash('success_msg',"Você saiu!")
    res.redirect("/")
})

module.exports = rotas;