const router = require("express").Router();
const { PrismaClient } = require("@prisma/Client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get("/grupocurso", async (req, res, next) => {
  try {
    const eventos = await prisma.GrupoCurso.findMany({});
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

router.get("/cursosxevento/:id_evento", async (req, res, next) => {
  const { id_evento } = req.params;
  try {
    const cursos = await prisma.Cursos.findMany({
      where: {
        idGrupoCurso: parseInt(id_evento),
      },
    });
    res.json(cursos);
  } catch (error) {
    next(error);
  }
});

router.get("/arancelesxcurso/:id_curso", async (req, res, next) => {
  const { id_curso } = req.params;
  try {
    const aranceles = await prisma.Aranceles.findMany({
      where: {
        IdCurso: parseInt(id_curso),
      },
    });
    res.json(aranceles);
  } catch (error) {
    next(error);
  }
});

/************************CURSO POR ID*************************/

router.get("/cursoxid/:id_curso", async (req, res, next) => {
  const { id_curso } = req.params;
  try {
    const info = await prisma.Cursos.findMany({
      where: {
        idCurso: parseInt(id_curso),
      },
    });
    res.json(info);
  } catch (error) {
    next(error);
  }
});

router.get("/buscarevento/:codigo", async (req, res, next) => {
  const { codigo } = req.params;
  try {
    const eventos = await prisma.GrupoCurso.findMany({
      where: {
        codigo: codigo,
      },
    });
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});
router.post("/nuevoarancel", async (req, res, next) => {
  const { IdCurso, FechaDesde, FechaHasta, Precio, CantidadUnidadesMinima } =
    req.body;

  try {
    const nuevoArancel = await prisma.Aranceles.create({
      data: {
        IdCurso,
        FechaDesde,
        FechaHasta,
        Precio,
        CantidadUnidadesMinima,
      },
    });

    res.json(nuevoArancel);
  } catch (error) {
    next(error);
  }
});

router.post("/nuevocurso", async (req, res, next) => {
  const {
    nombre1,
    nombre2,
    codigo,
    idGrupoCurso,
    fechaInicio,
    fechaFin,
    cupoMaximo,
    habilitado,
    resaltar,
    codUnidadAcademica,
    idPrograma,
    idPlanEstudio,
    idObligacion,
    mailReferencia,
    domicilioReferencia,
    NombreContactoReferencia,
    urlUbicacion,
    RequiereValidacionEmail,
  } = req.body;

  try {
    const cc = await prisma.Cursos.create({
      data: {
        nombre1,
        nombre2,
        codigo,
        idGrupoCurso,
        fechaInicio,
        fechaFin,
        cupoMaximo,
        habilitado,
        resaltar,
        codUnidadAcademica,
        idPrograma,
        idPlanEstudio,
        idObligacion,
        mailReferencia,
        domicilioReferencia,
        NombreContactoReferencia,
        urlUbicacion,
        RequiereValidacionEmail,
      },
    });
    res.json(cc);
  } catch (error) {
    next(error);
  }
});

router.post("/nuevoevento", async (req, res, next) => {
  const { codigo, Nombre, descripcion, habilitado, RequiereValidacionEmail } =
    req.body;
  try {
    const nuevoevento = await prisma.grupoCurso.create({
      data: {
        codigo,
        Nombre,
        descripcion,
        habilitado,
        RequiereValidacionEmail,
      },
    });
    res.json(nuevoevento);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
