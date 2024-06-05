



export type BreakpointConfig = {
    [key: string]: number
}

export type _BreakpointResult = {
    /**
     * The current maximum breakpoint
     */
    breakpoint: string,

    /**
     * All breakpoints that apply to the current window width
     */
    matching_breakpoints : string[]

    /**
     * The minimum screen width of the current breakpoint
     */
    breakpoint_width: number
}


export let defaultBreakpoints = {
    // Bootstrap breakpoints
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
}

export function getBreakPoint(width : number = window.innerWidth, breakpoints : BreakpointConfig = defaultBreakpoints) : _BreakpointResult {
    let bp = breakpoints;
    // Sort the breakpoints ascending by value
    let sorted = Object.keys(bp).sort((a, b) => bp[a] - bp[b]);
    // Find the first breakpoint that is larger than the current window width
    let current = width;
    let result = [];
    for (let key of sorted) {
        if (bp[key] <= current) {
            result.push(key);
        }
    }
    return {
        breakpoint: result[result.length - 1],
        matching_breakpoints: result,
        breakpoint_width: bp[result[result.length - 1]]
    };
}
