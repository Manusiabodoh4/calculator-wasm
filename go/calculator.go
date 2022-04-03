package main

import "fmt"

var arr []int

func main() {
	fmt.Println("Start Compile")
}

//export push
func push(x int) bool {
	arr = append(arr, x)
	return true
}

//export getLeng
func getLeng() int {
	return len(arr)
}

//export add
func add(x, y int) int {
	return x + y
}

//export multi
func multi(x, y int) int {
	return x * y
}
