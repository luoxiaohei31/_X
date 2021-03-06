﻿//Main object _X
function _X (itemName, itemType){
    var item = (itemName && itemType) ? getItem(itemName, itemType) : ((typeof itemName == "string")? getItem(itemName): null);
    var _clone = new __X();
    if(!itemName) return _clone;

    function getItem(iName, iType){
        if((itemName && itemType) && typeof iName == "string" ){
            for (var i = 1; i <= app.project.numItems; i++) {
                if (app.project.item(i).name == iName && app.project.item(i) instanceof iType ) {
                    return app.project.item(i);
                } else if (app.project.item(i) instanceof CompItem) {
                    for (var j = 1; j <= app.project.item(i).layers.length; j++) {
                        if (app.project.item(i).layer(j).name == iName && app.project.item(i).layer(j) instanceof iType) {
                            return app.project.item(i).layer(j);
                        }
                    } 
                }
            }
        } else if(typeof iName == "string" ){
            for (var i = 1; i <= app.project.numItems; i++) {
                if (app.project.item(i).name == iName) {
                    return app.project.item(i);
                }else if (app.project.item(i) instanceof CompItem) {
                    for (var j = 1; j <= app.project.item(i).layers.length; j++) {
                        if (app.project.item(i).layer(j).name == iName) {
                            return app.project.item(i).layer(j);
                        }
                    }
                }
                
            }
        }
    };

    if(typeof itemName == 'object' || typeof itemName == 'array'){item = itemName;};
    if(item){
        for(var j in _clone){
             item[j] = _clone[j];

        }
        return item;
    }else{
        return _clone; //returns object of matching items
    }
}

//Define private superclass
function __X(){}

//For CompItems
__X.prototype.getLayer = function (layerName) {
    if (this instanceof CompItem) {
            for (var j = 1; j <= this.layers.length; j++) {
                if (this.layer(j).name == layerName) {
                    return this.layer(j);
                }
            }
        }
    return this.layer(j);
};
__X.prototype.hasLayer = function(layerName) {
    if (this instanceof CompItem) {
        for (var j = 1; j <= this.layers.length; j++) {
            if (this.layer(j).name == layerName) {
                return true;
            } else {
                return false;
            }
        } 
    } 
    return false;
};
__X.prototype.changeName = function(newName){};

//For FolderItems
__X.prototype.childFolder = function(name){
        if(this.typeName != 'Folder') return;
        var _childFolders = new Object;
            if(!name){
                   for(var i = 1; i <= this.numItems; i++){
                        _childFolders[this.item(i).name] =this.item(i);
                   }
               return _childFolders;
            }
        var _childFolder = app.project.items.addFolder(name);
        alert(this);
        _childFolder.parentFolder = this;
    return _childFolder;
};
//Utilities
__X.prototype.exists = function (itemType) {
    //item type is optional arg
    var itemFound = false;
        if(this.typeName == itemType){
          itemFound = true;
        }
    return itemFound;
};
__X.prototype.each = function(fn, collection) {
    var context = collection ? collection : this;
    if (typeof context == 'object') {
        for (var c in context) {
            fn.call(context, context[c], c, context);
        }
    }
    if (typeof context == 'array') {
        for (var i = 0; i < context.length; i++) {
            fn.call(context, context[i], context);
        }
    }
    return context;
};
//Http tools
__X.prototype.http = function(url, success){
  //
};

//Child Process
__X.prototype.cmd = function(strCommand){
    var tempFolder = Folder.temp;
    var batchFile = new File(tempFolder.fsName + guid() + ".bat"); //temp file name

    if (batchFile != null) {
        batchFile.open("w");
        batchFile.write(strCommand);
        batchFile.changePath(batchFile);
        batchFile.close();
    }

    //run this batch file to open the URL in browser
    batchFile.execute();
}

    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                   s4() + '-' + s4() + s4() + s4();
        };
    });
};

//Debugging tools
__X.prototype.alertName = function(i){
    alert(this.name);
    return this;
};
__X.prototype.assert = function (condition, msg) {
    alert(msg, (condition ? "pass" : "fail"));
};

__X.prototype.findError = function(codeblock) {
    try {
        eval(codeblock);
    } catch (e) {

    }
};
