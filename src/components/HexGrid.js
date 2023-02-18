const m = require("mithril");

import HexTile from "./templates/HexTile.js";
import ScenarioDefinitionStore from "../stores/ScenarioDefinition.store.js";


const HexGrid = (initialVnode) => {
    const hexSize = 200;
    const hexMargin = 1;
    const rowEvenOffset = hexSize / 2 + hexMargin;


    return {
        view: (vNode) => {
            const {activeScenarioDefinition} = ScenarioDefinitionStore;
            const {attrs} = vNode;
            const grid = attrs.grid || [];
            const columns = activeScenarioDefinition.columns;
            const width = hexSize * columns + hexSize / 2 + hexMargin * 2 * columns;

            return (
                m('div', {className: 'flex flex-wrap', style: `width: ${width}px;`}, [
                    grid.map((row, idx) => {
                        return m('div', {
                            className: 'flex-none text-none min-w-full',
                            style: (() => !(idx % 2) && {
                                'margin-left': `${rowEvenOffset}px`
                            })()
                        }, Object.values(row).map((tile) => {
                            return m(HexTile, {hex: tile, size: hexSize, margin: hexMargin})
                        }))
                    })
                ])
            )
        }
    }
}

export default HexGrid;