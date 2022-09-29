import {useCallback, useEffect, useRef, useState} from "react";

const useInfiniteScroll = (callback?: Function) => {
    const loader = useRef(null);
    const [_callback, set_Callback] = useState(callback);

    const setCallback = (cb: Function) => {
        set_Callback(cb);
        // console.log(cb);
    };
    // const setCallback = (d: any) => {
    //
    // };


    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && _callback) {
            _callback();
        }
    }, [_callback]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        console.log(loader);
        if (loader.current) {
            const observer = new IntersectionObserver(handleObserver, options);
            observer.observe(loader.current);
        }
    }, [handleObserver]);

    return [loader, setCallback];
}

export default useInfiniteScroll;