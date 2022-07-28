var imoveis = require('../models/imoveis');
var axios = require("axios")
var qs = require("querystring")

const imoveisControlador = {};


imoveisControlador.buscarImoveis = function(req,res){
    imoveis.findAll({
        raw: true
    }).then(
        function(dados){
            res.render("inicio",{imoveis2: dados})
        }
    ).catch(
        function(erro){
            res.status(500).send(`Erro ao buscar os imovel: ${erro}`)
        }
    )
}
//CREATE
imoveisControlador.cadastroImoveis = function(req, res){
    imoveis.create({
    nomePropretario: req.body.nomeDoProprietario, 
    local: req.body.local,
    tipo: req.body.tipoDeImovel,   
    situacao: req.body.situacao,
    valor: req.body.valor
    }).then( 

        function(){
            res.status(200).redirect("/");
        }
    ).catch(
        function(error){
            res.status(500).send("Erro  ao criar imóvel  " + error);
        }
    )
}
//UPDATE
imoveisControlador.atualizarImoveisBanco = function (req, res) {
    imoveis.update({
    nomePropretario: req.body.nomeDoProprietario, 
    local: req.body.local,
    tipo: req.body.tipoDeImovel,  
    situacao: req.body.situacao,
    valor: req.body.valor
    },{
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao atualizar o imóvel: " + error)
        }
    )
}
//DELETE
imoveisControlador.removerImoveisBanco = function (req, res) {
    imoveis.destroy(
        {
        where: {
            id: req.params.id
        }
    }).then(
        function(){
            res.sendStatus(200)
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao remover o imovel: " + error)
        }
    )
}
//métodos do handlebars
imoveisControlador.cadastro = function (req, res) {
    try {
        res.render("cadastroImoveis")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};



//solicitarEditarFormulario
imoveisControlador.editarImoveis = function(req,res){
    imoveis.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(imoveis){
            res.render("editar",{
                cod: req.body.cod,
                codCorretor: req.body.codCorretor,
                nomePropretario: req.body.nomeDoProprietario, 
                local: req.body.local,
                tipo: req.body.tipoDeImovel,  
                situacao: req.body.situacao,
                valor: req.body.valor
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error)
        }
    )
}
//montarRequisiçãoEditar
imoveisControlador.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
            cod: req.body.cod,
            codCorretor: req.body.codCorretor,
            nomePro: req.body.nomePro, 
            locol: req.body.locol,
            imovel: req.body.imovel,  
            situacao: req.body.situacao,
            valor: req.body.valor
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "54.84.192.224",
                port: 3000
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o imovel: " + err);
    })
}

//montarRequisiçãoRemover
imoveisControlador.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,{
        proxy:{
            host: "54.84.192.224",
            port: 3000
        }
        
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um imovel: " + err);
        })
}

module.exports = imoveisControlador;