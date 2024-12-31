import { scaleLinear } from 'd3-scale';
import { interpolateGreens } from 'd3-scale-chromatic';

export const getColorScale = (min: number, max: number) => {
  return scaleLinear<string>()
    .domain([min, max])
    .range(['#e5f5e0', '#31a354'])
    .interpolate((a, b) => {
      return (t: number) => interpolateGreens(t * 0.8);
    });
};
