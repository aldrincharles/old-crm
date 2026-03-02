export const gradingColor = {
  gold: ["bg-warning", "Gold"],
  silver: ["bg-silver", "Silver"],
  bronze: ["bg-bronze", "Bronze"],
  callout: ["bg-primary", "Call Out"],
  pending: ["bg-secondary", "Pending"],
  skip: ["bg-info", "Skip"],
  rejected: ["bg-danger", "Rejected"],
  none: ["bg-dark", "None"],
  linked_in: ["bg-linkedin", "LinkedIn Connect"],
};

export const gradingOption = [
  { value: 1, label: "Gold" },
  { value: 2, label: "Silver" },
  { value: 3, label: "Bronze" },
  { value: 4, label: "Call Out" },
  { value: 5, label: "Pending" },
  { value: 6, label: "Skip" },
  { value: 7, label: "Rejected" },
  { value: 8, label: "LinkedIn Connect" },
];

export const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const candidateCategory = [
  { value: "-", label: "-" },
  { value: "Placement", label: "Placement" },
  { value: "Do Not Touch", label: "Do Not Touch" },
  { value: "Dead Profile", label: "Dead Profile" },
  { value: "Left Company", label: "Left Company" },
  { value: "Itel Referral Source", label: "Itel Referral Source" },
  { value: "Left Company", label: "Left Company" },
  { value: "Needs Updating", label: "Needs Updating" },
];

export const internalGrading = [
  { value: "-", label: "-" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "IV-A", label: "IV-A" },
  { value: "IV-B", label: "IV-B" },
  { value: "IV-C", label: "IV-C" },
  { value: "HPPC", label: "HPPC" },
];

export const connectivity = [
  { value: "0", label: "Not Connected" },
  { value: "1", label: "Connected" },
];

export const raasItel = [
  { value: "RaaS", label: "RaaS" },
  { value: "ITEL", label: "ITEL" },
];

export const sourceOptions = [
  { value: "-", label: "-" },
  { value: "Referral", label: "Referral" },
  { value: "Website", label: "Website" },
  { value: "Partner HCM", label: "Partner HCM" },
];

export const salesProfileOptions = [
  { value: "-", label: "-" },
  { value: "Commercial", label: "Commercial" },
  { value: "Verified Commercial", label: "Verified Commercial" },
  { value: "Enterprise", label: "Enterprise" },
  { value: "Verified Enterprise", label: "Verified Enterprise" },
];

export const badgeStatus = {
  Active: ["fas fa-circle text-success"], //Old
  Sourcing: ["fas fa-circle text-success"],
  "Reach Out": ["fas fa-circle text-success"],
  "Internal Interview (Screening)": ["fas fa-circle text-success"],
  "Candidate Forwarded": ["fas fa-circle text-success"],
  "Hiring Manager Interview": ["fas fa-circle text-success"],
  Offer: ["fas fa-circle text-success"],
  "Pending Activation": ["fas fa-circle text-dark"],
  "Pending Hiring Manager Meeting": ["fas fa-circle text-dark"],
  Placement: ["fas fa-circle text-warning"],
  Rework: ["fas fa-circle text-info"],
  "On Hold": ["fas fa-circle text-dark"],
  Cancelled: ["fas fa-circle text-danger"],
  Lost: ["fas fa-circle text-danger"],
};

export const role = [
  { value: "Researcher", label: "Researcher" },
  { value: "Verifier", label: "Verifier" },
  { value: "Interview", label: "Interview" },
  { value: "Support", label: "Support" },
  { value: "Sales", label: "Sales" },
  { value: "Administrator", label: "Administrator" },
];

export const schoolRankings = [
  { value: "-", label: "-" },
  { value: "Ivy League", label: "Ivy League" },
  { value: "International School", label: "International School" },
  { value: "Local Tier 1", label: "Local Tier 1" },
  { value: "Local Tier 2", label: "Local Tier 2" },
];

export const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const jobClassification = [
  { value: "Search", label: "Search" },
  { value: "Special Project", label: "Special Project" },
];

export const jobStatus = [
  { value: "Active", label: "Active" },
  { value: "Sourcing", label: "Sourcing" },
  { value: "Reach Out", label: "Reach Out" },
  {
    value: "Internal Interview (Screening)",
    label: "Internal Interview (Screening)",
  },
  { value: "Candidate Forwarded", label: "Candidate Forwarded" },
  { value: "Hiring Manager Interview", label: "Hiring Manager Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Placement", label: "Placement" },
  { value: "Pending Activation", label: "Pending Activation" },
  {
    value: "Pending Hiring Manager Meeting",
    label: "Pending Hiring Manager Meeting",
  },
  { value: "Rework", label: "Rework" },
  { value: "On Hold", label: "On Hold" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Lost", label: "Lost" },
];

export const clusterOption = [
  { value: "Direct Sales IC", label: "Direct Sales IC" },
  { value: "Main Industries", label: "Main Industries" },
  {
    value: "Main APAC Locations",
    label: "Main APAC Locations",
  },
];
