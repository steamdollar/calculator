#!/bin/bash
echo "terminating obsolete procedure.."

back=4000
front=3000

for val in $back $front 
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

echo "ports initialized.."

echo "server run.."

cd back
npm run dev &

cd ..

cd front
npm start
