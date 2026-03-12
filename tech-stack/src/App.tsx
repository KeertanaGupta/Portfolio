import {
  Code, Globe, Brain, BookOpen, Wrench
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Programming",
    date: "",
    content: "",
    category: "Programming",
    icon: Code,
    relatedIds: [],
    status: "completed" as const,
    energy: 95,
    technologies: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    id: 2,
    title: "Web Development",
    date: "",
    content: "",
    category: "Web Development",
    icon: Globe,
    relatedIds: [],
    status: "completed" as const,
    energy: 90,
    technologies: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
    ],
  },
  {
    id: 3,
    title: "Machine Learning",
    date: "",
    content: "",
    category: "Machine Learning",
    icon: Brain,
    relatedIds: [],
    status: "in-progress" as const,
    energy: 75,
    technologies: [
      { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
    ],
  },
  {
    id: 4,
    title: "Core CS",
    date: "",
    content: "",
    category: "Core CS",
    icon: BookOpen,
    relatedIds: [],
    status: "completed" as const,
    energy: 88,
    technologies: [
      { name: "DSA", icon: "" },
      { name: "Algorithms", icon: "" },
      { name: "OOP", icon: "" },
      { name: "DBMS", icon: "" },
      { name: "OS", icon: "" },
    ],
  },
  {
    id: 5,
    title: "Tools & Databases",
    date: "",
    content: "",
    category: "Tools & Databases",
    icon: Wrench,
    relatedIds: [],
    status: "completed" as const,
    energy: 85,
    technologies: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    ],
  },
];

function App() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default App;
