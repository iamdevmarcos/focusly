type FontSizeConfig = [
  string,
  { lineHeight?: string; letterSpacing?: string; fontWeight?: string | number },
];

export const fontSize: Record<string, FontSizeConfig> = {
  "focusly-heading": [
    "96px",
    {
      lineHeight: "1",
      letterSpacing: "-0.8px",
      fontWeight: "700",
    },
  ],
  "focusly-normal": [
    "16px",
    {
      lineHeight: "1",
      fontWeight: "300",
    },
  ],
  "focusly-medium": [
    "18px",
    {
      lineHeight: "1",
      fontWeight: "400",
    },
  ],
};
