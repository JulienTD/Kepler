import React, {Component} from 'react';
import { Text } from "react-native";
import { ProviderContext } from './ProviderContext';
import Store from './store';

function createStoreInjector(
    grabStoresFn: any,
    component: any,
    injectNames: string,
    makeReactive: boolean
): any {
    // Support forward refs
    let Injector = React.forwardRef((props, ref) => {
        const newProps = { ...props }
        const context = React.useContext(ProviderContext)
        console.log(`context`);
        console.log(context);
        grabStoresFn(context, newProps);
        Object.assign(newProps, grabStoresFn(context || {}, newProps) || {})

        if (ref) {
            newProps.ref = ref
        }

        return React.createElement(component, newProps)
    })
    console.log(Injector);
    return Injector
}

function grabStoresByName(
    storeNames: Array<string>
): (baseStores: any, nextProps: React.Props<any>) => React.PropsWithRef<any> | undefined {
    return function(baseStores, nextProps) {
        console.log('basStores');
        console.log(baseStores);
        console.log('nextProps');
        console.log(nextProps);
        console.log('Stores!');
        console.log(Object.keys(storeNames));
        console.log(storeNames);
        storeNames.forEach((store) => {
            console.log(`Getting ${[store.name]}`);
            console.log(Object.keys(baseStores));
            console.log(baseStores[store.name]);
            console.log((store.name in Object.keys(baseStores)));
            const key = store.name;
            if (key in Object.keys(nextProps))
                return;
            if (!(baseStores[key]))
                return console.error(`${key} is missing from Booster Store`);
            nextProps[key] = baseStores[key];
        });
        return nextProps
    }
}

export function inject(/* fn(stores, nextProps) or ...storeNames */ ...storeNames: Array<any>) {
    console.log("Inject");
    console.log(storeNames);
    return (componentClass: React.ComponentClass<any, any>) =>
    createStoreInjector(
        grabStoresByName(storeNames),
        componentClass,
        storeNames.join("-"),
        false
    )
}

@inject(Store)
export default class Display extends Component {

    constructor(props) {
        super(props);
    }

    public render() {
        console.log(this.props);
        return <Text>Hello World</Text>;
    }
}