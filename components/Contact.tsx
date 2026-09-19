"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { ContactChannels } from "./ContactChannels";
import { AvailabilityBadge } from "./Availability";
import { Reveal } from "./motion/Reveal";
import { EASE_OUT_QUAD, VIEWPORT } from "./motion/tokens";

export const Contact = () => (
    <section id="contact" className="py-24 bg-bg-subtle">
        <div className="container mx-auto px-6 max-w-5xl">
            <Reveal className="mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4 font-display flex items-center gap-3">
                    <Mail className="text-accent" size={32} />
                    Contact
                </h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT_QUAD }}
                    style={{ transformOrigin: "0% 50%" }}
                    className="w-full h-px bg-line"
                />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
                <Reveal className="lg:col-span-5">
                    <p className="text-lg text-fg-soft font-light mb-6">
                        Open to internships, collaborations, or just trading notes on CV pipelines and RAG systems.
                    </p>
                    <AvailabilityBadge className="mb-10" />
                    <ContactChannels />
                </Reveal>

                <Reveal className="lg:col-span-7" delay={0.1}>
                    <ContactForm />
                </Reveal>
            </div>
        </div>
    </section>
);
