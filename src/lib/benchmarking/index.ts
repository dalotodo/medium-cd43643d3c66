

export async function runTest<T>( fn: ()=>Promise<T> ) {
    const start = performance.now();
    await fn();
    const stop = performance.now();
    const ms = (stop - start);
    return ms;
}

export async function runBenchmark<T>( fn: ()=>Promise<T>, times: number ) {
    const timing : number[] = [];
    for (let i = 0; i<times; i++) {
        const time = await runTest(fn);
        timing.push(time)
    }   
    const sum = timing.reduce((prev,current)=>prev+current,0);
    return sum/times;
}


