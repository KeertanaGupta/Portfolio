import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Achievements() {
  const achievements = [
    {
      name: "Global Rank 1865",
      designation: "TCS Codevita Season 12",
      quote: "Achieved Global Rank 1865 among thousands of participants in TCS Codevita Season 12, one of the world's largest competitive programming contests.",
      src: "./images/codevita12.png" 
    },
    {
      name: "Global Rank 3247",
      designation: "TCS Codevita Season 11",
      quote: "Secured Global Rank 3247 in TCS Codevita Season 11, demonstrating strong problem-solving and competitive programming skills.",
      src: "./images/codevita11.png"
    },
    {
      name: "Open Source Contributor",
      designation: "GirlScript Summer of Code 2025",
      quote: "Officially recognized contributor at GSSoC 2025, collaborating on open-source projects and contributing meaningful code improvements.",
      src: "./images/gssoc.png"
    },
    {
      name: "100 Days Coding Challenge",
      designation: "CodeXpress 2.0 by ACM",
      quote: "Successfully completed the 100 Days Coding Challenge organized by ACM CodeXpress 2.0, strengthening consistency in daily coding and problem solving.",
      src: "./images/acm100days.png"
    },
    {
      name: "3rd Rank Winner",
      designation: "Block-A-Thon by Systango",
      quote: "Secured 3rd rank in Block-A-Thon, demonstrating innovative thinking and strong teamwork in a competitive hackathon environment.",
      src: "./images/blockathon.png"
    }
  ];

  return <AnimatedTestimonials testimonials={achievements} autoplay={true} />;
}
