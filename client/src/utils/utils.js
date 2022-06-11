export function capitalizeLetter(string){
    let stringMayus = string[0].toUpperCase()       
    for(var i = 1; i < string.length; i++){
        stringMayus = stringMayus + string[i]
    }
    return stringMayus
}
