import { ORE_ASTERIOD_TYPES, PLANET_TYPES } from "./constants";

const loadResource = async (path: string) => await (await fetch(path)).text();

const range = (i: number) => new Array(i).fill(0).map((v, i) => i);

const svgSources = new Map<string, string>();

await (async () => {
  const [_asteriodSources, _planetsSources] = await Promise.all([
    Promise.all(
      range(ORE_ASTERIOD_TYPES).map((i) =>
        loadResource(`/assets/ore-asteroid-${i}.svg`)
      )
    ),
    Promise.all(
      range(PLANET_TYPES).map((i) => loadResource(`/assets/planet-${i}.svg`))
    ),
  ]);
  _asteriodSources.map((source, i) => {
    svgSources.set(`ore-astr-${i}`, source);
  });
  _planetsSources.map((source, i) => {
    svgSources.set(`planet-${i}`, source);
  });
})();

export const getSvgURL = (key: string, color?: number | string) => {
  let svg = svgSources.get(key);
  if (!svg) throw new Error("Resource not found: " + key);
  if (color !== undefined) {
    svg = svg.replace(
      ' xmlns:xlink="http://www.w3.org/1999/xlink"',
      ` xmlns:xlink="http://www.w3.org/1999/xlink" style="fill:${
        typeof color === "number" ? `#${Math.round(color).toString(16)}` : color
      }"`
    );
    console.log(svg);
  }
  return URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
  );
};
