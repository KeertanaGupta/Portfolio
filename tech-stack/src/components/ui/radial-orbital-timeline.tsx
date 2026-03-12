"use client";
import { useState, useEffect, useRef } from "react";

interface Technology {
  name: string;
  icon: string;
}

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  technologies?: Technology[];
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const scrollSpeedRef = useRef<number>(1);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Scroll speed modulation
  useEffect(() => {
    let lastScrollY = window.parent.scrollY || 0;
    let lastTime = Date.now();
    let decay: number;

    const onScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);
      const dy = Math.abs((window.parent.scrollY || 0) - lastScrollY);
      const velocity = dy / dt;
      scrollSpeedRef.current = 1 + Math.min(velocity * 8, 6);
      lastScrollY = window.parent.scrollY || 0;
      lastTime = now;
    };

    decay = window.setInterval(() => {
      scrollSpeedRef.current = Math.max(1, scrollSpeedRef.current * 0.92);
    }, 60);

    try {
      window.parent.addEventListener("scroll", onScroll, { passive: true });
    } catch {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      clearInterval(decay);
      try {
        window.parent.removeEventListener("scroll", onScroll);
      } catch {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const speed = 0.3 * scrollSpeedRef.current;
          const newAngle = (prev + speed) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-50 pointer-events-none">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-white/15 uppercase mb-2">
          03
        </p>
        <h2 className="text-[11px] font-semibold tracking-[0.25em] text-white/30 uppercase border-b border-white/6 pb-3 inline-block">
          Keertana's Tech Universe
        </h2>
      </div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center core — purple/blue/teal gradient */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          {/* Orbit ring */}
          <div className="absolute w-96 h-96 rounded-full border border-white/10"></div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy glow */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Node circle */}
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white/50 text-black"
                      : "bg-black text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-white animate-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div
                  className={`
                  absolute top-12 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                  {item.title}
                </div>

                {/* ─── EXPANDED TECH CARD ─── */}
                {isExpanded && item.technologies && (
                  <div
                    className="absolute top-20 left-1/2 overflow-visible"
                    style={{
                      transform: "translateX(-50%)",
                      animation: "cardFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards",
                    }}
                  >
                    {/* Connector line */}
                    <div
                      className="absolute -top-3 left-1/2 w-px h-3"
                      style={{
                        transform: "translateX(-50%)",
                        background: "rgba(255,255,255,0.2)",
                      }}
                    ></div>

                    {/* Glassmorphism card */}
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "18px",
                        padding: "24px",
                        minWidth: "220px",
                        boxShadow:
                          "0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.03)",
                      }}
                    >
                      {/* Category title */}
                      <h3
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          marginBottom: "18px",
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Tech grid */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "14px",
                        }}
                      >
                        {item.technologies.map((tech) => (
                          <div
                            key={tech.name}
                            className="tech-grid-item"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "6px",
                              cursor: "default",
                              transition: "transform 0.2s ease, opacity 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            }}
                          >
                            {tech.icon ? (
                              <img
                                src={tech.icon}
                                alt={tech.name}
                                style={{
                                  width: "26px",
                                  height: "26px",
                                  objectFit: "contain",
                                  filter: "brightness(0.9)",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "26px",
                                  height: "26px",
                                  borderRadius: "6px",
                                  background: "rgba(255,255,255,0.08)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "11px",
                                  color: "rgba(255,255,255,0.5)",
                                  fontWeight: 600,
                                }}
                              >
                                {tech.name.slice(0, 2)}
                              </div>
                            )}
                            <span
                              style={{
                                fontSize: "9px",
                                color: "rgba(255,255,255,0.5)",
                                fontWeight: 500,
                                letterSpacing: "0.03em",
                                textAlign: "center",
                                lineHeight: 1.2,
                              }}
                            >
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
