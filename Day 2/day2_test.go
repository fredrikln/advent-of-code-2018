package main

import (
	"reflect"
	"testing"
)

func TestOccurences(t *testing.T) {
	tables := []struct {
		input  string
		result map[string]int
	}{
		{"abcdef", map[string]int{"a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 1}},
		{"bababc", map[string]int{"a": 2, "b": 3, "c": 1}},
		{"abbcde", map[string]int{"a": 1, "b": 2, "c": 1, "d": 1, "e": 1}},
		{"abcccd", map[string]int{"a": 1, "b": 1, "c": 3, "d": 1}},
		{"aabcdd", map[string]int{"a": 2, "b": 1, "c": 1, "d": 2}},
		{"abcdee", map[string]int{"a": 1, "b": 1, "c": 1, "d": 1, "e": 2}},
		{"ababab", map[string]int{"a": 3, "b": 3}},
	}

	for _, table := range tables {
		result := countOccurrences(table.input)
		if !reflect.DeepEqual(result, table.result) {
			t.Errorf("Count was incorrect, got: %v, want: %v.", result, table.result)
		}
	}
}

func TestContains(t *testing.T) {
	tables := []struct {
		input string
		two   bool
		three bool
	}{
		{"abcdef", false, false},
		{"bababc", true, true},
		{"abbcde", true, false},
		{"abcccd", false, true},
		{"aabcdd", true, false},
		{"abcdee", true, false},
		{"ababab", false, true},
	}

	for _, table := range tables {
		two, three := contains(countOccurrences(table.input))
		if two != table.two || three != table.three {
			t.Errorf("Count was incorrect (%v), got: %v,%v, want: %v,%v.", table.input, two, three, table.two, table.three)
		}
	}
}

func TestChecksum(t *testing.T) {
	tables := []struct {
		input  []string
		result int
	}{
		{[]string{"abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"}, 12},
	}

	for _, table := range tables {
		checksum := getChecksum(table.input)
		if checksum != table.result {
			t.Errorf("Checksum was incorrect got: %v, want: %v.", checksum, table.result)
		}
	}
}

func TestSimilarStrings(t *testing.T) {
	tables := []struct {
		input    []string
		similar1 string
		similar2 string
	}{
		{[]string{"abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"}, "fghij", "fguij"},
	}

	for _, table := range tables {
		similar1, similar2 := similarStrings(table.input)
		if similar1 != table.similar1 || similar2 != table.similar2 {
			t.Errorf("Common was incorrect got: %v, %v, want: %v, %v.", similar1, similar2, table.similar1, table.similar2)
		}
	}
}

func TestCommonLetters(t *testing.T) {
	tables := []struct {
		input1 string
		input2 string
		result string
	}{
		{"fghij", "fguij", "fgij"},
	}

	for _, table := range tables {
		common := commonLetters(table.input1, table.input2)
		if common != table.result {
			t.Errorf("Common was incorrect got: %v, want: %v.", common, table.result)
		}
	}
}
