/**
 * @author Yoann Pigné <yoann.pigne@univ-lehavre.fr>
 * 
 * Génère des noms avec adjectifs aléatoires dans le style des noms de distributions Ubuntu.
 */

const nouns: string[] = [
    'Circle', 'Cone', 'Cylinder', 'Ellipse', 'Hexagon', 'Irregular Shape', 'Octagon', 'Oval', 
    'Parallelogram', 'Pentagon', 'Pyramid', 'Rectangle', 'Semicircle', 'Sphere', 'Square', 
    'Star', 'Trapezoid', 'Triangle', 'Wedge', 'Whorl'
];

const adjectives: string[] = [
    'Amusing', 'Athletic', 'Beautiful', 'Brave', 'Careless', 'Clever', 'Crafty', 'Creative', 
    'Cute', 'Dependable', 'Energetic', 'Famous', 'Friendly', 'Graceful', 'Helpful', 'Humble', 
    'Inconsiderate', 'Likable', 'Middle Class', 'Outgoing', 'Poor', 'Practical', 'Rich', 'Sad', 
    'Skinny', 'Successful', 'Thin', 'Ugly', 'Wealth'
];

// Fonction principale pour générer un nom aléatoire
export default (random: () => number = Math.random): string => {
    // On choisit un adjectif et un nom aléatoires
    const adjective = adjectives[Math.floor(random() * adjectives.length)];
    const noun = nouns[Math.floor(random() * nouns.length)];
    
    return `${adjective} ${noun}`;
};
