/*
  The five projects.

  `shots` are the filenames from _SHOTS.md. Figure.astro looks each one up in
  public/images/antara/ and falls back to a labelled placeholder while it is
  missing, so the whole site can be built and judged before a single image
  exists — and upgrades itself as they arrive, with no code change.
*/

export interface Shot {
  file: string;
  caption: string;
  /* Ratio the image is cropped to on this page */
  ratio: '3/2' | '4/5' | '16/9' | '1/1';
}

export interface Project {
  slug: string;
  name: string;
  place: string;
  year: number;
  type: string;
  status: 'Completed' | 'In construction' | 'In design';
  area: string;
  /* One line for the index */
  lede: string;
  /* The written piece on the project page */
  brief: string[];
  facts: { label: string; value: string }[];
  cover: string;
  shots: Shot[];
}

export const projects: Project[] = [
  {
    slug: 'two-court-house',
    name: 'Two Court House',
    place: 'Bengaluru',
    year: 2025,
    type: 'New house',
    status: 'Completed',
    area: '340 m²',
    lede: 'A long plastered house held open at both ends, so the day crosses it twice.',
    brief: [
      'A narrow plot with neighbours hard against both long edges, which left daylight available only at the two short ends. Rather than argue with that, the house is a single room-height volume with a court at either end — one east for the morning, one west for the evening.',
      'The living space sits between them. From first light to dusk there is a patch of sun somewhere on its floor, and it never arrives from the same direction twice.',
      'Lime plaster over blockwork throughout, and a polished concrete floor poured in one continuous pour. Two materials. No skirting, no architraves, no trims.',
    ],
    facts: [
      { label: 'Type', value: 'New house' },
      { label: 'Location', value: 'Bengaluru, Karnataka' },
      { label: 'Area', value: '340 m²' },
      { label: 'Completed', value: '2025' },
      { label: 'Structure', value: 'Load-bearing blockwork' },
      { label: 'Materials', value: 'Lime plaster, concrete, teak' },
    ],
    cover: 'p1-02',
    shots: [
      { file: 'p1-01', caption: 'From the drive, morning', ratio: '3/2' },
      { file: 'p1-02', caption: 'The long room, looking east', ratio: '16/9' },
      { file: 'p1-03', caption: 'Reveal and floor', ratio: '4/5' },
      { file: 'p1-04', caption: 'The west court at midday', ratio: '4/5' },
    ],
  },

  {
    slug: 'section-house',
    name: 'Section House',
    place: 'Nilgiris',
    year: 2024,
    type: 'Weekend house',
    status: 'Completed',
    area: '210 m²',
    lede: 'One room, three levels, and a stair that is also the furniture.',
    brief: [
      'A hillside plot falling four metres across its width. The house steps with it, so there are no storeys — only levels, each half a flight above the last, all open to the same volume of air.',
      'The stair is a run of cantilevered treads in the same board-marked concrete as the walls. It is the circulation, the seating and the only sculpture in the house.',
      'Glazing is confined to one tall opening facing the valley. The room is deliberately dim; the window is the event.',
    ],
    facts: [
      { label: 'Type', value: 'Weekend house' },
      { label: 'Location', value: 'Kotagiri, Nilgiris' },
      { label: 'Area', value: '210 m²' },
      { label: 'Completed', value: '2024' },
      { label: 'Structure', value: 'In-situ concrete' },
      { label: 'Materials', value: 'Board-marked concrete, oak' },
    ],
    cover: 'p2-01',
    shots: [
      { file: 'p2-01', caption: 'Stepping down the slope', ratio: '3/2' },
      { file: 'p2-02', caption: 'The tall room and the valley', ratio: '16/9' },
      { file: 'p2-03', caption: 'Cantilevered treads', ratio: '4/5' },
      { file: 'p2-04', caption: 'Lower bedroom', ratio: '4/5' },
    ],
  },

  {
    slug: 'the-long-room',
    name: 'The Long Room',
    place: 'Alibaug',
    year: 2026,
    type: 'Studio and gallery',
    status: 'In construction',
    area: '155 m²',
    lede: 'Five openings at one rhythm, and a travertine floor that carries them the length of the room.',
    brief: [
      'A single space for a painter who works at scale and shows the results in the same room. The brief asked for even light without glare, and for a wall long enough to hang a two-metre canvas without crowding it.',
      'Light comes from five narrow openings set high on one side, spaced so their pools of sun do not overlap until the middle of the day. The opposite wall is left entirely uninterrupted.',
      'Travertine floor, white plaster walls. Nothing else, so that nothing competes with what is hung on them.',
    ],
    facts: [
      { label: 'Type', value: 'Studio and gallery' },
      { label: 'Location', value: 'Alibaug, Maharashtra' },
      { label: 'Area', value: '155 m²' },
      { label: 'Status', value: 'In construction, 2026' },
      { label: 'Structure', value: 'Load-bearing blockwork' },
      { label: 'Materials', value: 'Travertine, lime plaster' },
    ],
    cover: 'p3-02',
    shots: [
      { file: 'p3-01', caption: 'The blank street wall', ratio: '3/2' },
      { file: 'p3-02', caption: 'Five pools of light', ratio: '16/9' },
      { file: 'p3-03', caption: 'One opening, in section', ratio: '4/5' },
      { file: 'p3-04', caption: 'The garden end', ratio: '4/5' },
    ],
  },

  {
    slug: 'corner-house',
    name: 'Corner House',
    place: 'Panjim',
    year: 2023,
    type: 'House and rooms to let',
    status: 'Completed',
    area: '275 m²',
    lede: 'Two walls of shutters on a street corner, and a room that opens entirely.',
    brief: [
      'A corner in the old town, where the two street facades are effectively the whole of the building. Local practice is a deep verandah and timber shutters; the house keeps both and does very little else.',
      'The living room takes light from both streets. In the middle of the day the two patches of sun cross on the floor, and for about an hour there is no shadow in the room at all.',
      'Lime plaster above, laterite below the sill line, and shutters in local teak that fold back flat into the reveal.',
    ],
    facts: [
      { label: 'Type', value: 'House and rooms to let' },
      { label: 'Location', value: 'Panjim, Goa' },
      { label: 'Area', value: '275 m²' },
      { label: 'Completed', value: '2023' },
      { label: 'Structure', value: 'Laterite and blockwork' },
      { label: 'Materials', value: 'Lime plaster, laterite, teak' },
    ],
    cover: 'p4-02',
    shots: [
      { file: 'p4-01', caption: 'Two streets, one corner', ratio: '3/2' },
      { file: 'p4-02', caption: 'Both walls open', ratio: '16/9' },
      { file: 'p4-03', caption: 'Shutters folded into the reveal', ratio: '4/5' },
      { file: 'p4-04', caption: 'The verandah', ratio: '4/5' },
    ],
  },

  {
    slug: 'upper-rooms',
    name: 'Upper Rooms',
    place: 'Bengaluru',
    year: 2025,
    type: 'Apartment interior',
    status: 'Completed',
    area: '160 m²',
    lede: 'An apartment stripped back to three materials and one long view through it.',
    brief: [
      'A 1990s apartment with good proportions and forty years of accumulated finishes. Everything that had been added was removed, and what was left turned out to be a decent plan with one long axis running the depth of the flat.',
      'That axis is now the whole idea: stand at the door and you can see through four rooms to the window at the far end. Every doorway was widened and aligned to make it work.',
      'Oak, pale stone and plaster. The brass is the only thing in the flat that will change colour, and it is meant to.',
    ],
    facts: [
      { label: 'Type', value: 'Apartment interior' },
      { label: 'Location', value: 'Bengaluru, Karnataka' },
      { label: 'Area', value: '160 m²' },
      { label: 'Completed', value: '2025' },
      { label: 'Scope', value: 'Full strip-out and refit' },
      { label: 'Materials', value: 'Oak, limestone, brass' },
    ],
    cover: 'p5-02',
    shots: [
      { file: 'p5-01', caption: 'Living room, afternoon', ratio: '3/2' },
      { file: 'p5-02', caption: 'Kitchen, no upper cabinets', ratio: '16/9' },
      { file: 'p5-03', caption: 'Stone meeting oak', ratio: '4/5' },
      { file: 'p5-04', caption: 'The long axis', ratio: '4/5' },
    ],
  },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
