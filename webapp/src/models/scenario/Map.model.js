import ScenarioDefinitionStore from "../../stores/Definition.store.js";

export default class Map {
    name = undefined;
    src = undefined;
    alt = undefined;

    constructor(definition) {
        if (!definition) return

        this.name = definition.name;
        this.src = definition.src;
        this.alt = definition.alt;
    }

    get activeScenario() {
        return ScenarioDefinitionStore.activeScenarioDefinition;
    }
}