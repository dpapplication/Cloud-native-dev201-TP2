const express =require("express")
const app =express()
app.use(express.json())
let Livre=[
    {id:1,titre:'java',auteur:'Eric Michel',prix:700},
    {id:2,titre:'PHP',auteur:'Jean park',prix:500},
]
app.get('/Livre',(req,res)=>{
    res.status(200).json(Livre)
})
app.get('/livre/:id',(req,res)=>{
    let id=parseInt(req.params.id)
    const livre=Livre.find(e => e.id==id)
    if(livre)
        res.status(200).json(livre)
    else
        res.status(404).json({message:"Livre n'existe pas"})
})
app.get('/livre/auteur/:auteur',(req,res)=>{
    let {auteur}=req.params
    auteur=auteur.replace('_',' ')
    const livre=Livre.filter( e => e.auteur==auteur)
    if(livre.length>0)
        res.status(200).json(livre)
    else
        res.status(404).json({message:"Aucun livre"})
 
})

app.post('/livre/add',(req,res)=>{
    let {id,titre,auteur,prix}=req.body
    
    const livre = Livre.find( e => e.id==id)
    if(livre)
        res.status(200).json({message:"Ce livre est deja existe"})
    else
    {
        Livre.push({id,titre,auteur,prix})
        res.status(201).json({message:'bien ajoute'})
    }
})
app.put('/livre/edit/:id',(req,res)=>{
    let id=parseInt(req.params.id)
    const livre=Livre.find(e => e.id==id)
    if(!livre)
        res.status(404).json({message:"Ce livre n'existe pas"})
    else
    {
        livre.titre=req.body.titre
        livre.auteur=req.body.auteur
        livre.prix=req.body.prix
        res.status(200).json({message:"Ce livre est bien modifie"})
    }
})
app.delete('/livre/del/:id',(req,res)=>{
    let id=parseInt(req.params.id)
    let taille=Livre.length
    Livre=Livre.filter(e=> e.id!=id)
    if(taille==Livre.length)
    res.status(404).json({message:"Ce livre n'existe pas"})
else
res.status(200).json({message:"Ce livre est bien supprime"})
})
app.listen(3000,console.log('serveur is running'))