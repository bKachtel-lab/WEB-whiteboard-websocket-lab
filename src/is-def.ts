/** 
 * Vérifie si une propriété est définie.
 */
export default (prop: unknown): boolean => {
    return typeof prop !== 'undefined';
}
