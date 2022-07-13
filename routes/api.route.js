const router = require('express').Router();
const { PrismaClient } = require("@prisma/Client");
const prisma = new PrismaClient();



router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});



router.get("/grupocurso",async(req,res,next)=>{
try{
const eventos = await prisma.GrupoCurso.findMany({});
res.json(eventos);

}catch(error){next(error)}

})

router.get("/cursosxevento/:id_evento",async(req,res,next)=>{
const {id_evento} = req.params;
  try {
  const cursos = await prisma.Cursos.findMany({
where:{
  idGrupoCurso : parseInt(id_evento)
}
  });
  res.json(cursos);
  
} catch (error) {
  next(error)
}
})

router.get ("/arancelesxcurso/:id_curso",async (req,res,next)=>{
const {id_curso} = req.params;
try {
    const aranceles = await prisma.Aranceles.findMany({
  where:{
    IdCurso : parseInt(id_curso)  
        }
  })
  res.json(aranceles);
  
} catch (error) {
  next(error)
}


})



module.exports = router;
