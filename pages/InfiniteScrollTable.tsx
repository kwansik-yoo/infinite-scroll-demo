import React, {useCallback, useEffect, useRef, useState} from 'react';

interface Props {
    callback: (data: string[]) => string[];
}



const InfiniteScrollTable = (props: Props) => {
    const { callback } = props;
    const [data, setData] = useState<string[]>([]);


    const loader = useRef(null);
    const loaderContainer = useRef(null);

    useEffect(() => {
        const _data: string[] = [];

        for (let idx=0; idx<30;idx++) {
            _data.push(`DATA_${idx}`);
        }
        setData(_data);

    },[]);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const target = entries[0];
        console.log('target,,,', target.isIntersecting, Math.floor(target.intersectionRatio)===1, target);
        if (target.isIntersecting) {
            loaderContainer.current.scrollTop -= 200;
            setData(prev => callback(prev));
            observer.disconnect();
        }
    }, [callback, loaderContainer]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: [0, 1]
        };

        if (loader.current && loaderContainer.current) {
            const observer = new IntersectionObserver(handleObserver, options);
            observer.observe(loader.current);
        }
    }, [handleObserver, data]);

    const [keyword, setKeyword] = useState<string>('');
    const [filterKeyword, setFilterKeyword] = useState<string>('');

    const foo = useCallback(() => {
        console.log('delay callback ...', keyword, filterKeyword);
    }, [keyword, filterKeyword]);
    useEffect(() => {
        const delayQuery = setTimeout(() => {
            console.log('delay query invoked...', keyword)
            setFilterKeyword(keyword)
            foo();
        },  3000);

        return () => {
            console.log('delay query removed...', keyword);
            clearTimeout(delayQuery);
        }
    }, [keyword])

    return (
        <div>
            <h1>InfiniteTable</h1>
            <input
                type={'text'}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            />

            <div ref={loaderContainer} style={{height: '300px', overflow: 'scroll'}}>
                <table id={'bar'} style={{width: '100%', border: '1px solid black'}}>
                    <th>
                        <td>Data</td>
                    </th>
                    <tbody>
                    {
                        data.filter(datum => datum.includes(filterKeyword)).map(datum => <tr key={datum}><td>{datum}</td></tr>)
                    }
                    <div style={{height: '100px'}} ref={loader}/>
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default InfiniteScrollTable;