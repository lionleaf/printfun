var printfile = [];


for(var i = 0; i < 15; i++){
    var movecmd ={
        "command" : 
        {
            "function" : "move",
            "metadata" : 
            {
                "relative" : 
                {
                    "a" : false,
                    "x" : false,
                    "y" : false,
                    "z" : false
                }
            },
            "parameters" : 
            {
                "a" : 0.0,
                "feedrate" : 10.0 + 10.0*i,
                "x" : -75.0 + 10 * i,
                "y" : 0.0,
                "z" : 0.0
            },
            "tags" : [ "Travel move" ]
        }
    } 

    printfile.push(movecmd);
}


console.log(JSON.stringify(printfile, null, 2));

