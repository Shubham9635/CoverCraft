import {
  User,
  Hash,
  GitBranch,
  GraduationCap,
  BookOpen,
  Bookmark,
  UserCheck,
  AlertCircle,
  FolderOpen,
} from "lucide-react";

// Mapping of icons based on field key
const FIELD_ICONS = {
  subjectName: BookOpen,
  unit: Bookmark,
  branch: GitBranch,
  semester: GraduationCap,
  name: User,
  rollNumber: Hash,
  submittedTo: UserCheck,
};

// Validation patterns and helper info
const FIELD_META = {
  subjectName: {
    maxLength: 60,
    helperText: "Course / Subject title",
    pattern: /^.{2,60}$/,
    errorMsg: "Please enter a valid subject name.",
  },
  unit: {
    maxLength: 30,
    helperText: "e.g. Unit - 1 or Unit - III",
    pattern: /^.{1,30}$/,
    errorMsg: "Please specify the unit.",
  },
  branch: {
    maxLength: 50,
    helperText: "e.g. Computer Science & Engineering",
    pattern: /^.{2,50}$/,
    errorMsg: "Please enter your branch or department.",
  },
  semester: {
    maxLength: 30,
    helperText: "e.g. 5th Semester or 3rd Sem",
    pattern: /^.{1,30}$/,
    errorMsg: "Please specify your semester.",
  },
  name: {
    maxLength: 50,
    placeholder: "e. g. Shubham Gupta",
    helperText: "Full name as per official records",
    pattern: /^[a-zA-Z\s.'-]{2,50}$/,
    errorMsg: "Please enter a valid student name.",
  },
  rollNumber: {
    maxLength: 30,
    placeholder: "e. g. 2423",
    helperText: "College / University roll number",
    pattern: /^[a-zA-Z0-9\s/_-]{1,30}$/,
    errorMsg: "Please enter your roll number.",
  },
  submittedTo: {
    maxLength: 50,
    helperText: "Faculty / Professor name with title",
    pattern: /^.{2,50}$/,
    errorMsg: "Please enter the faculty / reviewer name.",
  },
};

export default function DetailsForm({
  template,
  details,
  onChange,
  errors,
  disabled,
}) {
  if (!template || !template.fields) return null;

  // Render a single field input
  const renderField = (field) => {
    const meta = FIELD_META[field.key] || {
      maxLength: 50,
      helperText: "",
      errorMsg: `Please enter ${field.label.toLowerCase()}.`,
    };
    const Icon = FIELD_ICONS[field.key] || FolderOpen;
    const hasError = !!errors?.[field.key];
    const value = details[field.key] || "";

    return (
      <div key={field.key} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={`field-${field.key}`}
            className="block text-sm font-semibold text-gray-800"
          >
            {field.label}
            <span className="text-purple-600 ml-1 font-bold">*</span>
          </label>
          <span className="text-xs text-gray-400">
            {value.length}/{meta.maxLength}
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon
              className={`w-4 h-4 transition-colors ${hasError
                  ? "text-red-500"
                  : value.trim()
                    ? "text-purple-600"
                    : "text-gray-400"
                }`}
            />
          </div>

          <input
            id={`field-${field.key}`}
            type="text"
            value={value}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
            maxLength={meta.maxLength}
            disabled={disabled}
            autoComplete="off"
            className={`block w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border font-medium transition-all outline-none
              ${hasError
                ? "border-red-400 bg-red-50/50 text-gray-900 focus:ring-2 focus:ring-red-200"
                : value.trim()
                  ? "border-purple-200 bg-purple-50/20 text-gray-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  : "border-gray-200 bg-gray-50/30 text-gray-900 hover:border-gray-300 focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          />
        </div>

        {hasError ? (
          <p className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-0.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {meta.errorMsg}
          </p>
        ) : meta.helperText ? (
          <p className="text-xs text-gray-400 pt-0.5">{meta.helperText}</p>
        ) : null}
      </div>
    );
  };

  // If template specifies grouped fields, render them by group
  if (template.groups && template.groups.length > 0) {
    const fieldsByKey = new Map(template.fields.map((f) => [f.key, f]));

    return (
      <div className="space-y-6">
        {template.groups.map((group) => {
          const groupFields = group.fields
            .map((k) => fieldsByKey.get(k))
            .filter(Boolean);

          if (groupFields.length === 0) return null;

          return (
            <div
              key={group.id}
              className="bg-gray-50/60 rounded-xl p-4 sm:p-5 border border-gray-100/90 space-y-4"
            >
              <div className="border-b border-gray-200/60 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  {group.title}
                </h4>
                {group.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {group.description}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {groupFields.map((field) => renderField(field))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Fallback: flat list of fields
  return (
    <div className="space-y-4">
      {template.fields.map((field) => renderField(field))}
    </div>
  );
}

/**
 * Validates the details object against the fields of the currently selected template.
 * Returns an errors map or null if all fields are valid.
 */
export function validateDetails(details, template) {
  if (!template || !template.fields) return null;

  const errs = {};
  for (const field of template.fields) {
    const val = (details[field.key] || "").trim();
    const meta = FIELD_META[field.key];
    const pattern = meta?.pattern || /^.{1,100}$/;

    if (!val || !pattern.test(val)) {
      errs[field.key] = true;
    }
  }

  return Object.keys(errs).length > 0 ? errs : null;
}
