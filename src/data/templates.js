/**
 * Templates configuration registry.
 *
 * Each template configuration contains:
 *  - id: Unique string identifier
 *  - name: Display name in the gallery
 *  - subtitle: Short descriptor
 *  - file: Image path (stored in public/templates/)
 *  - naturalWidth: Original width of the uploaded image
 *  - naturalHeight: Original height of the uploaded image
 *  - fields: Custom text positioning configuration for all template fields.
 *
 * All coordinates are normalized fractions (0 to 1) relative to
 * naturalWidth and naturalHeight so canvas rendering scales cleanly at any DPI.
 */

const templates = [
  {
    id: "programming-lab-mcsec",
    name: "Programming Lab File",
    subtitle: "Dr. M.C. Saxena College of Engineering & Technology",
    category: "Lab File",
    file: "/templates/programming-lab.jpg",
    naturalWidth: 716,
    naturalHeight: 1024,
    groups: [
      {
        id: "student-info",
        title: "Student Details",
        description: "Fill in your details for the lab cover",
        fields: ["name", "rollNumber", "branch"],
      },
    ],
    fields: [
      {
        key: "name",
        label: "Student Name",
        placeholder: "e. g. Shubham Gupta",
        group: "student-info",
        xFrac: 152 / 716,
        yFrac: 576 / 1024,
        maxWidthFrac: 164 / 716,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
      {
        key: "rollNumber",
        label: "Roll Number",
        placeholder: "e. g. 2423",
        group: "student-info",
        xFrac: 152 / 716,
        yFrac: 602 / 1024,
        maxWidthFrac: 164 / 716,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
      {
        key: "branch",
        label: "Branch / Section",
        placeholder: "e.g. CSE - A",
        group: "student-info",
        xFrac: 204 / 716,
        yFrac: 630 / 1024,
        maxWidthFrac: 112 / 716,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
    ],
  },

  {
    id: "assignment-cover-mcsec",
    name: "Assignment Cover",
    subtitle: "Dr. M.C. Saxena College of Engineering & Technology",
    category: "Assignment",
    file: "/templates/assignment-cover.jpg",
    naturalWidth: 789,
    naturalHeight: 1024,
    groups: [
      {
        id: "assignment-info",
        title: "Assignment Information",
        description: "Subject and unit details",
        fields: ["subjectName", "unit"],
      },
      {
        id: "student-info",
        title: "Student Information",
        description: "Branch, semester, name and roll number",
        fields: ["branch", "semester", "name", "rollNumber"],
      },
      {
        id: "submission-info",
        title: "Submission Information",
        description: "Faculty / Professor details",
        fields: ["submittedTo"],
      },
    ],
    fields: [
      // 1. Subject Name (Beside SUBJECT)
      {
        key: "subjectName",
        label: "Subject Name",
        placeholder: "e.g. Data Structures & Algorithms",
        group: "assignment-info",
        xFrac: 296 / 789,
        yFrac: 454 / 1024,
        maxWidthFrac: 218 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 2. Unit (Beside Unit)
      {
        key: "unit",
        label: "Unit",
        placeholder: "e.g. Unit - 1 or Unit - III",
        group: "assignment-info",
        xFrac: 296 / 789,
        yFrac: 496 / 1024,
        maxWidthFrac: 218 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 3. Branch (Branch row in table)
      {
        key: "branch",
        label: "Branch",
        placeholder: "e.g. Computer Science & Engineering",
        group: "student-info",
        xFrac: 402 / 789,
        yFrac: 588 / 1024,
        maxWidthFrac: 304 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 4. Semester (Semester row in table)
      {
        key: "semester",
        label: "Semester",
        placeholder: "e.g. 5th Semester or 3rd Sem",
        group: "student-info",
        xFrac: 402 / 789,
        yFrac: 619 / 1024,
        maxWidthFrac: 304 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 5. Name (After Name in Submitted By section)
      {
        key: "name",
        label: "Student Name",
        placeholder: "e. g. Shubham Gupta",
        group: "student-info",
        xFrac: 116 / 789,
        yFrac: 807 / 1024,
        maxWidthFrac: 230 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 6. Roll Number (After Roll No in Submitted By section)
      {
        key: "rollNumber",
        label: "Roll Number",
        placeholder: "e. g. 2423",
        group: "student-info",
        xFrac: 116 / 789,
        yFrac: 846 / 1024,
        maxWidthFrac: 230 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
      // 7. Submitted To (Under SUBMITTED TO section)
      {
        key: "submittedTo",
        label: "Submitted To",
        placeholder: "e.g. Prof. Rajat Sir or Er. Amit Verma",
        group: "submission-info",
        xFrac: 612 / 789,
        yFrac: 807 / 1024,
        maxWidthFrac: 150 / 789,
        fontSize: 15,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#111827",
        align: "left",
        bold: true,
      },
    ],
  },

  {
    id: "english-language-lab-mcsec",
    name: "English Language Lab File",
    subtitle: "Dr. M.C. Saxena College of Engineering & Technology",
    category: "Lab File",
    file: "/templates/english-language-lab.jpg",
    naturalWidth: 722,
    naturalHeight: 1024,
    groups: [
      {
        id: "student-info",
        title: "Student Details",
        description: "Submitted By: Enter your details for the lab cover",
        fields: ["name", "rollNumber", "branch"],
      },
    ],
    fields: [
      {
        key: "name",
        label: "Student Name",
        placeholder: "e. g. Shubham Gupta",
        group: "student-info",
        xFrac: 106 / 722,
        yFrac: 554 / 1024,
        maxWidthFrac: 164 / 722,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
      {
        key: "rollNumber",
        label: "Roll Number",
        placeholder: "e. g. 2423",
        group: "student-info",
        xFrac: 115 / 722,
        yFrac: 583 / 1024,
        maxWidthFrac: 155 / 722,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
      {
        key: "branch",
        label: "Branch / Section",
        placeholder: "e.g. CSE - A",
        group: "student-info",
        xFrac: 158 / 722,
        yFrac: 612 / 1024,
        maxWidthFrac: 112 / 722,
        fontSize: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#18181b",
        align: "left",
        bold: true,
      },
    ],
  },
];

export default templates;
