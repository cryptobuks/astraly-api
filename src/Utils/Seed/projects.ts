export const rounds = [
    {
        title: 'Ticket Claim',
        description: 'You can claim your ticket.',
        startDate: new Date(1655740800 * 1000),
        endDate: new Date(1655913600 * 1000),
    },
    {
        title: 'Allocation',
        description: 'You can burn your ticket for allocations.',
        startDate: new Date(1655913600 * 1000),
        endDate: new Date(1656086400 * 1000),
    },
    {
        title: 'Purchase',
        description: 'You can invest in the IDO.',
        startDate: new Date(1656086401 * 1000),
        endDate: new Date(1656259200 * 1000),
    },
    {
        title: 'Distribution',
        description: 'The tokens are gradually sent to your wallet.',
        startDate: new Date(1656345600 * 1000),
        endDate: new Date(1656864000 * 1000),
    },
]

export const projects = [
    {
        idoId: 0,
        name: 'Demo Project',
        description:
            'This project is a placeholder. Once Astraly is live on mainnet, you’ll be able to discover and invest in real projects building on StarkNet.',
        ticker: 'ASTR',
        logo: 'https://testnet.astraly.xyz/images/logo_black_bg.png',
        cover: 'https://testnet.astraly.xyz/images/home/builders.png',
        totalRaise: 1000,
        tokenPrice: 0.1,
        maxAllocation: 500,
        currentRoundIndex: 2,
        type: 'IDO',
        categories: ['DeFi', 'DEX'],
        rounds,
    },
    {
        idoId: 1,
        name: 'testing',
        description:
            'This project is a placeholder. Once Astraly is live on mainnet, you’ll be able to discover and invest in real projects building on StarkNet.',
        ticker: 'ASTR',
        logo: 'https://testnet.astraly.xyz/images/logo_black_bg.png',
        cover: 'https://testnet.astraly.xyz/images/home/builders.png',
        totalRaise: 1000,
        tokenPrice: 0.1,
        maxAllocation: 500,
        currentRoundIndex: 2,
        type: 'IDO',
        categories: ['DeFi', 'DEX'],
        rounds,
    },
    {
        idoId: 2,
        name: 'search',
        description:
            'This project is a placeholder. Once Astraly is live on mainnet, you’ll be able to discover and invest in real projects building on StarkNet.',
        ticker: 'ASTR',
        logo: 'https://testnet.astraly.xyz/images/logo_black_bg.png',
        cover: 'https://testnet.astraly.xyz/images/home/builders.png',
        totalRaise: 1000,
        tokenPrice: 0.1,
        maxAllocation: 500,
        currentRoundIndex: 2,
        type: 'IDO',
        categories: ['DeFi', 'DEX'],
        rounds,
    },
]
