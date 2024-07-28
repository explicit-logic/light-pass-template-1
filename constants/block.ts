export const TYPES = Object.freeze({
  HEADER: 'header',
  CHECKBOX_GROUP: 'checkbox-group',
  IMAGE: 'image',
  RADIO_GROUP: 'radio-group',
});

export const INTERACTIVE_TYPES: Partial<{ [key in typeof TYPES[keyof typeof TYPES]]: boolean }> = Object.freeze({
  [TYPES.CHECKBOX_GROUP]: true,
  [TYPES.RADIO_GROUP]: true,
});
