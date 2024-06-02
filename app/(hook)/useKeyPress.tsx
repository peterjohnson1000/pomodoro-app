import { useState, useCallback, useEffect } from "react";
// useKeyPress

// input = pressed key
// output = function call based on the keypresses

// bugs
// i press "t" focuses on the input then if i enter "s" timer start/stops
// if i press "t" nothing is inputted

// one solu is that if i press t then no shortcut should work
// better instead of "s" and "t" lets use key combinations
// start/stop = space bar
// focus on task input = cmd + t

// i added space but now when i add space in task input timer s/s need to fix that
// changed the key of task input focus to ctrl+n

const useKeyPress = (callback: any, targetKey: any, minutes: any, modifierKey: any = null) => {


    const handleKeyPress = useCallback((event: any) => {
        // console.log(`Key pressed useKeyPress: ${event.key}`);
        if (event.key == targetKey && (!modifierKey || event[modifierKey])) {
            callback(event);
        }
    }, [minutes]);

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
}

export default useKeyPress; 