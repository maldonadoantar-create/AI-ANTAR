export interface Profile {
  id: string;
  name: string;
  age: number;
  colonia: string;
  distanceKm: number;
  bio: string;
  interests: string[];
  verified?: boolean;
}

export const QUERETARO_COLONIAS = [
  "Centro Histórico",
  "Juriquilla",
  "El Refugio",
  "Milenio III",
  "La Cañada",
  "Cimatario",
  "Jurica",
  "Zibatá",
  "Carretas",
  "El Pueblito",
  "Corregidora",
  "San Pablo",
  "Álamos 3ra",
  "Menchaca",
];

export const INTEREST_POOL = [
  "café de olla",
  "senderismo en el Cimatario",
  "Peña de Bernal",
  "ruta del vino",
  "tardeo en la Plaza de Armas",
  "ciclismo",
  "antojitos del Mercado de la Cruz",
  "jazz en el centro",
  "escalada",
  "Feria de Querétaro",
  "cine independiente",
  "globos aerostáticos",
  "cerveza artesanal",
  "fotografía",
  "salsa y bachata",
  "running",
  "arquitectura colonial",
  "brunch dominguero",
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: "p1",
    name: "Marina",
    age: 27,
    colonia: "Centro Histórico",
    distanceKm: 1.2,
    bio: "Guío recorridos por el centro los fines de semana. Si te gusta perderte entre callejones y cantera rosa, hacemos match seguro.",
    interests: ["café de olla", "arquitectura colonial", "fotografía"],
    verified: true,
  },
  {
    id: "p2",
    name: "Santiago",
    age: 30,
    colonia: "Juriquilla",
    distanceKm: 8.4,
    bio: "Ingeniero de día, ciclista de montaña los sábados temprano. Busco alguien para el after-ride en un café.",
    interests: ["ciclismo", "cerveza artesanal", "running"],
  },
  {
    id: "p3",
    name: "Renata",
    age: 25,
    colonia: "El Refugio",
    distanceKm: 4.7,
    bio: "Amante del vino queretano — te puedo llevar a mis tres viñedos favoritos de la ruta. Bailarina de salsa los jueves.",
    interests: ["ruta del vino", "salsa y bachata", "brunch dominguero"],
    verified: true,
  },
  {
    id: "p4",
    name: "Diego",
    age: 29,
    colonia: "Cimatario",
    distanceKm: 3.1,
    bio: "Vivo pegado al parque nacional, así que si te gusta el senderismo antes del trabajo, hablemos.",
    interests: ["senderismo en el Cimatario", "fotografía", "running"],
  },
  {
    id: "p5",
    name: "Ximena",
    age: 26,
    colonia: "Milenio III",
    distanceKm: 5.9,
    bio: "Diseñadora gráfica, adicta al cine independiente del Cineteca. Buscando con quién debatir la peli después.",
    interests: ["cine independiente", "café de olla", "fotografía"],
  },
  {
    id: "p6",
    name: "Emilio",
    age: 31,
    colonia: "Zibatá",
    distanceKm: 11.2,
    bio: "Cervecero artesanal aficionado. Los domingos hago brunch con amigos, ¿te apuntas?",
    interests: ["cerveza artesanal", "brunch dominguero", "jazz en el centro"],
  },
  {
    id: "p7",
    name: "Camila",
    age: 24,
    colonia: "Centro Histórico",
    distanceKm: 0.8,
    bio: "Estudiante de arquitectura obsesionada con el Acueducto. Te cuento su historia si me invitas un café.",
    interests: ["arquitectura colonial", "café de olla", "fotografía"],
  },
  {
    id: "p8",
    name: "Rodrigo",
    age: 33,
    colonia: "Jurica",
    distanceKm: 9.6,
    bio: "Escalador de fin de semana en la Peña de Bernal. Entre semana busco compañía para correr al amanecer.",
    interests: ["escalada", "Peña de Bernal", "running"],
    verified: true,
  },
  {
    id: "p9",
    name: "Valentina",
    age: 28,
    colonia: "Carretas",
    distanceKm: 6.3,
    bio: "Fotógrafa de eventos. En la Feria de Querétaro me vas a encontrar con la cámara y un elote.",
    interests: ["Feria de Querétaro", "fotografía", "globos aerostáticos"],
  },
  {
    id: "p10",
    name: "Mateo",
    age: 27,
    colonia: "El Pueblito",
    distanceKm: 7.5,
    bio: "Vuelo en globo cada que puedo — amanecer sobre el valle no tiene comparación. Después, tacos obligados.",
    interests: ["globos aerostáticos", "antojitos del Mercado de la Cruz", "cerveza artesanal"],
  },
  {
    id: "p11",
    name: "Fernanda",
    age: 26,
    colonia: "Corregidora",
    distanceKm: 12.4,
    bio: "Sommelier en formación. Los viernes hago cata en casa, si sabes de vino o quieres aprender, bienvenido.",
    interests: ["ruta del vino", "jazz en el centro", "brunch dominguero"],
  },
  {
    id: "p12",
    name: "Andrés",
    age: 32,
    colonia: "San Pablo",
    distanceKm: 4.0,
    bio: "Baterista de una banda de jazz que toca en el centro los miércoles. Ven a escucharme y te invito un mezcal.",
    interests: ["jazz en el centro", "arquitectura colonial", "cine independiente"],
  },
  {
    id: "p13",
    name: "Isabela",
    age: 25,
    colonia: "Álamos 3ra",
    distanceKm: 5.2,
    bio: "Corredora de medio maratón, entreno en el Parque Querétaro 2000. Después, smoothie bowl obligatorio.",
    interests: ["running", "brunch dominguero", "ciclismo"],
  },
  {
    id: "p14",
    name: "Tomás",
    age: 29,
    colonia: "Menchaca",
    distanceKm: 3.8,
    bio: "Guitarrista de fin de semana y guía de rutas en bici por el centro histórico. Cero prisa, mucho café.",
    interests: ["ciclismo", "café de olla", "arquitectura colonial"],
  },
];

export function getProfileById(id: string): Profile | undefined {
  return MOCK_PROFILES.find((p) => p.id === id);
}
