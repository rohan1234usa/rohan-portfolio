"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, ComponentType } from "react";
import {
    SiPython,
    SiFastapi,
    SiDocker,
    SiNextdotjs,
    SiFirebase,
    SiTailwindcss,
    SiPytorch,
    SiOpencv,
    SiTensorflow,
    SiGooglecloud,
    SiGooglegemini,
    SiKotlin,
    SiOpenjdk,
    SiTypescript,
    SiJavascript,
    SiCplusplus,
    SiSharp,
    SiMysql,
    SiAndroid,
    SiUnrealengine,
    SiPhilipshue,
} from "react-icons/si";
import {
    ScanEye,
    Database,
    Sparkles,
    Crosshair,
    Layers,
    Search,
    Move3d,
    Cpu,
    Cloud,
    HardDrive,
} from "lucide-react";

type IconComp = ComponentType<{ size?: number; className?: string; color?: string }>;

interface Entry {
    Icon: IconComp;
    color: string;
    darkColor?: string;
}

const TECH: Record<string, Entry> = {
    "Python": { Icon: SiPython, color: "#3776AB", darkColor: "#FFD43B" },
    "FastAPI": { Icon: SiFastapi, color: "#009688" },
    "Docker": { Icon: SiDocker, color: "#2496ED" },
    "Next.js": { Icon: SiNextdotjs, color: "#0C2340", darkColor: "#FDF8F0" },
    "Firebase": { Icon: SiFirebase, color: "#FFA000" },
    "Tailwind": { Icon: SiTailwindcss, color: "#06B6D4" },
    "PyTorch": { Icon: SiPytorch, color: "#EE4C2C" },
    "OpenCV": { Icon: SiOpencv, color: "#5C3EE8", darkColor: "#A78BFA" },
    "TensorFlow": { Icon: SiTensorflow, color: "#FF6F00" },
    "AWS": { Icon: Cloud, color: "#FF9900" },
    "AWS S3": { Icon: HardDrive, color: "#E25444", darkColor: "#FCA5A5" },
    "GCP": { Icon: SiGooglecloud, color: "#4285F4" },
    "Gemini Pro": { Icon: SiGooglegemini, color: "#8E75B2" },
    "Kotlin": { Icon: SiKotlin, color: "#7F52FF", darkColor: "#A78BFA" },
    "Java": { Icon: SiOpenjdk, color: "#0C2340", darkColor: "#FDF8F0" },
    "TypeScript": { Icon: SiTypescript, color: "#3178C6" },
    "JavaScript": { Icon: SiJavascript, color: "#F7DF1E", darkColor: "#FACC15" },
    "C++": { Icon: SiCplusplus, color: "#00599C", darkColor: "#60A5FA" },
    "C#": { Icon: SiSharp, color: "#239120" },
    "SQL": { Icon: SiMysql, color: "#4479A1", darkColor: "#7DD3FC" },
    "Android SDK": { Icon: SiAndroid, color: "#3DDC84" },
    "Unreal Engine": { Icon: SiUnrealengine, color: "#0C2340", darkColor: "#FDF8F0" },
    "Philips Hue API": { Icon: SiPhilipshue, color: "#0067B2", darkColor: "#7DD3FC" },

    "Computer Vision": { Icon: ScanEye, color: "#6B2C91", darkColor: "#F4B942" },
    "RAG": { Icon: Database, color: "#6B2C91", darkColor: "#F4B942" },
    "Vertex AI": { Icon: Sparkles, color: "#4285F4", darkColor: "#7DD3FC" },
    "YOLOv8": { Icon: Crosshair, color: "#6B2C91", darkColor: "#F4B942" },
    "DINOv2": { Icon: Layers, color: "#6B2C91", darkColor: "#F4B942" },
    "Faiss": { Icon: Search, color: "#6B2C91", darkColor: "#F4B942" },
    "ByteTrack": { Icon: Move3d, color: "#6B2C91", darkColor: "#F4B942" },
};

const FALLBACK: Entry = { Icon: Cpu, color: "#6B2C91", darkColor: "#F4B942" };

export const TechIcon = ({ name, size = 14 }: { name: string; size?: number }) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const entry = TECH[name] ?? FALLBACK;
    const isDark = mounted && resolvedTheme === "dark";
    const color = isDark && entry.darkColor ? entry.darkColor : entry.color;

    return <entry.Icon size={size} color={color} className="flex-shrink-0" />;
};
