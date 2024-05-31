'use client'

import { useCallback, useEffect } from 'react';

export default function App() {

    const handleKeyPress = useCallback((event: any) => {
        console.log(`Key pressed: ${event.key}`);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };


        // this useEffect hook is called only once that is during the initial 
        // render(which means no matter what useEffect will be called during the inital render).
        // the keydown even is mapped with handleKeyPress function and is stored in the browsers internal list of events
        // whenever a respective event occurs the corresponding fuctions mapped to that event will be called.
        // since handleKeyPress is memoized this useEffect won't be called again.
        // just before the component is about to be unmounted the cleanup function is called which is executes removeEventListener

    }, [handleKeyPress]);

    return (
        <div>
            <h1>Hello world</h1>
        </div>
    );
}