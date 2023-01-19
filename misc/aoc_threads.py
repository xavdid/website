"""
A script to read the Advent of Code threads
Takes as input the path to a text file with the markdown source from
https://www.reddit.com/r/adventofcode/wiki/solution_megathreads

% python misc/aoc_threads.py 2022 ~/Desktop/aoc.txt
"""

import sys
import re


def main():
    if len(sys.argv) != 3:
        raise ValueError(
            "Supply the year, followed by a path to a text file with reddit markdown output"
        )

    year, fpath = sys.argv[1:]

    if len(year) != 4 or not year.isdigit():
        raise ValueError(f'"{year}" is not a 4 digit year')

    with open(fpath, encoding="utf-8") as f:
        s = f.read()
        result = ["", f"# {year}"]
        links = re.findall(r"\[(\d+)\]\(.*?\/comments\/(.*?)\)", s)
        if not links:
            raise ValueError("no links found")

        for day, slug in links:
            result.append(f"/aoc/{year}/{day} https://redd.it/{slug}")
        print("\n".join(result))


if __name__ == "__main__":
    main()
