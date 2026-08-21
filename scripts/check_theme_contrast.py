from __future__ import annotations


def relative_luminance(hex_color: str) -> float:
    values = [int(hex_color[index : index + 2], 16) / 255 for index in (1, 3, 5)]

    def linearize(value: float) -> float:
        return value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4

    red, green, blue = [linearize(value) for value in values]
    return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue)


def contrast_ratio(foreground: str, background: str) -> float:
    light, dark = sorted((relative_luminance(foreground), relative_luminance(background)), reverse=True)
    return (light + 0.05) / (dark + 0.05)


PAIRS = {
    "night-on-ivory": ("#071A4A", "#F7F1E3"),
    "ivory-on-night": ("#F7F1E3", "#071A4A"),
    "cobalt-on-ivory": ("#1F46C8", "#F7F1E3"),
    "ivory-on-cobalt": ("#F7F1E3", "#1F46C8"),
    "cobalt-on-night": ("#1F46C8", "#060A14"),
    "ultramarine-on-ivory": ("#4B5DFF", "#F7F1E3"),
    "ivory-on-ultramarine": ("#F7F1E3", "#4B5DFF"),
    "periwinkle-on-night": ("#9AA5FF", "#060A14"),
    "slate-on-night": ("#A4B0C6", "#060A14"),
    "slate-on-ivory": ("#4C5A76", "#F7F1E3"),
    "oxide-on-ivory": ("#A13F31", "#F7F1E3"),
}


for label, (foreground, background) in PAIRS.items():
    ratio = contrast_ratio(foreground, background)
    print(f"{label}: {ratio:.2f}:1")
