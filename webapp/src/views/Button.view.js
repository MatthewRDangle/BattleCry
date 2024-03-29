import m from 'mithril';
import classNames from "classnames";


const Button = (initialVnode) => {


    return {
        view: (vNode) => {
            const {attrs} = vNode;

            return (
                m('button', {
                    className: classNames('pl-2 pr-2 pt-1 pb-1 border border-solid border-secondary rounded disabled:opacity-50', {
                        'text-font bg-secondary': !attrs.inverse,
                        'hover:text-font hover:bg-background': !attrs.disabled && !attrs.inverse,
                        'text-font bg-background': !!attrs.inverse,
                        'hover:text-font hover:bg-secondary': !attrs.disabled && !!attrs.inverse,
                        'shadow-md shadow-background-500/75': !!attrs.shadow
                    }),
                    type: attrs.button ?? 'button',
                    onclick: attrs.onclick ?? undefined,
                    disabled: attrs.disabled ?? false
                }, vNode.children)
            )
        }
    }
}

export default Button;