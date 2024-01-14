import Nightmare from "nightmare";
import HTMLParser from "node-html-parser";
import { ResultType } from "src/types/result";
const inputSelector = "input[type=text]";
const SubmitSelector = "input[type=submit]";


export async function ScrapeResult(rollNo: string): Promise<ResultType> {
    const {
        url,
        branch,
        batch,
        programme
    } = getInfo(rollNo)

    console.log(rollNo, url, branch, batch, programme)
    return new Promise(async (resolve, reject) => {
        try {
            console.log("evaluating")
            const nightmare = new Nightmare();

            await nightmare.goto(url)
                .type(inputSelector, rollNo)
                .click(SubmitSelector)
                .wait("#page-wrap")
                .evaluate(() => {
                    console.log("evaluating")
                    console.log(document.querySelector("#page-wrap"))
                    //  if status code is not 200 then return null
                    if (!document.querySelector("#page-wrap")) {
                        console.log("Invalid Roll No");
                        return null;
                    }

                    return document.querySelector("#page-wrap")?.innerHTML;
                })
                .end()
                .then((result: string | null) => {
                    if (result === null) {
                        console.log("Invalid Roll No");
                        reject("Invalid Roll No");

                        return;
                    }
                    console.log("result is available");
                    const document = HTMLParser.parse(result);
                    let student: ResultType = {
                        name: "",
                        rollNo: rollNo,
                        branch,
                        batch,
                        programme,
                        semesters: []
                    }
                    student.name = document.querySelectorAll('table')[1].querySelector('td:nth-child(2)>p:nth-child(2)')?.innerText.trim() || ""
                    document.querySelector(".pagebreak")?.remove();
                    const subject_tables = document.querySelectorAll("table:nth-child(odd):nth-child(n + 3):not(:last-of-type)");
                    subject_tables.forEach((table, index) => {
                        if (!student.semesters[index]) {

                            student.semesters.push(
                                {
                                    semester: 0,
                                    sgpi: 0,
                                    sgpi_total: 0,
                                    cgpi: 0,
                                    cgpi_total: 0,
                                    courses: []
                                }
                            )
                        }
                        table.querySelectorAll("tr:not([class])").forEach((tr) => {
                            let semester = parseFloat(tr.querySelector("td:nth-child(6)")?.textContent || "0.00");
                            let semester_total = parseFloat(tr.querySelector("td:nth-child(4)")?.textContent || "1");
                            student.semesters[index].courses.push({
                                name: tr.querySelector("td:nth-child(2)")?.innerText.trim() || "",
                                code: tr.querySelector("td:nth-child(3)")?.innerText.trim() || "",
                                cgpi: semester / semester_total
                            });
                        });
                    });
                    const result_tables = document.querySelectorAll("table:nth-child(even):nth-child(n + 3):not(:last-of-type)");
                    result_tables.forEach((table, index) => {
                        table.querySelectorAll("td").forEach((td, i, array) => {
                            student.semesters[index].semester = ("0" + (index + 1)).slice(-2) as unknown as number;
                            student.semesters[index].sgpi = array[1].innerText.trim().split("=")[1] as unknown as number;
                            student.semesters[index].sgpi_total = array[2].innerText.trim().split(" ").pop() as unknown as number;
                            student.semesters[index].cgpi = array[3].innerText.trim().split("=")[1] as unknown as number;
                            student.semesters[index].cgpi_total = array[4].innerText.trim().split(" ").pop() as unknown as number;
                        });
                    });

                    resolve(student);
                }).catch((err:any) => {
                    console.log(err);
                    reject(err);
                })
                .finally(() => {
                    nightmare.end();
                })
        } catch (err) {
            reject(err);
        }

    })

}
function getInfo(rollNo: string) {
    // split the roll no into 3 parts starting two characters then 3 characters and then 3 characters
    const matches = [
        rollNo.toLowerCase().substring(0, 2),
        rollNo.toLowerCase().substring(2, 5),
        rollNo.toLowerCase().substring(5, 8),
    ]
    return {
        batch: parseInt("20" + matches[0]),
        branch: determineBranch(rollNo),
        url: "http://results.nith.ac.in/scheme" + matches[0] + "/studentresult/index.asp",
        programme: determineProgramme(rollNo)
    };
}
function determineBranch(RollNo: string) {
    const lowerRollNo = RollNo.toLowerCase();
    switch (true) {
        case (lowerRollNo.includes("bar")):
            return "Architecture"
        case (lowerRollNo.includes("bce")):
            return "Civil Engineering"
        case (lowerRollNo.includes("bme")):
            return "Mechanical Engineering"
        case (lowerRollNo.includes("bms")):
            return "Materials Science and Engineering"
        case (lowerRollNo.includes("bma")):
            return "Mathematics and Computing"
        case (lowerRollNo.includes("bph")):
            return "Engineering Physics"
        case (lowerRollNo.includes("bee")):
            return "Electrical Engineering"
        case (lowerRollNo.includes("bec") || lowerRollNo.includes("dec")):
            return "Electronics and Communication Engineering"
        case (lowerRollNo.includes("bcs") || lowerRollNo.includes("dcs")):
            return "Computer Science and Engineering"
        case (lowerRollNo.includes("bch")):
            return "Chemical Engineering"
        default:
            throw Error("No Similar branch")
    }

}
function determineProgramme(RollNo: string) {
    const lowerRollNo = RollNo.toLowerCase();

    switch (true) {
        case (lowerRollNo.includes("dcs") || lowerRollNo.includes("dec")):
            return "Dual Degree"
        case (lowerRollNo.includes("bar")):
            return "B.Arch"
        default:
            return "B.Tech"
    }

}