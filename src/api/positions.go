package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// position struct
type Position struct {
	ID        string `json:"id"`
	PositionX string `json:"positionX"`
	PositionY string `json:"positionY"`
}

// positions var as a slice Position struct
var positions []Position

func getPositions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(positions)
}

func getPosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Get params
	// Loop through positions and find by id
	for _, item := range positions {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Position{})
}

func createPosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var position Position
	_ = json.NewDecoder(r.Body).Decode(&position)
	position.ID = strconv.Itoa(rand.Intn(10000000)) // not safe Mock ID
	positions = append(positions, position)
	json.NewEncoder(w).Encode(position)
}

func updatePosition(w http.ResponseWriter, r *http.Request) {
	deletePosition(w, r)
	createPosition(w, r)
}

func deletePosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range positions {
		if item.ID == params["id"] {
			positions = append(positions[:index], positions[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(positions)
}

func main() {
	// init router
	router := mux.NewRouter()

	// Mock data
	positions = append(positions, Position{ID: "1", PositionX: "300", PositionY: "400"})
	positions = append(positions, Position{ID: "2", PositionX: "500", PositionY: "200"})
	positions = append(positions, Position{ID: "3", PositionX: "150", PositionY: "500"})

	// router handlers/endpoints
	router.HandleFunc("/api/positions", getPositions).Methods("GET")
	router.HandleFunc("/api/positions/{id}", getPosition).Methods("GET")
	router.HandleFunc("/api/positions", createPosition).Methods("POST")
	router.HandleFunc("/api/positions/{id}", updatePosition).Methods("PUT")
	router.HandleFunc("/api/positions/{id}", deletePosition).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", router))
}
