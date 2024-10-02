export enum Mode {
  SELECT,
  IDLE,
  DRAW,
  ADJUST_BACKGROUND,
  FINISH_ADJUSTING_BACKGROUND,
}

export function isBackgroundMode(mode: Mode) {
  return mode === Mode.ADJUST_BACKGROUND || mode === Mode.FINISH_ADJUSTING_BACKGROUND
}
