import { slugify } from "../utils/slugify"
export const projects = [
    {
      title: "Delta - Clay 3D Printer",
      description: "Documentation of my latest delta 3D printer build.",
      image: "/projects/delta.jpg",
      slug: slugify("Delta - Clay 3D Printer"),
      content: `
        This project documents the process of building a custom **delta-style clay 3D printer**.  
        From frame assembly to extruder design, I explored how to adapt traditional 3D printing techniques for ceramics.  
        
        Key highlights:
        - Lightweight frame design  
        - Stepper motor calibration  
        - Clay extrusion system prototyping  
      `,
    },
    {
      title: "3D-Printed Lamp Studio",
      description: "A collection of 3D-printed lighting prototypes blending craft and tech.",
      image: "/projects/lamp.jpg",
      slug: slugify("3D-Printed Lamp Studio"),
      content: `
        A series of experimental lamp designs produced using parametric modeling and **3D printing**.  
        The collection explores different textures, geometries, and lighting effects.
      `,
    },
    {
      title: "Koodu Architecture",
      description: "A Nest for Architecture, Imagination, and Making.",
      image: "/projects/koodu.jpg",
      slug: slugify("Koodu Architecture"),
      content: `
        **Koodu** (Tamil for "Nest") is a conceptual design lab focused on architecture, imagination, and making.  
        This project serves as a manifesto for exploring new computational workflows and digital fabrication methods.
      `,
    },
  ]
  