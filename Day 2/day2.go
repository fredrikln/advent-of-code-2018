package main

import (
	"bufio"
	"fmt"
	"os"
)

func countOccurrences(input string) map[string]int {
	result := map[string]int{}

	for _, char := range input {
		result[string(char)]++
	}

	return result
}

func showResult(input []string) {
	for i := 0; i < len(input); i++ {
		result := countOccurrences(input[i])
		fmt.Println(input[i], result)
	}
}

func contains(input map[string]int) (bool, bool) {
	containsExacltyTwo := false
	containsExactlyThree := false

	for _, count := range input {
		if count == 2 {
			containsExacltyTwo = true
		}
		if count == 3 {
			containsExactlyThree = true
		}
	}

	return containsExacltyTwo, containsExactlyThree
}

func getChecksum(input []string) int {
	twos := 0
	threes := 0
	for i := 0; i < len(input); i++ {
		two, three := contains(countOccurrences(input[i]))

		if two {
			twos++
		}
		if three {
			threes++
		}
	}

	return twos * threes
}

func similarStrings(input []string) (string, string) {
	for i := 0; i < len(input); i++ {
		for j := 0; j < len(input); j++ {
			diffLetters := 0

			for index := range input[i] {
				if input[i][index] != input[j][index] {
					diffLetters++
				}
			}

			if diffLetters == 1 {
				return input[i], input[j]
			}
		}
	}
	return "a", "b"
}

func commonLetters(input1 string, input2 string) string {
	output := []byte{}

	for i := range input1 {
		if input1[i] == input2[i] {
			output = append(output, input1[i])
		}
	}

	return string(output)
}

func readInput() ([]string, error) {
	var lines []string
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	return lines, scanner.Err()
}

func main() {
	input, _ := readInput()
	fmt.Println(getChecksum(input))

	similar1, similar2 := similarStrings(input)
	fmt.Println(commonLetters(similar1, similar2))
}
