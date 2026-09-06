# Machined Ink, the design system for Signal

Ink on warm ground, machined surfaces, one deep-green signal colour. This is a
constraint system, not a mood board. When in doubt, choose the more restrained
option. Follow it for all UI work.

## 1. Philosophy (every decision traces to one of these)

1. Ink on paper, not pixels on glass. Warm off-white ground in light, deep
   near-black in dark. Never pure #fff or #000. Type is near-black ink, not grey.
   Contrast comes from ink, not from boxes and fills.
2. One signal colour, and it means something. Exactly one saturated colour, a
   deep forest green. It marks action and healthy live state only: primary
   buttons, focus, the ready/running indicator, the single number that matters.
   Never decoration, never a background wash, never a second accent. If two
   things on screen are green, one is wrong.
3. Surfaces are machined, not floating. Instrument-panel materiality: keycaps,
   grooves, wells, hairline rims. Depth is 1px inner highlights and 1 to 2px
   shadows, one overhead light. No large soft shadows, no glassmorphism, no glow.
4. Constrained composition over invention. A small set of fixed arrangements,
   reused. New colours and new shadow recipes are forbidden.

## 2. Colour (tokens only, never hardcode)

Light: background #eaeaea, card #f4f4f4, muted #e0e0e0, foreground #121212,
muted-foreground #5b5b5b, border ink at 20%. Signal action #1a6b45,
action-soft #a8cdb8. radius 8px, spacing 4px.

Dark is the same system inverted, not a second palette. Only the green lifts
(action #35a06d) and flips its label to ink, because a dark green drops below
signal contrast on a near-black ground.

Status colours are muted, never neon, never fills, only 6 to 8px dots, 2px
rules or text: running blue, waiting amber, failed red, archived grey. Green is
already spoken for by the signal, so ready/healthy uses the action colour.

Gradients behave like patina: always vertical, a ground tone oxidising into the
green at the bottom (the inverse of a default web gradient). Never side to side,
never on type, borders or icons.

## 3. Typography (four roles)

- Display / headlines: Funnel Display, always letter-spacing -0.02em. This is
  most of the fingerprint.
- Body / UI: Funnel Sans, 1.5 line-height, 15 to 16px base.
- Emphasis / editorial: Redaction (a degraded serif) for pull quotes and poster
  moments. Substituted with a serif fallback until the face is self-hosted.
- Machine output: Geist Mono for code, IDs, timestamps, counts, logs, key hints.

Tight scale: 12 / 14 / 16 / 18 / 20 / 24, jump straight to a large display size
for hero moments. Descriptors hang in small caps, set in mono, used sparingly.

## 4. Materiality, the shadow kit (define once, never author new)

chip / keycap for anything pressable (a keycap has a hard offset shadow, no
blur). well / groove / recess for anything that receives (inputs, tracks, rails);
recessed things are darker than their surroundings. rim / panel for page cards,
one level of elevation, never two stacked. Pressed = swap raised for recessed and
translate 1px down. Borders are hairlines; every panel gets an inset top
highlight.

## 5. Layout, spacing, motion

4px base unit, every dimension a multiple. Dense by default: rows 28 to 36px,
small controls, density is a feature. radius 8px panels/buttons, 4px chips/inputs,
2 to 3px ticks, pill only for status. Motion 150ms cubic-bezier(.4,0,.2,1), or a
snappy mechanical spring; animate opacity, 1 to 2px translate and shadow swaps;
nothing slides more than 8px, nothing scales. Live state is a mono caret blink, a
2.4s shimmer, or a 1 to 0.35 opacity pulse, never a spinner. Respect
prefers-reduced-motion.

## 8. Forbidden

Second accent or second green or decorative green; pure #fff or #000; large soft
shadows, blur over 24px, glassmorphism, glow, neon; side-to-side gradients or
gradients on type/borders; rounded-everything and oversized radii; default system
fonts or display type without -2% tracking; emoji or multi-colour icons (icons
are 1.5px single-ink stroke); stacked elevation; animation for its own sake.

## 10. Acceptance checklist

- One instance of signal green, and it is the primary action.
- Every raised element has an inner top highlight; every input is visibly recessed.
- No shadow outside the kit; no colour outside the tokens.
- All display type at -2% tracking; all numbers/IDs/timestamps in mono.
- Every dimension divides by 4.
- Light and dark are the same system, not two designs.
- Reads correctly in greyscale (only the signal colour dies).
