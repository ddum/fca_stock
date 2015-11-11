([
    {
        shouldDeps : [
            { block : 'stock-table'},
            { block: 'link', mods: {type:['tel', 'email', 'web']} }
        ]
    },
    {
        tech: 'js',
        mustDeps: [
            { tech: 'bemhtml', block: 'i-bem' },
            { tech: 'bemhtml', block: 'link', mods: {type:['tel', 'email', 'web']} },
            { tech: 'bemhtml', block: 'stock-table' }
        ]
    }
])
