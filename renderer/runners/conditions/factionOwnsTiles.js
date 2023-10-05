import Faction from "../../models/scenario/Faction.model.js";


export default ({faction, tiles}) => {
    if (faction instanceof Faction && Array.isArray(tiles)) {
        let isOwner = false;
        try {
            const check = tiles
                .map(tile => tile.occupied_by === faction ? 0 : 1)
                .reduce((sum, cv) => sum + cv, 0);
            isOwner = check === 0;
        } catch(err) { console.log(err) }

        return isOwner;
    }
}