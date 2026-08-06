# Antara — image brief

22 images, all generated in Gemini. Underscore prefix keeps this file out of
Astro's routing.

The risk here is not the count, it is **consistency**. Twenty-two images that
look like twenty-two different photographers is worse than eight that look like
one commission. So every prompt is the same locked paragraph with one line
changed. Do not improvise on the lockup — change only the `Subject:` line.

---

## The lockup

Paste this before every subject line, unchanged:

```
Editorial architectural photography. Shot on a 35mm lens at f/8, tripod, eye
level, one-point perspective, verticals perfectly straight. Natural daylight
only — no artificial lighting, no lamps switched on. Soft directional light
from one side. Restrained contemporary Indian architecture. Muted neutral
palette: lime plaster, board-marked concrete, teak, travertine, blackened
steel. No people. No clutter, no styling props, no text or signage. Realistic
exposure, no HDR, no heavy contrast or vignette, subtle film grain, accurate
natural colour, sharp throughout. 16:9.

Subject:
```

Generate at the widest ratio Gemini offers — everything gets cropped here, so
wider is always better. Save as PNG, keep the filenames exactly as listed, and
drop the lot in `raw-images/`.

---

## Hero — 1

**`hero.png`**
> A long single-storey house of pale lime plaster seen from its garden in late
> afternoon, low sun raking across the wall, one deep rectangular opening, flat
> roof, dry grass in the foreground, no planting beds.

---

## P1 — Two Court House · Bengaluru

Lime plaster, polished concrete floor, teak joinery. Long and single-storey,
with a courtyard at each end.

**`p1-01.png`** — establishing
> The exterior of a long low plastered house at the end of a gravel drive,
> overcast morning, a deep shaded opening in the centre of the facade.

**`p1-02.png`** — principal interior
> A long living room in pale lime plaster with a polished concrete floor, a
> wide horizontal window at the far end, a single low teak bench, a bright
> patch of morning sun lying across the floor.

**`p1-03.png`** — detail
> Close view of a deep plaster window reveal meeting a polished concrete floor,
> raking sunlight across the plaster showing its texture, blackened steel
> window frame at the edge of the frame.

**`p1-04.png`** — courtyard
> A small enclosed courtyard of plaster walls open to the sky, a single tree, a
> concrete bench along one wall, hard midday shadow across half the floor.

---

## P2 — Section House · Nilgiris

Board-marked concrete, oak, glass. Steps down a hillside; one tall window to
the valley.

**`p2-01.png`** — establishing
> A concrete house stepping down a steep green hillside in the Nilgiris,
> overcast light, mist in the valley behind, flat roofs at three levels.

**`p2-02.png`** — principal interior
> A double-height room of board-marked concrete with one tall window looking
> into a misty valley, a cantilevered concrete stair with no railing along the
> left wall, a low oak bench.

**`p2-03.png`** — detail
> Close view of cantilevered concrete stair treads emerging from a
> board-marked concrete wall, soft grey daylight, the shadow of each tread on
> the wall below it.

**`p2-04.png`** — secondary interior
> A concrete-walled bedroom with a low oak platform bed and a horizontal window
> at floor level looking out to grass, flat overcast light.

---

## P3 — The Long Room · Alibaug

Travertine floor, white plaster, five narrow slot windows high on one wall. A
painter's studio and gallery.

**`p3-01.png`** — establishing
> A long low white building among coastal trees, a blank plastered wall facing
> the camera, a single narrow doorway, flat afternoon light.

**`p3-02.png`** — principal interior
> A long white gallery room with a travertine floor and five tall narrow slot
> windows high on the left wall, five separate pools of sunlight on the floor,
> the right wall completely blank.

**`p3-03.png`** — detail
> Close view of a narrow slot window set deep in a white plaster wall, the
> reveal catching sunlight on one side and in shadow on the other, travertine
> floor below.

**`p3-04.png`** — secondary
> The end of a long white room with a full-height glazed opening to a garden,
> travertine floor, one long low bench, nothing else.

---

## P4 — Corner House · Panjim, Goa

Lime plaster over a laterite base, teak shutters, deep verandah. On a street
corner in the old town.

**`p4-01.png`** — establishing
> A two-storey plastered house on a corner in old Panjim, deep shaded verandah
> along both street facades, folding teak shutters, laterite stone at the base
> of the wall, strong tropical afternoon light.

**`p4-02.png`** — principal interior
> A living room with tall openings on two adjacent walls, folded teak shutters
> against the reveals, a polished red oxide floor, two patches of sunlight
> crossing on the floor.

**`p4-03.png`** — detail
> Close view of folding teak shutters folded flat against a deep plaster
> reveal, hard tropical sunlight and sharp shadow, laterite stone below.

**`p4-04.png`** — verandah
> A deep shaded verandah with a row of square plaster columns, bright street
> beyond, red oxide floor, no furniture.

---

## P5 — Upper Rooms · Bengaluru

An apartment interior — no exterior. Oak, pale stone, brass.

**`p5-01.png`** — principal interior
> An apartment living room with pale plaster walls, a wide oak floor, one large
> window with soft afternoon light, a low sofa in oatmeal linen, a stone coffee
> table.

**`p5-02.png`** — kitchen
> A quiet kitchen in oak with a pale stone worktop and splashback, no upper
> cabinets, one window at the end of the run, brass tap, nothing on the
> counter.

**`p5-03.png`** — detail
> Close view of a pale stone worktop meeting oak cabinetry, a brass tap, soft
> daylight from the left, no objects.

**`p5-04.png`** — secondary
> A hallway with pale plaster walls and an oak floor, one door open to a bright
> room at the end, soft indirect daylight.

---

## About — 1

**`studio.png`**
> A workbench in a quiet architecture studio, a white card architectural model
> of a low house, rolled drawings, a scale rule, soft north light from a large
> window, no people.

---

## Rules

- **No people in any frame.** Faces are what AI imagery gets wrong, and a stock
  person in a portfolio shot reads as stock immediately.
- **No text, signage or numbers** anywhere in an image.
- If a frame comes back with warped verticals, bent window frames or a doorway
  that goes nowhere, regenerate it. Those are the tells.
- Two or three per project can be near-misses; what has to hold is that the
  four shots of one project look like one building.

## After they land

Drop everything in `raw-images/` under the exact filenames above.
A processing script then handles cropping to each ratio the site needs, the
grade that unifies the set, WebP conversion and responsive sizes — the same
pipeline as `scripts/build-images.py`, which already does this for the
Klyn hero.

Nothing in the build waits on these. The site is built against placeholders, so
generation and construction happen in parallel.
