export interface HeroContent {
  title: string;
  subtitle: string;
  primary_cta_label: string;
  primary_cta_type: 'whatsapp' | 'form';
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
  scenarioText?: string;
  solutionText?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  detail?: string;
}

export interface SolutionTier {
  id: string;
  name: string;
  description: string;
}

export interface ProcessStep {
  order: number;
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  client_name: string;
  summary: string;
  highlights: string[];
  is_confidential_placeholder?: boolean;
}

export interface ContactChannel {
  type: 'whatsapp' | 'comercial' | 'tecnologia' | 'soporte';
  label: string;
  phone_number: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CustomerVoice {
  id: string;
  quote: string;
  response: string;
}

export interface BeforeAfterExample {
  before: string;
  after: string;
  closing: string;
}

export const heroContent: HeroContent = {
  title: "¿Tienes un problema en tu negocio? Nosotros tenemos la solución.",
  subtitle: "Convierte tus procesos, datos e ideas en soluciones tecnológicas que te hacen crecer.",
  primary_cta_label: "Escríbenos por WhatsApp",
  primary_cta_type: "whatsapp",
};

export const painPoints: PainPoint[] = [
  {
    id: "excel",
    title: "Demasiado Excel",
    description: "Tienes muchos archivos, versiones y nada está organizado.",
    icon: "excel",
    scenarioText: "Usas hojas de cálculo para tareas que requieren una base de datos. Copias y pegas información entre archivos, pierdes versiones, y los errores humanos son frecuentes.",
    solutionText: "Centralizamos tu información en una base de datos segura y diseñamos una plataforma web a medida para que tu equipo registre, consulte y gestione datos sin fricciones."
  },
  {
    id: "manual",
    title: "Procesos manuales",
    description: "Tareas repetitivas que consumen horas todos los días.",
    icon: "manual",
    scenarioText: "Tu equipo dedica gran parte de su jornada a tareas monótonas como llenar formularios, transcribir datos o enviar correos de seguimiento, perdiendo tiempo valioso.",
    solutionText: "Implementamos automatizaciones (RPA) y scripts que ejecutan estas tareas 24/7 de forma rápida y sin errores, liberando a tu personal para trabajo estratégico."
  },
  {
    id: "downloads",
    title: "Descargas y archivos",
    description: "Cada día descargas, copias, renombras y envías archivos manualmente.",
    icon: "download",
    scenarioText: "El flujo de trabajo depende de descargar reportes, cambiarles el formato, renombrarlos y enviarlos por correo a diferentes destinatarios de manera rutinaria.",
    solutionText: "Diseñamos un pipeline automático que extrae, transforma y distribuye tus archivos directamente a los sistemas o personas correspondientes sin intervención manual."
  },
  {
    id: "numbers",
    title: "No ves tus números",
    description: "Tienes información, pero no sabes qué está pasando en tu negocio.",
    icon: "chart",
    scenarioText: "Generas datos todos los días pero se quedan estancados en sistemas aislados. Necesitas semanas para armar un reporte y cuando lo tienes, la información ya es antigua.",
    solutionText: "Construimos dashboards en Power BI conectados directamente a tus fuentes de datos (ETL) para que tengas indicadores clave en tiempo real y tomes decisiones ágiles."
  },
  {
    id: "whatsapp",
    title: "Todo por WhatsApp",
    description: "Clientes, pedidos, consultas y pagos dispersos y sin control.",
    icon: "whatsapp",
    scenarioText: "Toda la operación comercial pasa por mensajes de chat. Es imposible rastrear el estado de los pedidos, delegar atención o medir la productividad del equipo de ventas.",
    solutionText: "Integramos tus canales en un sistema centralizado (CRM o plataforma a medida) para organizar clientes, automatizar respuestas y mantener el control de todo el ciclo comercial."
  },
  {
    id: "mobility",
    title: "Necesitas movilidad",
    description: "Tu equipo necesita trabajar desde el celular o desde cualquier lugar.",
    icon: "mobile",
    scenarioText: "Tus vendedores, técnicos o supervisores están en la calle pero siguen dependiendo de papel o de llamar a la oficina para registrar información o consultar datos.",
    solutionText: "Desarrollamos una aplicación móvil nativa (Android) o una web progresiva para que tu personal de campo opere, registre datos y sincronice información desde cualquier dispositivo."
  },
  {
    id: "automate",
    title: "Quieres automatizar",
    description: "Sabes que puedes automatizar, pero no sabes por dónde empezar.",
    icon: "robot",
    scenarioText: "Tienes la intuición de que muchas tareas podrían hacerse solas usando software o Inteligencia Artificial, pero la barrera técnica te impide dar el primer paso.",
    solutionText: "Realizamos una consultoría de procesos para identificar cuellos de botella y te proponemos soluciones tecnológicas escalables, desde scripts simples hasta asistentes con IA."
  },
  {
    id: "presence",
    title: "No tienes presencia",
    description: "Tu negocio merece una web profesional que te represente.",
    icon: "web",
    scenarioText: "Tus clientes te buscan en internet y no te encuentran, o la imagen digital que tienes no refleja la calidad y profesionalismo de los servicios que realmente ofreces.",
    solutionText: "Creamos un sitio web moderno, rápido y optimizado (SEO), diseñado para generar confianza y convertir visitantes en clientes de manera consistente."
  }
];

export const services: Service[] = [
  { id: "software", name: "Software & Sistemas", description: "Sistemas a medida, módulos, plataformas y soluciones empresariales.", icon: "software" },
  { id: "web", name: "Desarrollo Web", description: "Páginas, landing, tiendas online, portales y CMS.", icon: "web" },
  { id: "rpa", name: "Automatización & RPA", description: "Automatizamos tareas repetitivas con Python, 24/7, asistidas o desatendidas.", icon: "automation", detail: "Evaluación de procesos repetitivos (descarga, copia, transformación, registro, envío de información) para convertirlos en automatización con Python/RPA. Incluye: procesamiento de archivos, consolidación de información, carga y actualización de sistemas, generación de reportes, envío de información, ejecuciones programadas, procesos asistidos o desatendidos." },
  { id: "data", name: "Datos & BI", description: "ETL, SQL, Power BI, dashboards, KPIs y reportes automatizados.", icon: "data", detail: "Organización del flujo de información para análisis de negocio. Incluye: ETL, SQL y bases de datos, integración de fuentes, modelamiento, Power BI, dashboards, KPIs, reportes automatizados." },
  { id: "mobile", name: "Apps Móviles", description: "Aplicaciones Android para tu equipo, clientes o vendedores.", icon: "mobile" },
  { id: "ai", name: "IA Aplicada", description: "Agentes, asistentes, inteligencia artificial y automatizaciones inteligentes.", icon: "ai" },
  { id: "integration", name: "Integración", description: "APIs, sistemas, bases de datos, cloud y conexión entre plataformas.", icon: "integration" },
  { id: "consulting", name: "Consultoría Tecnológica", description: "Diagnóstico, arquitectura, proyectos, DevOps y transformación.", icon: "consulting" }
];

export const solutionTiers: SolutionTier[] = [
  { id: "essential", name: "Solución Esencial", description: "Resolver el problema principal con el alcance mínimo necesario. Ideal para automatizaciones puntuales, pequeños sistemas, registros, reportes o mejoras específicas." },
  { id: "professional", name: "Solución Profesional", description: "Ampliar la solución con más usuarios, módulos, automatización, reportes, integraciones y mejor experiencia de uso." },
  { id: "integral", name: "Solución Integral", description: "Mayor alcance: múltiples módulos, aplicaciones, integraciones, datos, BI, automatización, infraestructura y operación." }
];

export const processSteps: ProcessStep[] = [
  { order: 1, title: "Cuéntanos tu problema", description: "Hablamos de tu negocio y entendemos tu situación." },
  { order: 2, title: "Diagnóstico sin compromiso", description: "Analizamos y te mostramos posibles soluciones." },
  { order: 3, title: "Propuesta a tu medida", description: "Te presentamos opciones claras y alcanzables." },
  { order: 4, title: "Desarrollo e implementación", description: "Construimos, probamos y desplegamos." },
  { order: 5, title: "Resultados y soporte", description: "Te acompañamos para que obtengas resultados reales." }
];

export const caseStudies: CaseStudy[] = [
  { id: "jht", client_name: "JHT Transporte Logístico", summary: "Plataforma web + móvil para gestión logística, mantenimiento, noticias y más.", highlights: ["App móvil", "Plataforma web", "Logística & mantenimiento"] },
  { id: "gianis", client_name: "Gianis Estética", summary: "Página web profesional para potenciar su presencia digital.", highlights: [] },
  { id: "confidential", client_name: "Y más proyectos confidenciales", summary: "Desarrollos internos y empresariales bajo acuerdos de confidencialidad.", highlights: [], is_confidential_placeholder: true }
];

export const contactChannels: ContactChannel[] = [
  { type: "whatsapp", label: "WhatsApp General", phone_number: "963 478 502" },
  { type: "comercial", label: "Comercial y Ventas", phone_number: "963 478 502" },
  { type: "tecnologia", label: "Consultor Tecnología", phone_number: "945 430 358" },
  { type: "soporte", label: "Soporte Aplicaciones", phone_number: "992 609 046" }
];

// PENDIENTE: faqItems will be populated when the client provides the content.
export const faqItems: FAQItem[] = [];

export const closingMessages = {
  primary: "¿Tienes un problema que quieres simplificar? Háblanos de tu negocio. Encontramos contigo una solución tecnológica proporcional a tu necesidad.",
  secondary: "¿Listo para dar el próximo paso? Escríbenos ahora.",
  slogan: "Tecnología · Confianza · Resultados.",
  philosophy1: "No necesitas contratar una solución mayor de la que tu problema requiere.",
  philosophy2: "La tecnología debe reducir esfuerzo, errores y tiempo; no agregar complejidad innecesaria."
};

export const customerVoices: CustomerVoice[] = [
  { id: "voice1", quote: "Tengo información por todos lados", response: "Excel, archivos, WhatsApp y sistemas separados. Te ayudamos a integrar la información y convertirla en indicadores y decisiones con ETL, bases de datos y Power BI." },
  { id: "voice2", quote: "Mi personal repite lo mismo todos los días", response: "Copiar datos, descargar archivos, generar reportes o enviar información puede automatizarse con RPA y Python, incluso con ejecución desatendida y programada." },
  { id: "voice3", quote: "Excel ya no me alcanza", response: "Cuando una operación crece, podemos convertir procesos dispersos en sistemas web con usuarios, registros, consultas, reportes y control." },
  { id: "voice4", quote: "Necesito trabajar desde el celular", response: "Diseñamos aplicaciones móviles y plataformas web para que vendedores, técnicos, colaboradores o clientes puedan operar desde cualquier lugar." },
  { id: "voice5", quote: "Quiero usar IA, pero no sé dónde", response: "Analizamos procesos concretos para identificar dónde una IA, asistente o automatización realmente puede aportar valor." },
  { id: "voice6", quote: "Necesito presencia digital", response: "Desarrollamos páginas web, landing pages y CMS para presentar tu negocio profesionalmente y conectar tus canales comerciales." }
];

export interface BeforeAfterItem {
  id: string;
  category: string;
  before: string;
  after: string;
}

export const beforeAfterExample: BeforeAfterExample = {
  before: "Una persona recibe archivos, los ordena, copia datos y prepara un reporte.",
  after: "El proceso puede diseñarse para ejecutar esas tareas automáticamente y dejar la información lista para su revisión.",
  closing: "La tecnología debe reducir esfuerzo, errores y tiempo; no agregar complejidad innecesaria."
};

export const beforeAfterExamples: BeforeAfterItem[] = [
  {
    id: "rpa",
    category: "Automatización & RPA",
    before: "Una persona recibe múltiples archivos Excel por correo, los valida manualmente, copia datos uno a uno y consolida un reporte diario durante 3 horas.",
    after: "Un script en Python/RPA descarga, procesa e integra automáticamente los datos en 30 segundos, enviando el reporte consolidado directo a los responsables."
  },
  {
    id: "bi",
    category: "Datos & Power BI",
    before: "Datos de ventas, inventarios y clientes dispersos en archivos locales y chats. El gerente tarda semanas en armar un estado de situación del negocio.",
    after: "Flujo ETL automatizado que alimenta dashboards interactivos en Power BI con KPIs del negocio actualizados en tiempo real."
  },
  {
    id: "mobile",
    category: "Apps Móviles & Campo",
    before: "Técnicos y vendedores registran pedidos y mantenimiento en formatos de papel, luego llaman a la oficina para transcribirlos al sistema central.",
    after: "Aplicación móvil nativa donde el personal de campo opera, registra fotos, firmas y pedidos con sincronización instantánea a la nube."
  },
  {
    id: "software",
    category: "Sistemas & Software Web",
    before: "La empresa gestiona operaciones, clientes y seguimiento mediante decenas de archivos Excel compartidos, propensos a duplicación y errores.",
    after: "Sistema web multiusuario con roles, permisos, control de estados, trazabilidad completa de registros y consultas en milisegundos."
  },
  {
    id: "integration",
    category: "Integración Tecnológica",
    before: "Consultas de clientes, comprobantes de pago y pedidos dispersos en celulares personales de vendedores sin control ni historial centralizado.",
    after: "Integración de canales en una plataforma centralizada (CRM a medida), automatizando respuestas iniciales y asignando pedidos al equipo."
  },
  {
    id: "web",
    category: "Desarrollo Web & Presencia",
    before: "Negocio sin presencia digital o con una web obsoleta que no genera confianza ni capta clientes potenciales de forma constante.",
    after: "Sitio web corporativo moderno, ultra rápido, optimizado para buscadores (SEO) y diseñado para convertir visitantes en clientes."
  },
  {
    id: "ai",
    category: "Inteligencia Artificial Aplicada",
    before: "El equipo pierde tiempo buscando información en manuales y normativas internas para responder consultas técnicas de clientes.",
    after: "Asistente virtual con IA entrenado con la documentación de la empresa que responde preguntas frecuentes y resuelve consultas de inmediato."
  }
];
