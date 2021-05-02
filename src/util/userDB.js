let userInfo = new Map()

let user = {
    setItem(key, value){
        userInfo.set(key, value);
    },
    getItem(key){
        return userInfo.get(key);
    },
    clear(){
        userInfo.clear();
    }
}
export default user