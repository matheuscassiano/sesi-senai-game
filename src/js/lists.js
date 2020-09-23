const shelfItems = [
    { id: 0, img: 'src/assets/img/items/01.svg', healthy: true },
    { id: 1, img: 'src/assets/img/items/02.svg', healthy: false },
    { id: 2, img: 'src/assets/img/items/03.svg', healthy: false },
    { id: 3, img: 'src/assets/img/items/04.svg', healthy: true },
    { id: 4, img: 'src/assets/img/items/05.svg', healthy: true },
    { id: 5, img: 'src/assets/img/items/06.svg', healthy: false },
];

const emojiLIst = [
    { img: 'src/assets/img/emojis/P01.png', choices: ['Confeitaria','Informática'], response: 'Confeitaria' },
    { img: 'src/assets/img/emojis/P02.png', choices: ['Mecânica','Moda e Vestuário'], response: 'Moda e Vestuário' },
    { img: 'src/assets/img/emojis/P03.png', choices: ['Mecânica','Informática'], response: 'Informática' },
    { img: 'src/assets/img/emojis/P04.png', choices: ['Informática','Mecânica'], response: 'Mecânica' },
    { img: 'src/assets/img/emojis/P05.png', choices: ['Petróleo e Gás','Confeitaria'], response: 'Petróleo e Gás' },
];

const questionList = [
    { question: 'CAFÉ FAZ MAL À SAÚDE?', choices: ['Mito','É verdade'], response: 'Mito' },
    { question: 'FICAR SEM COMER EMAGRECE?', choices: ['Mito','É verdade'], response: 'Mito' },
    { question: 'EXISTEM ALIMENTOS COM FUNÇÕES ESPECÍFICAS PARA PERDA DE PESO?', choices: ['Mito','É verdade'], response: 'Mito' },
    { question: 'O OVO AUMENTA O COLESTEROL?', choices: ['Mito','É verdade'], response: 'Mito' },
];

const characterList = [
    { img: 'src/assets/img/characters/CH01.png', choices: ['Confeitaria','PETRÓLEO E GÁS'], response: 'Confeitaria' },
    { img: 'src/assets/img/characters/CH02.png', choices: ['PETRÓLEO E GÁS','MODA E VESTUÁRIO'], response: 'MODA E VESTUÁRIO' },
    { img: 'src/assets/img/characters/CH03.png', choices: ['ELETRICISTA','MODA E VESTUÁRIO'], response: 'ELETRICISTA' },
    { img: 'src/assets/img/characters/CH04.png', choices: ['MEIO AMBIENTE','Mecânica'], response: 'Mecânica' },
];

export { shelfItems, emojiLIst, questionList, characterList };