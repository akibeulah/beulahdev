"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "../../lib/utils";

export const InteractiveCard = ({
                                    children,
                                    className,
                                    InteractiveColor = "#64FFDA",
                                    borderRadius = "12px", // Match glass-card border-radius
                                    rotationFactor = 0.3, // Reduced for subtler effect
                                    transitionDuration = 0.3,
                                    transitionEasing = "easeInOut",
                                    tailwindBgClass = "bg-transparent",
                                    as = "div",
                                    ...props
                                }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateXTrans = useTransform(
        y,
        [0, 1],
        [rotationFactor * 15, -rotationFactor * 15]
    );
    const rotateYTrans = useTransform(
        x,
        [0, 1],
        [-rotationFactor * 15, rotationFactor * 15]
    );

    const handlePointerMove = (e) => {
        const bounds = cardRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const px = (e.clientX - bounds.left) / bounds.width;
        const py = (e.clientY - bounds.top) / bounds.height;

        x.set(px);
        y.set(py);
    };

    const xPercentage = useTransform(x, (val) => `${val * 100}%`);
    const yPercentage = useTransform(y, (val) => `${val * 100}%`);

    const interactiveBackground = useMotionTemplate`
        radial-gradient(
            circle at ${xPercentage} ${yPercentage},
            ${InteractiveColor} 0%,
            transparent 80%
        )
    `;

    const Component = as;

    return (
        <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            style={{
                perspective: 1000,
                borderRadius,
            }}
            className="relative isolate"
        >
            <motion.div
                style={{
                    rotateX: rotateXTrans,
                    rotateY: rotateYTrans,
                    transformStyle: "preserve-3d",
                    transition: `transform ${transitionDuration}s ${transitionEasing}`,
                }}
                className="w-full h-full rounded-xl overflow-hidden" // Removed shadow-lg
            >
                {/* Interactive background - more subtle */}
                <motion.div
                    className="absolute inset-0 rounded-xl z-0"
                    style={{
                        background: interactiveBackground,
                        transition: `opacity ${transitionDuration}s ${transitionEasing}`,
                        opacity: isHovered ? 0.15 : 0, // Reduced from 0.6 to 0.15
                        pointerEvents: "none",
                        border: "2px solid",
                    }}
                />

                {/* Content */}
                <Component
                    className={cn(
                        "relative z-10 w-full h-full text-foreground",
                        tailwindBgClass,
                        className
                    )}
                    style={{ borderRadius }}
                    {...props}
                >
                    {children}
                </Component>
            </motion.div>
        </motion.div>
    );
};

export default InteractiveCard;