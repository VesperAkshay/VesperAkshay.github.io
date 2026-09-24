/**
 * Given distance (px) from cursor to icon center, return a scale 1.0–1.5
 * with falloff over roughly 2 neighboring icons (~150px radius).
 */
export function dockMagnify(distance: number, maxScale = 1.45, radius = 140): number {
  if (distance > radius) return 1
  // Cosine easing curve gives an even smoother, genuine macOS parabolic crest
  const ratio = distance / radius
  const falloff = Math.cos((ratio * Math.PI) / 2)
  return 1 + (maxScale - 1) * falloff
}
