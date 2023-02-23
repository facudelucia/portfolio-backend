const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.post("/", async(req, res) =>{
  try {
      const project = new Project(req.body)
      project.save()
      res.json(project)
  } catch (error) {
      console.log(error)
      res.status(500).send("There was a mistake")
  }
})
router.get("/", async(req, res)=>{
  try {
      let projects = await Project.find().sort({create: -1}) 
      res.json({projects})
  } catch (error) {
      console.log(error)
      res.status(500).send("There was a mistake")
  }
})
router.put("/:projectId", async (req, res, next) => {
    const { title, description, downloadLink, github, image } = req.body;
    const newProject = {};
    
    if(title) {
        newProject.title = title;
    }
    if(github) {
        newProject.github = github;
    }
    if(description) {
        newProject.description = description;
    }
    if(image) {
        newProject.image = image;
    }
    if(downloadLink) {
        newProject.link = downloadLink;
    }

    try {
        // revisar el ID 
        let project = await Project.findById(req.params.projectId);

        // si el proyecto existe o no
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        // actualizar
        project = await Project.findByIdAndUpdate({ _id: req.params.projectId }, {$set: newProject}  , { new: true });

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
  
});

router.delete("/:projectId", async (req, res, next) => {
    try {
        // revisar el ID 
        let project = await Project.findById(req.params.projectId);

        // si el proyecto existe o no
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Eliminar el Proyecto
        await Project.findOneAndRemove({ _id : req.params.projectId });
        res.json({ msg: 'Proyecto eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
});

module.exports = router;