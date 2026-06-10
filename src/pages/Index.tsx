import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Code, Wrench, Heart, X, Calendar, Users, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import IconCloud from "@/components/IconCloud";

type Section = "experience" | "education" | "projects" | "techstack" | "hobbies" | "current" | "extracurriculars" | null;
type ConcreteSection = Exclude<Section, null>;
type SectionDefinition = {
  id: ConcreteSection;
  title: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  itemCount: number;
};

type OverlayRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const CONTAINER_RADIUS = 24;
const ANIMATION_DURATION_MS = 450;

// Database for section content
const sectionData = {
  experience: [
    {
      id: 1,
      title: "Mechanical Designer Intern",
      company: "Motioneering (RWDI)",
      period: "May 2026 - Present",
      description: "As a Mechanical Designer Intern at RWDI Motioneering, I contribute to the design and development of advanced vibration mitigation systems for high-rise buildings, bridges, stadiums, and other large-scale structures. My role involves creating detailed CAD models and manufacturing drawings, performing engineering calculations and modal analyses, and collaborating with multidisciplinary teams to transform concepts into manufacturable solutions. Through client communication, site visits, and hands-on involvement throughout the design process, I have gained experience in structural dynamics, precision mechanical design, and the engineering of custom tuned mass damping systems that improve the safety, comfort, and performance of critical infrastructure.",
      image: '/Motioneering.jpg', // Add image path here
      highlights: []
    },
    {
      id: 2,
      title: "Manufacturing Designer Intern",
      company: "Tigercat Industries",
      period: "January - August 2025",
      description: "Engineered workflow improvements, custom tooling, and assembly fixtures that streamlined heavy equipment manufacturing by reducing cycle times, increasing assembly line throughput, and minimizing production defects. Applied SolidWorks and finite element analysis (FEA) to design manufacturable solutions that lowered scrap and labor costs, while optimizing component flow to reduce work-in-progress inventory and reclaim over 200 square feet of valuable production space. Working alongside engineers, machinists, welders, and production teams, I translated complex design challenges into practical mechanical solutions that improved efficiency, safety, and overall manufacturing performance.",
      image: '/Tigercat.jpg',
      highlights: []
    },
    {
      id: 3,
      title: "Design and Validation Intern",
      company: "Skyjack",
      period: "May - August 2024",
      description: "Managed multiple engineering projects simultaneously while designing and developing testing equipment and instrumentation for mobile elevating work platforms, balancing technical design work with cross-functional coordination to meet project timelines and objectives. Designed a custom rotary encoder signal conditioning system for Bluetooth-based RPM monitoring and conducted load cell and strain gauge testing to validate structural performance and improve product reliability. By collaborating with engineers, technicians, and manufacturing teams, automating repetitive workflows through VBA programming, and applying DFMA principles throughout development, I helped streamline prototype testing, improve engineering efficiency, and ensure successful project execution from concept through validation.",
      image: '/Skyjack.png',
      highlights: []
    },
    {
      id: 4,
      title: "Undergraduate Research Assistant (URA)",
      company: "University of Guelph - SOE",
      period: "August 2023 - January 2025",
      description: "Conducted multidisciplinary engineering research across multiple School of Engineering laboratories, contributing to projects spanning fluid mechanics, renewable energy systems, experimental testing, and data analysis. Developed advanced data acquisition and signal processing methods to improve experimental accuracy while engineering and testing hybrid renewable energy prototypes that increased energy capture efficiency by 10%. By integrating analytical modeling, hands-on prototyping, and laboratory validation, I accelerated testing cycles, generated reliable experimental data, and gained extensive experience translating research concepts into practical engineering solutions across a diverse range of research disciplines.",
      image: '/UOG.webp',
      highlights: []
    },

  ],
  
  projects: [
    {
      id: 1,
      title: "Tigercat 6900 Grinder - Belt Guard",
      description: "Designed and fabricated a custom belt guard for the Tigercat 6900 Grinder to improve operator safety during machine testing while preserving access for inspection and maintenance. Modeled the assembly in SolidWorks, collaborated with shop-floor personnel to refine the design for manufacturability, and supported fabrication and installation. The final design integrated with the existing machine architecture, providing robust protection for rotating components without compromising testing efficiency or serviceability.",
      tech: ["SolidWorks", "Canadian Welding Bureau (CWB)", "FEA", "Sheetmetal", "Blasting", "Breaking"],
      //link: "github.com/kayne-lee/nucleusapp",
      images: ["Guard1.png","Guard2.png","guard3.jpg"]
    },
    {
      id: 1,
      title: "SpectraMed - VitalScan",
      description: "Led the mechanical design and CAD development of the SpectraMed Vital Scan, a non-invasive medical device aimed at improving early health screening through optical sensing technology. Designed custom enclosures, internal mounting systems, sensor interfaces, and manufacturable assemblies in SolidWorks while iterating prototypes to optimize ergonomics, component integration, thermal management, and ease of assembly. Working closely with the electrical and software development teams, I transformed design concepts into functional prototypes that successfully advanced the project into its current prototyping phase after earning first place and a $2,250 award at the University of Guelph Design III Engineering Competition.",
      tech: ["SolidWorks", "Motion Study", "Signal Processing", "3D Printing",],
      //link: "github.com/kayne-lee/nucleusapp",
      images: ["VS.png"]
    },
    {
      id: 2,
      title: "Rotary Encoder Signal Conditioner",
      description: "Designed and developed a custom rotary encoder signal conditioning system to enable accurate Bluetooth-based RPM measurement during validation testing of mobile elevating work platforms. Modeled the enclosure and mounting hardware in CAD while integrating the encoder, signal conditioning circuitry, and wireless data acquisition components into a compact, field-ready assembly. The final system improved the efficiency and reliability of drivetrain performance testing by providing real-time rotational speed data without intrusive instrumentation, supporting faster engineering validation and product development.",
      tech: ["Python", "CAN-BUS", "Electrical Design", ],
      //link: "github.com/kayne-lee/Computer-Vision-Keyboard",
      images: ["rot1.png","rot2.jpg","rot3.jpg"]
    },
    {
      id: 3,
      title: "Packed Bed Dehumidifier",
      description: "Designed and fabricated a packed-bed dehumidifier (PBD) prototype that extracted moisture from humid air using a solar-powered liquid desiccant regeneration system. Performed extensive theoretical analysis and system modeling to optimize heat and mass transfer performance, using SolidWorks for mechanical design and EES (Engineering Equation Solver) to predict operating conditions and expected dehumidification efficiency. The completed prototype integrated mechanical design, thermodynamic analysis, and experimental validation to demonstrate a sustainable approach to atmospheric water extraction using renewable energy.",
      tech: ["Soldering", "Resin", "Machining", "Electrical Design", "CFD"],
      //link: "github.com/kayne-lee/Caption-Creator",
      images: ["ura1.png","ura2.png","ura3.png"]
    },
    {
      id: 4,
      title: "Hydraulic Arm",
      description: "Reverse engineered a 150+ component hydraulic robotic arm by disassembling the physical assembly, measuring individual components, and recreating the complete mechanism in SolidWorks with accurate dimensions and assembly constraints. Leveraged advanced CAD techniques, including motion studies and animation, to simulate the arm's kinematics and validate component interactions. The project strengthened my understanding of complex mechanical assemblies, hydraulic actuation systems, and efficient parametric modeling while developing the ability to transform physical hardware into a fully functional digital twin.",
      tech: ["SolidWorks", "AutoCAD", "Motion Study"],
      //link: "github.com/kayne-lee/NumerAI-Model",
      images:["hydro.png","hydro2.png"]
    },
    {
      id: 5,
      title: "Modular Tachometer System",
      description: "Designed and manufactured a custom tachometer enclosure and wiring harness system for Tigercat harvesting head testing, enabling rapid and reliable RPM measurement across multiple hydraulic components. Modeled the enclosure in SolidWorks and produced it through 3D printing, while creating custom harness drawings and integrating the required laser sensor wiring into a compact, field-ready package. The completed system supported up to four interchangeable tachometer sensors, improving testing efficiency, simplifying machine instrumentation, and providing a reusable solution for drivetrain validation and performance analysis.",
      tech: ["SolidWorks", "3D printing", "Harnesses", "Electrical Drawing", "Routing"],
      //link: "github.com/kayne-lee/NumerAI-Model",
      images: ["tach1.png","tach2.png"]
    },
    {
      id: 6,
      title: "Trestle Sawhorses",
      description: "Designed and engineered a portable retractable support stand to safely handle and position machine telescope assemblies throughout the manufacturing process at Tigercat. Developed the complete assembly in SolidWorks, including the structural weldment and retractable caster mechanism, before producing detailed manufacturing drawings for fabrication and assembly. The final design provided a durable, mobile support platform that improved shop-floor flexibility, streamlined assembly operations, and became a reusable fixture for safely supporting heavy machine components during production.",
      tech: ["SolidWorks", "3D printing", "Harnesses", "Electrical Drawing", "Routing"],
      //link: "github.com/kayne-lee/NumerAI-Model",
      image: 'trestle.png'
    },
    {
       id: 7,
      title: "Assembly Kickstands",
      description: "Designed and engineered a series of assembly kickstands for Tigercat manufacturing operations to safely support heavy machine components during production and assembly. Performed finite element analysis (FEA) to validate structural performance, evaluate stress distribution, and optimize the design prior to fabrication, ensuring an appropriate factor of safety under expected loading conditions. Following validation, I produced detailed manufacturing drawings, coordinated fabrication and assembly, and successfully delivered a production-ready design that was mass manufactured and deployed across multiple Tigercat facilities, standardizing assembly operations and improving shop-floor safety and efficiency.",
      tech: ["Weldment", "FEA", "DFMA", "Mechanical Drawing"],
      //link: "github.com/kayne-lee/NumerAI-Model",
      images: ["kick1.jpg","kick2.jpg","kick3.jpg"]
    },
  ],
  hobbies: [
    {
      id: 1,
      title: "Running",
      description: "Completed half marathon with a time of 1:58. I am now training for a full marathon!",
      image: 'HM.jpg'
    },
    {
      id: 2,
      title: "Coffee",
      description: "I try a different coffee shop every month! Current favorite is SŌL in Guelph, Ontario.",
      image: 'sol.webp'
    },
    {
      id: 3,
      title: "Hiking",
      description: "Love Hiking new areas. Staying active while enjoying nature.",
      image: 'falls.jpg'
    },
    {
      id: 4,
      title: "Sketching",
      description: "Love sketching scenery and animals. It's a great way to destress.",
      image: 'wolf.JPG'
    },
    {
      id: 5,
      title: "Friends & Family",
      description: "Spending time with friends and family making lifelong memories.",
      image: 'friends.jpg'
    },
  ],
  extracurriculars: [
    {
      id: 1,
      title: "Project Coordinator - Senior Project Designer",
      organization: "Enactus",
      period: "September 2025 - Present",
      description: "Served as a Senior Product Designer and Project Coordinator within the University of Guelph Enactus team, contributing to product design, prototyping, and technical problem solving for a student-led entrepreneurial venture. Collaborated with a multidisciplinary team to refine the product, support development milestones, and strengthen the project's technical foundation. The team's efforts culminated in winning the Enactus Regional Championship and advancing to the Enactus Canada National Exposition, demonstrating the impact of collaborative innovation and entrepreneurship.",
      image: 'EnactusG.png'
    },
    {
      id: 2,
      title: "Co-Founder & Lead Mechanical Designer",
      organization: "SpectraMed",
      period: "2026 - Present",
      description: "Co-founded SpectraMed, a medical technology startup developing a non-invasive health monitoring device that combines mechanical design, electronics, and embedded sensing technologies. As Lead Mechanical Designer, I have driven the design and rapid prototyping of the device while collaborating on sensor integration, PCB development, and system validation to transform the concept into a functional prototype. After earning first place and a $2,250 award at the University of Guelph Design III Engineering Competition, the team advanced into the prototyping phase, where we continue to refine the design through iterative testing and engineering validation with the goal of commercializing an accessible healthcare solution.",
      image: 'SM.png'
    },
    {
      id: 3,
      title: "GreenTech Innovator",
      organization: "FlowNergia",
      period: "September - December 2024",
      description: "Contributed to fluid mechanics research as a GreenTech Innovator, leading the design and fabrication of a multichannel copper electrode sensor for measuring slug flow void fraction in two-phase flow systems. Designed the sensor geometry, developed the manufacturing process, and implemented data acquisition methods to improve signal quality, measurement accuracy, and experimental repeatability. Working alongside graduate researchers and faculty members, I integrated mechanical design, instrumentation, and experimental testing to create a reliable sensing platform for advanced multiphase flow analysis and engineering research.",
      image: 'flownergia.webp'

    }
    //{
      //id: 3,
      //title: "iCon",
      //organization: "iCons",
      //period: "2023 - 2025",
      //description: "Operated after ILC administration hours to keep the facility open to students promote a positive studying and learning atmosphere, and to act as a resource to undergraduate students for academic courses.",
      //image: 'ICONS.png'
    //},
    
  ],
  current: {
    projects: [
      {
        id: 1,
        title: "SpectraMed",
        description: "Working on prototyping SpectraMed's non-invasive analyte monitoring device.",
        tech: ["Electrical", "3D Printing", "Soldering","Python","Arduino"],
        image: null
      },
      {
        id: 2,
        title: "AI Agent Development",
        description: "Exploring AI applications for mechanical engineering design automation.",
        tech: ["Python", "ML", "AI", "SolidWorks"],
        image: null
      },
      {
        id: 3,
        title: "Motivator @ Goodlife Fitness",
        description: "Part time front desk role at Goodlife Fitness to support member enrollement and enhance gym experience.",
        tech: ["Communication", "Leadership", "Sales"],
        image: null
      },
    ],
    gymProgress: [
      { label: "Current Split", value: "Chest/Back, Shoulders/Arms, Legs, Rest" },
      { label: "Focus", value: "Lean muscle mass" },
      { label: "Goal", value: "Maintain lean athletic build" },
      { label: "Favourite Exercise", value: "Overhead Tricep Extension" }
    ],
    books: [
      {
        id: 1,
        title: "The Slight Edge",
        author: "Jeff Olson",
        description: "Turning simple disciplines into massive success and happiness.",
        progress: 80,
        image: 'book.png'
      },
      // //{
      //   //id: 2,
      //   //title: "Principles of Building AI Agents",
      //  // author: "Sam Bhagwat",
      //   description: "2nd edition by Sam Bhagwat, cofounder and CEO Mastra.ai. Deep dive into AI agent development.",
      //   progress: 40,
      //   image: 'aia.jpg'
      // }
    ],
    music: [
       {
        id: 1,
        title: "The Great Divide", artist: "Noah Kahan", link: "https://open.spotify.com/album/2fnkyn9EybagIoFJ7a13oz",
        image: 'TGD.jpg'
      },
    ],
    focusAreas: [
      "Toronto Hyrox Training - Date: October 4th 2026",
      "Hiking new areas around Ontario",
      "Experimenting with AI/ML tools for Mechanical Engineering",
    ]
  }
};
const ProjectSlideshow = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 rounded-lg bg-secondary flex items-center justify-center">
        No Image
      </div>
    );
  }

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-border/80 bg-secondary/70 shadow-inner">
      <img
        src={images[current]}
        alt={title}
        className="w-full h-full object-contain"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((current - 1 + images.length) % images.length)
            }
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/90 text-lg text-black shadow-lg transition-transform hover:scale-105"
          >
            ❮
          </button>

          <button
            onClick={() =>
              setCurrent((current + 1) % images.length)
            }
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/5 bg-white/90 text-lg text-black shadow-lg transition-transform hover:scale-105"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
};
const Index = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const closeTimeoutRef = useRef<number>();
  const cardRefs = useRef<Record<ConcreteSection, HTMLDivElement | null>>({
    experience: null,
    education: null,
    projects: null,
    techstack: null,
    hobbies: null,
    current: null,
    extracurriculars: null,
  });

  const [visibleSection, setVisibleSection] = useState<Section>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState<OverlayRect | null>(null);
  const [overlayRadius, setOverlayRadius] = useState(CONTAINER_RADIUS);
  const [showContent, setShowContent] = useState(false);
  const [cachedCardRect, setCachedCardRect] = useState<OverlayRect | null>(null);
  const [showVitalScanVideo, setShowVitalScanVideo] = useState(false);

  const sections: SectionDefinition[] = [
    {
      id: "experience",
      title: "Professional Experience",
      metric: "4",
      metricLabel: "Positions",
      icon: Briefcase,
      itemCount: sectionData.experience.length,
    },
    {
      id: "education",
      title: "Education",
      metric: "University of Guelph",
      metricLabel: "Mechanical Engineering",
      icon: GraduationCap,
      itemCount: 1,
    },
    {
      id: "projects",
      title: "Projects",
      metric: "5+",
      metricLabel: "Designed & Manufactured",
      icon: Code,
      itemCount: sectionData.projects.length,
    },
    {
      id: "techstack",
      title: "Engineering Tools",
      metric: "20+",
      metricLabel: "Software",
      icon: Wrench,
      itemCount: 5,
    },
    {
      id: "hobbies",
      title: "Hobbies",
      metric: "Beyond",
      metricLabel: "Engineering",
      icon: Heart,
      itemCount: sectionData.hobbies.length,
    },
    {
      id: "current",
      title: "Current Focus",
      metric: "Active",
      metricLabel: "Today",
      icon: Calendar,
      itemCount: sectionData.current.projects.length + sectionData.current.books.length,
    },
    {
      id: "extracurriculars",
      title: "Extracurriculars",
      metric: "3",
      metricLabel: "Activities",
      icon: Users,
      itemCount: sectionData.extracurriculars.length,
    },
  ];

  const currentSection = visibleSection
    ? sections.find((section) => section.id === visibleSection) ?? null
    : null;
  const SectionIcon = currentSection?.icon;

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showVitalScanVideo) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVitalScanVideo(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showVitalScanVideo]);

  const renderSectionContent = (section: Section) => {
    switch (section) {
      case "experience":
        return (
          <div className="space-y-5">
            {sectionData.experience.map((job, index) => (
              <div key={job.id} className="content-panel">
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <div className="content-image h-20 w-20 flex-shrink-0 p-2">
                    {job.image ? (
                      <img src={job.image} alt={job.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl text-accent font-bold">{job.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-serif font-semibold tracking-[-0.02em] sm:text-2xl">{job.title}</h3>
                      <p className={index === 0 ? "text-accent font-medium" : "text-muted-foreground font-medium"}>{job.company}</p>
                      <span className="text-muted-foreground text-sm">{job.period}</span>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-5">
            <div className="content-panel space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-semibold">B.ENG Mechanical Engineering</h3>
                  <p className="text-accent font-medium">University of Guelph</p>
                </div>
                <span className="text-muted-foreground">September 2022 - April 2027</span>
              </div>
              <div className="space-y-2 mt-4">
                <p className="font-medium">Relevant Coursework:</p>
                <ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground sm:grid-cols-2 sm:text-base">
                  <li>• Mechanical Vibrations</li>
                  <li>• Robotics</li>
                  <li>• Computer Aided Design & Manufacturing</li>
                  <li>• Machine Design</li>
                  <li>• Thermodynamics</li>
                  <li>• Mechanics II</li>
                  <li>• Material Science</li>
                </ul>
              </div>
            </div>

            <div className="content-panel space-y-2">
              <h3 className="text-xl font-serif font-semibold">Honors & Awards</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• University of Guelph Entrance Scholarship</li>
                <li>• Academic Leadership Scholarship</li>
                <li>• BIPOC Scholarship </li>
                <li>• Design III Competition - First Place </li>
              </ul>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="grid gap-6">
            {sectionData.projects.map((project) => {
              const isVitalScan = project.title === "SpectraMed - VitalScan";

              return (
                <div
                  key={`${project.id}-${project.title}`}
                  className="content-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_20px_50px_-32px_hsl(var(--accent)/0.45)]"
                >
                  <div className="grid items-start gap-8 md:grid-cols-[340px_1fr]">
                    <ProjectSlideshow
                      images={project.images ?? (project.image ? [project.image] : [])}
                      title={project.title}
                    />

                    <div>
                      <h3 className="mb-3 text-2xl font-serif font-semibold">
                        {project.title}
                      </h3>

                      <p className="mb-5 leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border/70 bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {isVitalScan && (
                        <button
                          type="button"
                          onClick={() => setShowVitalScanVideo(true)}
                          className="mt-6 inline-flex items-center gap-2 border-b border-accent/40 pb-1 text-sm font-semibold text-accent transition-colors hover:border-accent hover:text-foreground"
                        >
                          <Play className="h-4 w-4" />
                          Watch assembly video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "techstack": {
        const engineeringTools = [
          "/SW.png",
          "/AC.png",
          "/ANSYS.png",
          "/CATIA.png",
          "/EXCEL.png",
          "/JAVA.png",
          "/MASTERCAM.png",
          "/MATLAB.jpg",
          "/MC.png",
        ];

        return (
          <div className="h-[280px] w-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-inner sm:h-[360px] md:h-[420px] lg:h-[520px] xl:h-[600px]">
            <IconCloud iconSlugs={[]} imageArray={engineeringTools} />
          </div>
        );
      }

      case "hobbies":
        return (
          <div className="grid gap-5 md:grid-cols-2">
            {sectionData.hobbies.map((hobby) => (
              <div key={hobby.id} className="content-panel transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30">
                <div className="flex flex-col items-start gap-3 sm:flex-row">
                  <div className="content-image h-16 w-16 flex-shrink-0 p-1">
                    {hobby.image ? (
                      <img src={hobby.image} alt={hobby.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl text-accent font-bold">{hobby.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-serif font-semibold mb-3">{hobby.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{hobby.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "current":
        return (
          <div className="space-y-6">
            {/* Active Projects */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Active Projects</h3>
              <div className="space-y-4">
                {sectionData.current.projects.map((project) => (
                  <div key={project.id} className="content-panel space-y-2">
                    <h4 className="text-xl font-medium">{project.title}</h4>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-border/70 bg-secondary/80 px-2.5 py-1 text-xs">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gym Progress */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Gym Progress</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sectionData.current.gymProgress.map((stat, index) => (
                  <div key={index} className="content-panel p-4 sm:p-4">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold leading-snug text-accent sm:text-xl">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Books I'm Reading */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Currently Reading</h3>
              <div className="space-y-3">
                {sectionData.current.books.map((book, index) => (
                  <div key={book.id} className="content-panel flex flex-col items-start gap-4 sm:flex-row">
                    {book.image ? (
                      <img src={book.image} alt={book.title} className="w-16 h-24 object-contain rounded bg-accent/10" />
                    ) : (
                      <div className="flex-shrink-0 w-16 h-24 bg-gradient-to-br from-accent/20 to-accent/40 rounded"></div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-lg font-medium">"{book.title}" by {book.author}</h4>
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Progress: {book.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Music */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Favorite Album</h3>
              <div className="space-y-3">
                {sectionData.current.music.map((song, i) => (
                  <a 
                    key={i} 
                    href={song.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="content-panel group block p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 sm:p-4"
                  >
                    <p className="text-base font-medium group-hover:text-accent">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Other Interests */}
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Other Focus Areas</h3>
              <ul className="space-y-2 text-muted-foreground">
                {sectionData.current.focusAreas.map((area, i) => (
                  <li key={i}>• {area}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "extracurriculars":
        return (
          <div className="space-y-6">
            {sectionData.extracurriculars.map((activity, index) => (
              <div key={activity.id} className="content-panel">
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <div className="content-image h-20 w-20 flex-shrink-0 p-2">
                    {activity.image ? (
                      <img src={activity.image} alt={activity.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl text-accent font-bold">{activity.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-serif font-semibold tracking-[-0.02em] sm:text-2xl">{activity.title}</h3>
                      <p className={index === 0 ? "text-accent font-medium" : "text-muted-foreground font-medium"}>{activity.organization}</p>
                      <span className="text-muted-foreground text-sm">{activity.period}</span>
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground sm:text-base">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const openSection = (section: ConcreteSection) => {
    const container = gridRef.current;
    const card = cardRefs.current[section];

    if (!container || !card) {
      setVisibleSection(section);
      setOverlayStyle(null);
      setOverlayRadius(CONTAINER_RADIUS);
      setIsClosing(false);
      setShowContent(true);
      setCachedCardRect(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    // Start position - card position relative to container
    const startRect: OverlayRect = {
      top: cardRect.top - containerRect.top,
      left: cardRect.left - containerRect.left,
      width: cardRect.width,
      height: cardRect.height,
    };
    
    const cardRadius = parseFloat(window.getComputedStyle(card).borderRadius) || CONTAINER_RADIUS;

    // Cache the card position for smooth closing
    setCachedCardRect(startRect);

    // Set initial state - overlay starts at card size with no content
    setIsClosing(false);
    setShowContent(false);
    setOverlayStyle(startRect);
    setOverlayRadius(cardRadius);
    setVisibleSection(section);

    // Animate to full container size
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      // Animate to cover entire container
      setOverlayStyle({
        top: 0,
        left: 0,
        width: containerRect.width,
        height: containerRect.height,
      });
      setOverlayRadius(CONTAINER_RADIUS);
    });

    // Show content after expansion animation completes
    window.setTimeout(() => {
      setShowContent(true);
    }, ANIMATION_DURATION_MS + 50);
  };

  const closeSection = (section: ConcreteSection, onClosed?: () => void) => {
    const container = gridRef.current;
    
    if (!container || !cachedCardRect) {
      setVisibleSection(null);
      setOverlayStyle(null);
      setOverlayRadius(CONTAINER_RADIUS);
      setIsClosing(false);
      setShowContent(false);
      setCachedCardRect(null);
      onClosed?.();
      return;
    }

    const card = cardRefs.current[section];
    const cardRadius = card ? parseFloat(window.getComputedStyle(card).borderRadius) || CONTAINER_RADIUS : CONTAINER_RADIUS;

    // Hide content first
    setShowContent(false);
    setIsClosing(true);

    // Wait briefly for content to fade, then animate back to card position
    // The grid transition is happening at the same time
    window.setTimeout(() => {
      setOverlayStyle(cachedCardRect);
      setOverlayRadius(cardRadius);
    }, 100);

    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    // Clean up after animation completes
    closeTimeoutRef.current = window.setTimeout(() => {
      setVisibleSection(null);
      setOverlayStyle(null);
      setOverlayRadius(CONTAINER_RADIUS);
      setIsClosing(false);
      setShowContent(false);
      setCachedCardRect(null);
      onClosed?.();
    }, ANIMATION_DURATION_MS + 100);
  };

  const handleCardClick = (section: Section) => {
    if (!section || isClosing) return;

    if (visibleSection === section) {
      closeSection(section);
      return;
    }

    if (visibleSection && visibleSection !== section) {
      closeSection(visibleSection as ConcreteSection, () => openSection(section as ConcreteSection));
      return;
    }

    openSection(section as ConcreteSection);
  };

  const handleClose = () => {
    if (!visibleSection || isClosing) return;
    closeSection(visibleSection as ConcreteSection);
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-y-auto bg-transparent md:h-dvh md:overflow-hidden">
      <header className="relative z-30 flex-shrink-0 border-b border-border/70 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-4 lg:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-card shadow-[0_12px_30px_-14px_hsl(var(--foreground)/0.45)]">
                <img
                  src="/Headshot.png"
                  alt="Youseph Enouri headshot"
                  className="h-full w-full object-cover object-top transition-all duration-700 ease-out scale-100 hover:scale-125"
                  sizes="64px"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Portfolio</p>
                <h1 className="text-xl font-serif font-bold tracking-[-0.025em] text-foreground md:text-2xl">
                  Youseph Enouri
                </h1>
                <p className="max-w-xl text-[11px] leading-relaxed text-muted-foreground sm:text-sm">
                  Mechanical Designer Intern @ Motioneering <br />
                  Mechanical Engineering Student @ University of Guelph
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground sm:text-sm">
              <a
                href="mailto:enouriyouseph1193@gmail.com"
                className="break-all rounded-full border border-border/80 bg-card/70 px-4 py-2 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card hover:text-foreground hover:shadow-md"
              >
                enouriyouseph1193@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/youseph-enouri"
                target="_blank"
                rel="noreferrer"
                className="break-all rounded-full border border-border/80 bg-card/70 px-4 py-2 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card hover:text-foreground hover:shadow-md"
              >
                linkedin.com/in/youseph-enouri
              </a>
              <a
                //href="https://github.com/youseph-enouri"
                //target="_blank"
                //rel="noreferrer"
                //className="break-all rounded-full border border-border px-4 py-2 transition-all duration-300 ease-out hover:border-accent hover:text-foreground"
              >
                
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 md:h-full md:px-6 md:py-5 lg:px-8 lg:py-6">
          <div
            ref={gridRef}
            className="relative overflow-hidden rounded-[32px] border border-white/75 bg-white/35 p-3 shadow-[0_28px_80px_-48px_hsl(var(--foreground)/0.45)] backdrop-blur-sm md:h-full md:p-4 lg:p-5"
          >
            <div
              className={`grid gap-3 sm:grid-cols-2 sm:gap-4 md:h-full md:grid-cols-3 md:auto-rows-fr transition-all duration-500 ease-out ${
                visibleSection && !isClosing
                  ? "pointer-events-none scale-95 opacity-0"
                  : "pointer-events-auto scale-100 opacity-100"
              }`}
            >
              {sections.map((section) => {
                // Extract images from sectionData based on section type
                const getImages = () => {
                  switch(section.id) {
                    case 'experience':
                      return sectionData.experience.map(item => item.image);
                    case 'projects':
                      return sectionData.projects.map(item => item.image);
                    case 'hobbies':
                      return sectionData.hobbies.map(item => item.image);
                    case 'extracurriculars':
                      return sectionData.extracurriculars.map(item => item.image);
                    case 'current':
                      return []; // No image cascade for current section
                    default:
                      return [];
                  }
                };

                return (
                  <div
                    key={section.id}
                    ref={(node) => {
                      cardRefs.current[section.id] = node;
                    }}
                    className={`transition-all duration-500 ease-out rounded-[24px] ${
                      section.id === "experience" || section.id === "extracurriculars" ? "sm:col-span-2" : ""
                    }`}
                  >
                    <SectionCard
                      title={section.title}
                      metric={section.metric}
                      metricLabel={section.metricLabel}
                      icon={section.icon}
                      itemCount={section.itemCount}
                      images={getImages()}
                      onClick={() => handleCardClick(section.id)}
                    />
                  </div>
                );
              })}
            </div>

            {visibleSection && overlayStyle && (
              <div
                className={`absolute z-20 flex min-h-0 flex-col ${
                  showContent ? 'bg-card/95 backdrop-blur-xl shadow-[0_30px_90px_-35px_hsl(var(--foreground)/0.38)]' : ''
                } ${isClosing ? "pointer-events-none" : "pointer-events-auto"}`}
                style={{
                  top: overlayStyle.top,
                  left: overlayStyle.left,
                  width: overlayStyle.width,
                  height: overlayStyle.height,
                  borderRadius: overlayRadius,
                  backgroundColor: showContent ? 'hsl(var(--card))' : 'transparent',
                  border: showContent ? '1px solid hsl(var(--border))' : 'none',
                  padding: showContent ? "clamp(0.875rem, 2vw, 2rem)" : "0",
                  transition: `top ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), left ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), width ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), height ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), border-radius ${ANIMATION_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms, border 200ms, padding 200ms`,
                }}
              >
                {/* Only show content when expanded (not at card size) */}
                {showContent && (
                  <>
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 md:gap-6">
                      <div className="flex min-w-0 items-start gap-4">
                        {SectionIcon && (
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/10 bg-accent/[0.07] text-accent shadow-sm">
                            <SectionIcon className="h-7 w-7 md:h-8 md:w-8" />
                          </div>
                        )}
                        <div className="min-w-0 space-y-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {currentSection?.metricLabel}
                          </p>
                          <h2 className="text-xl font-serif font-semibold tracking-[-0.025em] text-foreground sm:text-2xl md:text-3xl">
                            {currentSection?.title}
                          </h2>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full border border-border bg-background/70 p-2 text-muted-foreground shadow-sm transition-all duration-300 ease-out hover:rotate-6 hover:border-accent/40 hover:bg-accent hover:text-accent-foreground"
                        aria-label="Close section"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="subtle-scrollbar min-h-0 flex-1 overflow-y-auto pr-1 text-foreground sm:pr-2">
                      {renderSectionContent(visibleSection)}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {showVitalScanVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="VitalScan assembly video"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowVitalScanVideo(false);
            }
          }}
        >
          <div className="relative flex max-h-[90dvh] w-full max-w-5xl items-center justify-center rounded-3xl border border-white/20 bg-black p-3 shadow-2xl sm:p-5">
            <button
              type="button"
              onClick={() => setShowVitalScanVideo(false)}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/70 p-2 text-white shadow-lg transition-colors hover:bg-white hover:text-black"
              aria-label="Close assembly video"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              className="max-h-[82dvh] max-w-full rounded-2xl bg-black object-contain"
              controls
              autoPlay
              preload="metadata"
            >
              <source src="/VitalScan_Assembly.mp4" type="video/mp4" />
              Your browser does not support embedded videos.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
