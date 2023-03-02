const Store=require("electron-store")

const storage=new Store();

function  getWinBounds(){
    const default_bounds=[1080, 1280]

    const size=storage.get("win-size");
    if (size) return size;
    else {
        storage.set("win-size", default_bounds);
        return default_bounds;
    }
}

function  getWinPosition(){
    const default_position=[0,0]

    const pos=storage.get("win-pos");
    if (pos) return pos;
    else {
        storage.set("win-pos", default_position);
        return default_position;
    }
}

function saveBounds(bounds){
    storage.set("win-size", bounds);
}

function savePosition(position){
    storage.set("win-pos", position);
}