var logger = require('./lib/logger'),
    router = require('./lib/router'),
    rabbitmq = require('rabbit.js');

// wait until rabbitmq can accept connections, somehow
function doConnect(){

    try {
        var context = rabbitmq.createContext(
            'amqp://' + process.env.RABBITMQ_PORT_5672_TCP_ADDR + ':' + process.env.RABBITMQ_PORT_5672_TCP_PORT
        );

        context.on('ready', function() {

            logger.info('monitor: connected');

            // subscribe to events queues
            var sub = context.socket('SUB'),
                pub = context.socket('PUB');

            sub.connect('events', function () {

                // deal with facts as they come in
                sub.on('data', function (body) {
                    logger.info('monitor : ' + body);
                    router.newFact(pub, JSON.parse(body));
                });
            });
        });

    } catch (err){
        logger.error("caught error trying to connect to rabbitmq" + err);
        setTimeout(doConnect, 2000);
    }
}

// hack to wait till rabbitmq is up
setTimeout(doConnect, 12000);
