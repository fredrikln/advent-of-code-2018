package main

import (
	"testing"
)

func TestFrequency(t *testing.T) {
	tables := []struct {
		input  []string
		result int
	}{
		{[]string{"+1", "+1", "+1"}, 3},
		{[]string{"+1", "+1", "-2"}, 0},
		{[]string{"-1", "-2", "-3"}, -6},
	}

	for _, table := range tables {
		frequency := frequency(table.input)
		if frequency != table.result {
			t.Errorf("Frequency was incorrect, got: %d, want: %d.", frequency, table.result)
		}
	}
}

func TestRepeatedFrequency(t *testing.T) {
	tables := []struct {
		input  []string
		result int
	}{
		{[]string{"+1", "-1"}, 0},
		{[]string{"+3", "+3", "+4", "-2", "-4"}, 10},
		{[]string{"-6", "+3", "+8", "+5", "-6"}, 5},
		{[]string{"+7", "+7", "-2", "-7", "-4"}, 14},
	}

	for _, table := range tables {
		frequency := repeatedFrequency(table.input)
		if frequency != table.result {
			t.Errorf("Frequency was incorrect, got: %d, want: %d.", frequency, table.result)
		}
	}
}
