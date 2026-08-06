/*
  Everything about the practice that isn't a project.

  Kept as data rather than sprinkled through the templates so the whole piece
  can be renamed and repositioned from one file — which matters, because this
  is a concept and the name is the first thing anyone will want to change.
*/

export const studio = {
  name: 'Antara',
  meaning: 'the space between',
  discipline: 'Architecture and interiors',
  city: 'Bengaluru',
  country: 'India',
  founded: 2016,
  email: 'studio@antara.example',
  phone: '+91 80 4000 0000',

  /* Used in the <title> and the hero */
  line: 'A small practice working on houses, quietly.',

  intro: [
    'Antara is an architecture and interior practice in Bengaluru, working mostly on houses and mostly for people who intend to stay in them.',
    'We take two or three projects a year. That is not a business strategy — it is the number at which the same two people can draw a building, choose its materials, and still be on site when it is being built.',
  ],
};

/* Bloom3d's structural spine: what you do, stated plainly, before anyone asks */
export const services = [
  {
    n: '01',
    title: 'Architecture',
    body: 'New houses and substantial alterations, from the first sketch through statutory approvals to the last site visit.',
  },
  {
    n: '02',
    title: 'Interiors',
    body: 'Rooms, joinery and materials, whether or not we drew the building they sit inside.',
  },
  {
    n: '03',
    title: 'Furniture',
    body: 'Pieces made for a specific room by people we have worked with for years. Usually a table, usually in teak.',
  },
  {
    n: '04',
    title: 'Consultation',
    body: 'A day on your site and a written opinion, for people deciding whether to build at all.',
  },
];

export const numbers = [
  { value: '2016', label: 'Practising since' },
  { value: '31', label: 'Houses completed' },
  { value: '3', label: 'Projects a year' },
  { value: '2', label: 'People' },
];

/* The approach, as steps rather than adjectives */
export const approach = [
  {
    n: '01',
    title: 'Look first',
    body: 'A day on the site, at the hour you would actually use it. Where the light lands decides most of the plan before anything is drawn.',
  },
  {
    n: '02',
    title: 'Draw slowly',
    body: 'Plans and sections by hand until the building holds together. Renders come late, and only to test a room, never to sell one.',
  },
  {
    n: '03',
    title: 'Choose few',
    body: 'Three materials, used everywhere. A house with four finishes reads as considered; one with fourteen reads as a catalogue.',
  },
  {
    n: '04',
    title: 'Stay to the end',
    body: 'On site weekly through construction. Nearly everything that goes wrong in a building goes wrong after the drawings are finished.',
  },
];

export const faq = [
  {
    q: 'What does a house with you cost?',
    a: 'Our fee is a percentage of the build, and the build is the number that matters. For a new house in and around Bengaluru we are usually working between ₹4,500 and ₹9,000 a square foot depending on the finish, and we will tell you which end you are at in the first meeting rather than the fifth.',
  },
  {
    q: 'How long does it take?',
    a: 'Design and approvals take six to nine months for a house. Construction takes twelve to eighteen. Anyone quoting you materially less is quoting for a different building.',
  },
  {
    q: 'Will you work outside Bengaluru?',
    a: 'Yes, and we have — in the Nilgiris, in Goa, on the coast at Alibaug. Distance changes the site-visit rhythm rather than the fee.',
  },
  {
    q: 'Do you take interiors only?',
    a: 'Often. About a third of what we do is inside a building somebody else drew.',
  },
  {
    q: 'Can we see a house you have built?',
    a: 'Once we have met and there is a real project, yes. We ask our clients first, every time.',
  },
];

/* Shown on every page, once. This piece is a concept and says so. */
export const disclosure =
  'Antara is a concept — a fictional practice built by Klyn to show how we design and build for architects. The buildings, the people and the photographs are not real.';
