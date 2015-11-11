([
    {
        shouldDeps : [
            { block : 'map-infowindow'},
            { block: 'link', mods: {type:['tel', 'email', 'web']} }
        ]
    },
    {
        tech: 'js',
        mustDeps: [
            { tech: 'bemhtml', block: 'i-bem' },
            { tech: 'bemhtml', block: 'link', mods: {type:['tel', 'email', 'web']} },
            { tech: 'bemhtml', block: 'map-infowindow'}
        ]
    }
])
