/**
 * Usage: node --test --test-isolation=process ./test/perf/emptyObject/*.js
 *
 * Benchmark different approaches to checking whether an object is empty.
 *
 * Benchmarks on Void Linux 6.18.48_1, Node.js v26.5.0
 *   baseline    ~140 ms
 *   singlePass  ~60  ms *
 */

// @ts-check

const { createBenchmark } = require("./benchmark.js");

/**
 * @typedef {{ [key: string]: string }} MockSwapFiles
 */

/**
 * Original implementation from src/components/swapper.js to compare against.
 * @param {MockSwapFiles} swapFiles
 * @returns {boolean}
 */
function baseline(swapFiles) {
    return Object.keys(swapFiles).length === 0;
}

/** @type {[MockSwapFiles][]} */
const cases = [
    [{
        "://site.io/assets/img/texture.png": "C:/Users/Name/Documents/project/assets/img/texture.png",
        "://site.io/assets/media/audio.mp3": "C:/Users/Name/Documents/project/media/audio.mp3",
        "://site.io/assets/img/banner.webp": "C:/Users/Name/Documents/project/assets/img/banner.webp",
        "://site.io/assets/media/foo_bar": "C:/Users/Name/Documents/project/assets/media/foo_bar",
    }],
    [{}],
    [{
        "://example.io/assets/media/fizz.wav": "/home/user/Documents/client/assets/media/fizz.wav",
        "://example.io/assets/img/buzz.jpeg": "/home/user/Documents/client/assets/img/buzz.jpeg",
    }],
    [{}],
    [{
        "://test.io/assets/img/icon.ico": "D:/Users/FooBar/Documents/PROJECT/assets/img/icon.ico",
        "://test.io/assets/img/baseline": "D:/Users/FooBar/Documents/PROJECT/assets/img/baseline",
        "://test.io/assets/media/walk.mp3": "D:/Users/FooBar/Documents/PROJECT/media/walk.mp3",
    }],
    [{}],
    // Generate a large number of arbitrary key-value pairs.
    [Object.fromEntries(Array.from({ length: 1000 }, () => {
        return [Math.random().toString(), Math.random().toString()];
    }))],
];

const iterations = 1_000_000;

const benchmark = createBenchmark(baseline, cases, iterations);

module.exports = { benchmark, baseline };
