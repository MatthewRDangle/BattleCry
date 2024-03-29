import m from 'mithril';
import LoadingSymbol from "./LoadingSymbol.view.js";


const LoadingStatus = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;


            return m('div', attrs, [
                m(LoadingSymbol, {className: 'inline-block mr-4'}),
                m('span', {className: 'w-5 text-center'}, 'Loading'),
                m(LoadingSymbol, {className: 'inline-block ml-4'}),
            ])
        }
    }
}

export default LoadingStatus;