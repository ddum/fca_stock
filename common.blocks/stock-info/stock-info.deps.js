([
    {
        shouldDeps : [
            { block : 'stock-table'},
            { block : 'stock-disclaimer'},
            { block: 'link', mods: {type:['tel', 'email', 'web']} }
        ]
    },
    {
        tech: 'js',
        mustDeps: [
            { tech: 'bemhtml', block: 'i-bem' },
            { tech: 'bemhtml', block: 'stock-table' },
            { tech: 'bemhtml', block: 'link', mods: {type:['tel', 'email', 'web']} }
        ]
    }
])
