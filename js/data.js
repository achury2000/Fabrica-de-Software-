/* ============================================================
   Contenido editable · Fábrica de Software de Antioquia
   Fuente: Portafolio UST (diapositivas) + PRD.
   >>> Para mostrar tarifas: cambia SHOW_PRICES a true <<<
   ============================================================ */
window.SFW = {
  SHOW_PRICES: false,
  EMAIL: 'serviciotecnologico@sena.edu.co',
  ADDRESS: 'Carrera 57 #51-83, Torre Norte, tercer piso · Medellín, Antioquia',
  PRICE_NOTE:
    'Valores de referencia tomados de la presentación del portafolio UST. Vigencia, impuestos y alcance final sujetos a validación y evaluación institucional.',

  cats: [
    { id: 'desarrollo', name: 'Desarrollo y diseño', img: 'laptop',
      desc: 'Soluciones web y móviles a medida, sitios web y prototipos visuales y funcionales para ver tu idea antes de construirla.' },
    { id: 'evolucion', name: 'Evolución del software', img: 'server',
      desc: 'Diagnóstico, migración, documentación, despliegue y mantenimiento de lo que ya construiste.' },
    { id: 'calidad', name: 'Calidad y testing', img: 'shield',
      desc: 'Pruebas técnicas, automatizadas y funcionales, y validación del software contra sus requisitos.' },
    { id: 'acompanamiento', name: 'Acompañamiento especializado', img: 'cubos',
      desc: 'Soporte técnico, asesoría, consultoría y valoración para decidir con criterio y resolver a tiempo.' }
  ],

  services: [
    /* ---------- Desarrollo y diseño ---------- */
    { code: 'SER-01', cat: 'desarrollo', icon: 'proto', name: 'Diseño de prototipos rápidos',
      sum: 'Modelos visuales no funcionales de tu producto, antes de implementarlo por completo.',
      alc: ['Mockups completos', 'Diseño de modelos entidad–relación',
            'Vista previa del producto final para desarrolladores, diseñadores y stakeholders',
            'Enfoque ágil: versiones simplificadas y no funcionales'],
      mod: 'Servicio por hora', price: '$35.000 / hora' },
    { code: 'SER-02', cat: 'desarrollo', icon: 'protoFn', name: 'Desarrollo de prototipos rápidos',
      sum: 'Versiones preliminares funcionales para validar tu idea y recoger retroalimentación temprana.',
      alc: ['Desarrollo del prototipo funcional', 'Mockup completo y modelo entidad–relación',
            'Producto mínimo viable (MVP)', 'Base de datos'],
      mod: 'Servicio por hora', price: '$50.000 / hora' },
    { code: 'SER-03', cat: 'desarrollo', icon: 'web', name: 'Diseño de páginas y sitios web',
      sum: 'Planeamos y creamos la estructura visual y funcional de tu sitio: estética, usabilidad y accesibilidad.',
      alc: ['Página web personalizada informativa (landing page)',
            'Landing page con páginas internas (máximo 4)',
            'Sitios a la medida, según requerimientos'],
      mod: 'Por tipo de página', price: 'Landing page $450.000 · Landing con páginas internas (máx. 4) $1.200.000 · A la medida: a convenir',
      note: 'Precios con vigencia 2025 en la presentación.' },

    /* ---------- Evolución del software ---------- */
    { code: 'SER-04', cat: 'evolucion', icon: 'refactor', name: 'Diagnóstico y refactorización',
      sum: 'Revisamos tu código, encontramos errores y lo dejamos más claro, seguro y mantenible.',
      alc: ['Revisión de código (code review) y refactorización',
            'Identificación de posibles errores y coherencia del código',
            'Requisitos no funcionales: seguridad, usabilidad, eficiencia y portabilidad',
            'Cumplimiento de estándares y buenas prácticas'],
      mod: 'Servicio por hora', price: '$50.000 / hora' },
    { code: 'SER-05', cat: 'evolucion', icon: 'migrate', name: 'Migración de aplicaciones',
      sum: 'Trasladamos tu aplicación de un entorno informático a otro sin perder lo que ya funciona.',
      alc: ['Actualización de tecnologías', 'Optimización del rendimiento', 'Adaptación a nuevas infraestructuras'],
      mod: 'Servicio por hora', price: '$70.000 / hora' },
    { code: 'SER-06', cat: 'evolucion', icon: 'docs', name: 'Documentación técnica de software',
      sum: 'Documentamos aplicaciones desarrolladas por la fábrica o por terceros.',
      alc: ['Documentación UML', 'Manual de instalación', 'Manual de usuario', 'Manual técnico'],
      mod: 'Servicio por hora', price: '$120.000 / hora' },
    { code: 'SER-07', cat: 'evolucion', icon: 'deploy', name: 'Implementación y despliegue',
      sum: 'Llevamos el software del entorno de desarrollo o pruebas a producción, listo para los usuarios.',
      alc: ['Introducción y ejecución de la aplicación en un entorno operativo',
            'Traslado de desarrollo/pruebas a producción'],
      mod: 'Servicio por hora', price: '$35.000 / hora' },
    { code: 'SER-08', cat: 'evolucion', icon: 'maint', name: 'Mantenimiento de software',
      sum: 'Mantenemos tu sistema eficiente, seguro y alineado con las necesidades cambiantes.',
      alc: ['Actualización y control de versiones de las tecnologías implementadas',
            'Funcionamiento correcto, seguridad y resolución continua de problemas tras la implementación'],
      mod: 'Servicio por hora', price: '$120.000 / hora' },

    /* ---------- Calidad y testing ---------- */
    { code: 'SER-12', cat: 'calidad', icon: 'perf', name: 'Pruebas técnicas (rendimiento y carga)',
      sum: 'Medimos cómo responde tu sistema bajo diferentes niveles de carga.',
      alc: ['Planificación, creación y ejecución de pruebas',
            'Identificar cuellos de botella y medir la estabilidad',
            'Generación y diseño de pruebas de rendimiento'],
      mod: 'Servicio por hora', price: '$90.000 / hora' },
    { code: 'SER-13', cat: 'calidad', icon: 'auto', name: 'Automatización de pruebas',
      sum: 'Pruebas de software que se ejecutan solas, con herramientas especializadas.',
      alc: ['Diseño, desarrollo y ejecución automática de pruebas',
            'Detectar errores antes y reducir tiempo y costos de prueba',
            'Mejorar la eficiencia del desarrollo'],
      mod: 'Servicio por hora', price: '$90.000 / hora' },
    { code: 'SER-14', cat: 'calidad', icon: 'func', name: 'Pruebas funcionales y de regresión',
      sum: 'Verificamos que cada función haga lo que debe y que lo nuevo no rompa lo anterior.',
      alc: ['Pruebas funcionales para desarrollo móvil, web y entornos de realidad virtual',
            'Verificación y generación de pruebas de regresión'],
      mod: 'Servicio por hora', price: '$90.000 / hora' },
    { code: 'SER-15', cat: 'calidad', icon: 'valid', name: 'Validación del software',
      sum: 'Comprobamos que tu software cumple los requisitos y hace lo que fue diseñado para hacer.',
      alc: ['Verificación del cumplimiento de requisitos',
            'Funciones de forma precisa y completa',
            'Alineación con las necesidades del usuario'],
      mod: 'Desde (página informativa)', price: 'Desde $600.000 (página informativa)' },

    /* ---------- Acompañamiento especializado ---------- */
    { code: 'SER-09', cat: 'acompanamiento', icon: 'support', name: 'Soporte técnico y mesa de ayuda',
      sum: 'Asistencia para resolver problemas del software construido, con un punto central de atención.',
      alc: ['Soporte por niveles (primero, segundo y tercero) según la complejidad del incidente',
            'Mesa de ayuda (help desk): recibe, clasifica, prioriza y asigna solicitudes, incidencias y consultas'],
      mod: 'Servicio por hora', price: '$100.000 / hora' },
    { code: 'SER-10', cat: 'acompanamiento', icon: 'advice', name: 'Asesoría tecnológica',
      sum: 'Orientación experta para que empresarios y emprendedores tomen decisiones informadas.',
      alc: ['Orientación experta y asistencia estratégica',
            'Para empresarios, emprendedores y demás grupos de interés',
            'Superar desafíos y optimizar procesos'],
      mod: 'Servicio por hora', price: '$50.000 / hora' },
    { code: 'SER-11', cat: 'acompanamiento', icon: 'consult', name: 'Consultoría tecnológica',
      sum: 'Acompañamiento estratégico especializado para individuos, empresas y organizaciones.',
      alc: ['Conocimientos especializados en áreas específicas',
            'Asistencia estratégica para decisiones de mayor alcance'],
      mod: 'Servicio por hora', price: '$200.000 / hora' },
    { code: 'SER-16', cat: 'acompanamiento', icon: 'value', name: 'Valoración de software',
      sum: 'Estimamos el precio efectivo de tu software a partir de los recursos invertidos en crearlo.',
      alc: ['Costos equivalentes de recursos físicos, tecnológicos, humanos u otros',
            'Base para fijar un precio efectivo y competitivo'],
      mod: 'Servicio por hora', price: '$150.000 / hora' }
  ],

  phases: [
    { t: 'Planeación', d: 'Se identifican los objetivos, el alcance y los requerimientos del proyecto.', ic: 'plan' },
    { t: 'Análisis y diseño', d: 'Se modela la arquitectura del sistema y la base de datos.', ic: 'design' },
    { t: 'Desarrollo', d: 'Se codifican las funcionalidades siguiendo las metodologías ágiles establecidas.', ic: 'code' },
    { t: 'Pruebas', d: 'Se realizan pruebas funcionales y de seguridad para garantizar la estabilidad del sistema.', ic: 'test' },
    { t: 'Implementación y mantenimiento', d: 'Se despliega el sistema y se brinda soporte técnico continuo.', ic: 'deploy' }
  ],

  labTabs: [
    { id: 'funcional', t: 'Funcionales y regresión', code: 'SER-14',
      d: 'Verificamos que cada función haga lo que debe en desarrollo móvil, web y entornos de realidad virtual, y generamos pruebas de regresión para que lo nuevo no rompa lo anterior.' },
    { id: 'auto', t: 'Automatización', code: 'SER-13',
      d: 'Diseñamos, desarrollamos y ejecutamos pruebas de manera automática con herramientas especializadas: detectamos errores antes, y reducimos tiempo y costos de prueba.' },
    { id: 'carga', t: 'Rendimiento y carga', code: 'SER-12',
      d: 'Planificamos y ejecutamos pruebas para evaluar la capacidad de un sistema bajo diferentes niveles de carga, identificar cuellos de botella y medir su estabilidad.' },
    { id: 'valid', t: 'Validación', code: 'SER-15',
      d: 'Verificamos el cumplimiento de los requisitos del software: que haga con precisión y de forma completa las funciones para las que fue diseñado y responda a las necesidades del usuario.' }
  ],

  audiences: [
    { t: 'Aprendices', d: 'Principal aliado en el desarrollo de los servicios ofertados en el portafolio de la UST.', ic: 'grad' },
    { t: 'Instructores', d: 'Actualización e intercambio de conocimiento.', ic: 'book' },
    { t: 'Otros centros de formación', d: 'Prestación de servicios complementarios y ejecución de proyectos complejos.', ic: 'campus' },
    { t: 'Sector empresarial', d: 'Sofisticación de productos y servicios; optimización y digitalización de procesos.', ic: 'building' },
    { t: 'Personas naturales', d: 'Fortalecimiento de imagen corporativa, digitalización de procesos y apalancamiento de servicios.', ic: 'user' }
  ]
};
