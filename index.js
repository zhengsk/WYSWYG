
var Command = {

    exec: function(command, args=false){
        if(this.getSelection){
            // document.execCommand('StyleWithCSS', false, false);
            document.execCommand("styleWithCSS", true, null);
            document.execCommand(command, false, args);
        }
    },

    getSelection: function() {
        var selection = null;
        // if(document.activeElement === document.getElementById('editorContent')){
            selection = document.getSelection();
        // }
        return selection
    },

    bold: function(){
        this.exec('bold');
    },
    italic: function(){
        this.exec('italic');
    },
    underline: function(){
        this.exec('underline');
    },
    foreColor: function(args){
        this.exec('foreColor', args);
    },
    fontSize: function(args){
        this.exec('fontSize', '7');

        // Clear element fontSize
        var clearFontSize = function(ele){
            if(ele.nodeType === 1){
                ele.style.removeProperty('font-size');
                var children = ele.childNodes;
                [].concat(children).forEach(function(i){
                    clearFontSize(children);
                });
            }
        }

        var selection = this.getSelection();

        var firstEle = selection.anchorNode;
        if(firstEle.nodeType === 3){firstEle = firstEle.parentNode}

        var lastEle = selection.focusNode;

        do{
            if(firstEle.nodeType === 1){

                clearFontSize(firstEle);
                firstEle.style.fontSize = args;

            }else if(firstEle.nodeType === 3){

                firstEle.parentNode.style.fontSize = args;
            }

            if(firstEle === lastEle.parentNode){return};

            firstEle = firstEle.nextSibling;
            while(firstEle && firstEle.nodeType === 3){
                firstEle = firstEle.nextSibling;
            }

        }while(firstEle && firstEle !== lastEle)

        // this.exec('fontSize', args);
    }


}


var buttons = document.getElementById('toolBar').getElementsByTagName('button');

for(var i = 0, j = buttons.length; i < j; i++){
    buttons[i].addEventListener('click', function(e){
        var cmd = this.getAttribute('cmd');
        var args = this.getAttribute('cmd-args');
        if(cmd && Command[cmd]){
            Command[cmd](args);
        }
    }, false);
}

