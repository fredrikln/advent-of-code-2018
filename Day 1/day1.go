package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func frequency(input []string) int {
	result := 0

	for i := 0; i < len(input); i++ {
		val, _ := strconv.Atoi(input[i])
		result += val
	}

	return result
}

func repeatedFrequency(input []string) int {
	frequency := 0
	used := map[int]bool{
		0: true,
	}

	for true {
		for i := 0; i < len(input); i++ {
			val, _ := strconv.Atoi(input[i])
			frequency += val

			if used[frequency] {
				return frequency
			}

			used[frequency] = true
		}
	}

	return 0
}

func readLines(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines, scanner.Err()
}

func main() {
	input, _ := readLines("input.txt")
	fmt.Println(frequency(input))
	fmt.Println(repeatedFrequency(input))
}
