#!/bin/bash

# Function to start the services
start_services() {
    echo "Starting backend..."
    cd backend
    npm install
    npm start &
    BACKEND_PID=$!
    cd ..

    echo "Starting frontend..."
    cd frontend
    npm install
    npm start &
    FRONTEND_PID=$!
    cd ..

    echo $BACKEND_PID > backend.pid
    echo $FRONTEND_PID > frontend.pid
}

# Function to stop the services
stop_services() {
    if [ -f backend.pid ] && [ -f frontend.pid ]; then
        BACKEND_PID=$(cat backend.pid)
        FRONTEND_PID=$(cat frontend.pid)

        echo "Stopping backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID

        echo "Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID

        rm backend.pid frontend.pid
    else
        echo "Service PIDs not found. Are the services running?"
    fi
}

# Main logic to handle 'start' and 'end' arguments
case "$1" in
    start)
        start_services
        ;;
    end)
        stop_services
        ;;
    *)
        echo "Usage: $0 {start|end}"
        exit 1
esac