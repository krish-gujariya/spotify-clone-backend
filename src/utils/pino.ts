import pino, { destination } from "pino";

const logger =pino({
    transport:{
        targets:[
            {   target:"pino-pretty",
                options:{
                    colorize:true,
                    destination:"logs.log"
                }

            },{
                target:"pino-pretty",
                options:{}
            }

        ]

        
    }
})


export {logger}