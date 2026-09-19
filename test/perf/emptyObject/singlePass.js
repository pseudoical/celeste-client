// @ts-check

const { benchmark } = require("../emptyObject.js");

/**
 * @typedef {import("../emptyObject.js").MockSwapFiles} MockSwapFiles
 */

/**
 * @param {MockSwapFiles} swapFiles
 * @returns {boolean}
 */
function singlePass(swapFiles) {
    for (const _ in swapFiles) {
        return false;
    }
    return true;
}

benchmark(singlePass);
