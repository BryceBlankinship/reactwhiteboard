/**

Going to do this in NodeJS instead as it'll be a lot easier to work with json data and submit it directly into RedisJSON
instead of having to convert back and forth between JSON and BSON

Keeping this here since it is a functional rest api that basically does what it needs to besides data persistence.

*/

package main

import (
	"encoding/json"
	"log"
	"net/http"

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
	params := mux.Vars(r)
	var position Position
	_ = json.NewDecoder(r.Body).Decode(&position)
	position.ID = params["id"]
	positions = append(positions, position)
	json.NewEncoder(w).Encode(position)
}

func updatePosition(w http.ResponseWriter, r *http.Request) {
	deletePosition(w, r)

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

func connectRedis() {
	//QVvD59rYKodz3vANDk8gOK2O3aCCXYZ4
	//redis-11988.c89.us-east-1-3.ec2.cloud.redislabs.com:11988
}

func main() {
	// init router
	router := mux.NewRouter()

	// Mock data
	positions = append(positions, Position{ID: "1", PositionX: "300", PositionY: "400"})
	positions = append(positions, Position{ID: "2", PositionX: "500", PositionY: "200"})
	positions = append(positions, Position{ID: "3", PositionX: "150", PositionY: "500"})

	// router handlers/endpoints
	router.HandleFunc("/api/positions/", getPositions).Methods("GET")
	router.HandleFunc("/api/positions/{id}", getPosition).Methods("GET")
	router.HandleFunc("/api/positions/{id}", createPosition).Methods("POST")
	router.HandleFunc("/api/positions/{id}", updatePosition).Methods("PUT")
	router.HandleFunc("/api/positions/{id}", deletePosition).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", router))

}
