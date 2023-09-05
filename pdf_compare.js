const fs = require('fs');
const pdf = require('pdf-parse');

class ComparePdfs {
    constructor(pdf1, pdf2) {
        this.pdf1 = pdf1;
        this.pdf2 = pdf2;
    }

    // Function to read and parse a PDF file
    async readPDF(pdfPath) {
        try {
            const dataBuffer = fs.readFileSync(pdfPath);
            const data = await pdf(dataBuffer);
            return data.text;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Function to compare two PDF files
    async compareFiles() {
        const file1Content = await this.readPDF(this.pdf1);
        const file2Content = await this.readPDF(this.pdf2);

        if (file1Content === file2Content && file1Content !== null && file2Content !== null) {
            return true;
        } else {
            return false;
        }
    }
}

// Usage example:
const file1 = "file1.pdf";
const file2 = "file2.pdf";
const pdfComparer = new ComparePdfs(file1, file2);

pdfComparer.compareFiles().then(result => {
    if (result) {
        console.log("The PDF files are equal.");
    } else {
        console.log("The PDF files are different.");
    }
}).catch(error => {
    console.error("An error occurred:", error);
});
