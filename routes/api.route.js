const router = require("express").Router();
const { PrismaClient } = require("@prisma/Client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

/**************************  TRAER LOS PARAMETROS *******************************************/

router.get("/traerparametro", async (req, res, next) => {
  try {
    const parametros = await prisma.Parametros.findMany({
      where: {
        IdParametro: 1,
      },
    });

    res.json(parametros);
  } catch (error) {
    next(error);
  }
});

/**************************************** TRAER TODOS LOS EVENTOS *********************************************************************/
router.get("/grupocurso", async (req, res, next) => {
  try {
    const eventos = await prisma.GrupoCurso.findMany({});
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

/*********************************** CURSOS POR EVENTO **********************************************************/
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

/***************************************** ARANCELES POR CURSO **************************************************** */
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

/****************************************** BUSCAR CURSO PARA VER SI EXISTE *************************************************************** */
router.get("/cursoexiste/:codigo", async (req, res, next) => {
  const { codigo } = req.params;

  try {
    const busqueda = await prisma.Cursos.findMany({
      where: {
        codigo: codigo,
      },
    });

    res.send(busqueda);
  } catch (error) {
    next(error);
  }
});

/****************************************** BUSCAR EVENTO PARA VER SI EXISTE *************************************************************** */

router.get("/eventoexiste/:codigo", async (req, res, next) => {
  const { codigo } = req.params;

  try {
    const busqueda = await prisma.GrupoCurso.findMany({
      where: {
        codigo: codigo,
      },
    });

    res.send(busqueda);
  } catch (error) {
    next(error);
  }
});

/**********************  BUSCAR EVENTO (PARA EL BOTON BUSCAR ) *******************************************/
router.get("/buscarevento/:codigo", async (req, res, next) => {
  const { codigo } = req.params;
  try {
    const eventos = await prisma.GrupoCurso.findMany({
      where: {
        OR: [
          {
            codigo: {
              contains: codigo,
            },
          },
          {
            Nombre: {
              contains: codigo,
            },
          },
          {
            descripcion: {
              contains: codigo,
            },
          },
        ],
      },
    });
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

/************************************ ALTA ARANCELES *********************************************/
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

/****************************** BAJA ARANCEL ****************************************** */
router.delete("/bajaarancel", async (req, res, next) => {
  const { IdArancel } = req.body;

  console.log("llegaron los parametros:", IdArancel);

  try {
    const bajaarancel = await prisma.Aranceles.delete({
      where: {
        IdArancel: IdArancel,
      },
    });
    res.json(bajaarancel);
  } catch (error) {
    next(error);
  }
});

/********************************* UPDATE ARANCEL*********************************************************/

router.delete("/updatearancel", async (req, res, next) => {
  const { IdCurso, FechaDesde, FechaHasta } = req.body;

  console.log("llegaron los parametros:", IdCurso, FechaDesde, FechaHasta);

  try {
    const bajaarancel = await prisma.Aranceles.delete({
      where: {
        // agregar campo borrado e idUNico a aranceles para hacer la baja fisica
      },
    });
    res.json(bajaarancel);
  } catch (error) {
    next(error);
  }
});

/*************************************** NUEVO CURSO ******************************************************/
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

/********************************* NUEVO EVENTO ************************************************/
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

/****************************************** ACTUALIZAR EVENTO ********************************************************/
router.post("/actualizarevento", async (req, res, next) => {
  const { idGrupo, Nombre, descripcion } = req.body;
  try {
    const updateevento = await prisma.grupoCurso.update({
      where: {
        idGrupo: idGrupo,
      },
      data: {
        Nombre: Nombre,
        descripcion: descripcion,
      },
    });
    res.json(updateevento);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
