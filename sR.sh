#!/bin/bash
echo "terminating obsolete procedure.."

back=4000
front=3000
redis=6379

for val in $back $front $redis
do
    port=$val

    pid=$(lsof -ti :$port)

    echo "pid : $pid"
    if [ ! -z "$pid" ]
    then
        kill $pid
        echo "Process with PID $pid terminated."
    else
        echo "No process found using port $port."
    fi
done

sleep 2

echo "ports initialized.."

echo "server run.."

if [ $1 == "ba" ]
then 
    cd back
    npm run start
elif [ $1 == "fr" ]
then
    cd front
    npm start
else

    sudo service redis-server start &
    # redis-server &

    cd back
    npm run start &

    cd ..

    cd front
    npm start

fi