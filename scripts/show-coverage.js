const { error } = require("console");
const fs = require("fs");
const path = require("path");

const summaryPath = path.join(__dirname, "../coverage/coverage-summary.json");

let retries = 0;

function readCoverage() {
  try {
    if (fs.existsSync(summaryPath)) {
      delete require.cache[require.resolve(summaryPath)];

      const summaryContent = fs.readFileSync(summaryPath, "utf8");
      const summary = JSON.parse(summaryContent);

      const { lines, statements, functions, branches } = summary.total;
      const total = (
        (lines.pct + statements.pct + functions.pct + branches.pct) /
        4
      ).toFixed(2);

      console.log(
        "\n================================================================================",
      );
      console.log("Total Coverage: ", total + "%");
      console.log(
        "================================================================================\n",
      );
    } else if (retries < 10) {
      retries++;
      setTimeout(readCoverage, 100);
    } else {
      console.error("Coverage summary file not found after 10 retries");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error reading coverage: ", error.message);
    process.exit(1);
  }
}

readCoverage();
