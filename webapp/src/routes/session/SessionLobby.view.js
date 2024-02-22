import m from 'mithril';
import Page from '../../models/Page.model.js';
import classNames from 'classnames';
import Button from "../../views/Button.view.js";
import Body from "../../views/layouts/BodyLayout.view.js";
import TitleBar from "../../views//TitleBar.view.js";
import manifestStore from "../../stores/Manifest.store.js";
import definitionStore from "../../stores/Definition.store.js";
import boardStore from "../../stores/Board.store.js";


export default new Page('/session/lobby', (initialVnode) => {
    const {loadScenarioManifestRegistry} = manifestStore;
    const {setActiveScenarioDefinition} = definitionStore;
    loadScenarioManifestRegistry().then(() => m.redraw());


    let selectedScenario = undefined;

    const handleSelectScenario = (manifest) => {
        selectedScenario = manifest;
    }

    const handleStartBattle = async (manifest) => {
        if (selectedScenario) {
            await setActiveScenarioDefinition(manifest);
            boardStore.resetBoard()
            m.route.set('/scenario');
        }
    }


    return {
        view: (vNode) => {
            const {manifestRegistryList} = manifestStore;

            return m(Body, [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m(TitleBar, 'Skirmish'),
                m('div', {className: 'text-center my-4'}, [
                    m('div', {className: 'relative inline-block w-[377px] h-[206px] mx-auto bg-background border-2 border-solid border-secondary-500 rounded-md'},
                        m('span', {className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}, 'No Preview'))
                ]),
                m('table', {className: 'w-full px-[10%] border-spacing-y-2 border-separate'}, [
                    m('tr', {className: 'text-left'}, [
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'}, 'Scenario'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'},'Factions'),
                        m('th', {className: 'border-b-2 border-solid border-secondary-500'},'Size')
                    ]),
                    manifestRegistryList.map(manifest => (
                      m('tr', {
                          className: classNames('cursor-pointer hover:bg-selected', {
                              'bg-selected': selectedScenario?.UUID === manifest.UUID
                          }),
                          onclick: () => {handleSelectScenario(manifest)}
                      }, [
                          m('td', manifest.name),
                          m('td', manifest.factions),
                          m('td', `${manifest.size?.rows} x ${manifest.size?.columns}`),
                      ])
                    ))
                ]),
                m('div', {className: 'absolute left-[5%] bottom-[5%]'},
                    m(Button, {
                        onclick: () => m.route.set('/session')
                    }, 'Back')
                ),
                m('div', {className: 'absolute right-[5%] bottom-[5%]'},
                    m(Button, {
                        onclick: () => {handleStartBattle(selectedScenario)},
                        disabled: !selectedScenario
                    }, 'Start')
                )
            ])
        }
    }
})