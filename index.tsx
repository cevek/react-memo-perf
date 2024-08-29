import React from 'react';
import {render, flushSync} from 'react-dom';
const list = Array.from({length: 500000}, (v, i) => i);

function AppMemo() {
    const [, update] = React.useReducer((v: number) => v + 1, 0);
    React.useEffect(() => {
        setInterval(() => {
            console.time('memo');
            update();
            flushSync();
            console.timeEnd('memo');
        }, 500);
    }, []);
    return (
        <div>
            {list.map((v) => (
                <SubMemo key={v} />
            ))}
        </div>
    );
}
function AppNoMemo() {
    const [, update] = React.useReducer((v: number) => v + 1, 0);
    React.useEffect(() => {
        setInterval(() => {
            console.time('nomemo');
            update();
            flushSync();
            console.timeEnd('nomemo');
        }, 500);
    }, []);
    return (
        <div>
            {list.map((v) => (
                <Sub key={v} />
            ))}
        </div>
    );
}

function App() {
    return (
        <div>
            <AppNoMemo />
            <AppMemo />
        </div>
    );
}

function Sub() {
    return <div>1</div>;
}

const SubMemo = React.memo(function SubMemo() {
    return <div>1</div>;
});

const domNode = document.getElementById('root');
render(<App />, domNode);
