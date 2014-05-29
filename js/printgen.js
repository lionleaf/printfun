var printfile = [];

var dir = 1;


//Initial move:
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
            "feedrate" : 100,
            "x" : -80,
            "y" : -80.0,
            "z" : 0.0
        },
        "tags" : [ "Travel move" ]
    }
} 

dir *= -1; 
printfile.push(movecmd);



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
                    "feedrate" : 20.0 + 10.0*i,
                    "x" : dir*80,
                    "y" : dir*80,
                    "z" : 0.0
                },
                "tags" : [ "Travel move" ]
            }
        } 

        dir *= -1; 
        printfile.push(movecmd);
}


console.log(JSON.stringify(printfile, null, 2));

