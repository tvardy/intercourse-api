const hasBackets = (input: string): boolean => /(\(+|\)+)/.test(input)

/**
 * Takes Express-like route string and decodes it
 * into simplier Polka-compliant routes
 * 
 * @param input - Express route string
 * @returns array of simplified string routes
 */
 export const stripRoute = (input: string): string[] => {
    if (hasBackets(input)) {
        // remove initial `:i` parameter
        input = input.replace(/^\/:\w+/, '')

        // remove outer parenthesis
        input = input.replace(/^\(/, '').replace(/\)$/, '')

        let arr: string[] = []

        if (hasBackets(input)) {
            // remove additional characters
            input = input.replace(/[?]/g, '')

            // 1st level split by `|`
            arr = input.split(/(?<![(]\w+)\|(?!\w+[)])/)
            
            arr = arr.map(str => {
                // 2nd level split by `|`, `(` or `)`
                let _arr = str.split(/[(|)]/g).filter(Boolean)

                if (_arr.length === 2) {
                    // combine into 2 words
                    _arr = _arr.reduce((acc: string[], next: string) => {
                        acc.push(acc + next)
                        return acc
                    }, [])
                } else {
                    // combine into words with the same postfix of `_last`
                    const _length = _arr.length - 1
                    const _last = _arr[_length]

                    _arr = _arr.reduceRight((acc: string[], next: string, i: number) => {
                        if (i < _length) {
                            acc.push(next + _last)
                        }
                        return acc
                    }, [])
                }
                
                return _arr
            }).flat()
        } else {
            // split into simple elements
            arr = input.split('|')
        }

        
        // add `/` to the beginning of each string
        arr = arr.map(str => '/' + str)

        return arr
    }

    return [ input ]
}