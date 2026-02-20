import { motion } from "framer-motion";
import { Heart, Target, Users, Award, Globe, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import aboutFamily from "@/assets/about-family.jpg";

const values = [
  {
    icon: Heart,
    title: "Pet-First Approach",
    description: "Every feature we build starts with one question: How does this make life better for pets?",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We leverage cutting-edge technology to create non-invasive, safe solutions for pet identification.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a global network of pet lovers, caregivers, and professionals working together.",
  },
  {
    icon: Award,
    title: "Trust & Safety",
    description: "Your pet's data is sacred. We maintain the highest security standards to protect it.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO & Founder", emoji: "👩‍💼" },
  { name: "Mike Rodriguez", role: "CTO", emoji: "👨‍💻" },
  { name: "Emma Wilson", role: "Head of Product", emoji: "👩‍🎨" },
  { name: "David Kim", role: "Lead Engineer", emoji: "👨‍🔬" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-peach/50 via-background to-mint/30 dark:from-background dark:to-teal/10" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                About <span className="text-gradient">Petroll</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                We are thrilled to introduce the all-new way to identify, track, and manage your pet's life. Whether you're coordinating with family members, friends, or pet-care givers, Petroll.co makes it effortless to ensure your furry friend's needs are always met.
              </p>
              <p className="text-muted-foreground">
                Founded in 2024, Petroll.co was born from a simple idea: pets deserve the same digital convenience that humans enjoy. Our team of pet lovers and technologists came together to create a platform that bridges the gap between pet owners and everyone who cares for their beloved companions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-coral to-teal rounded-3xl blur-2xl opacity-20" />
              <img
                src={aboutFamily}
                alt="Happy family with their pets"
                className="relative rounded-3xl shadow-xl w-full object-cover aspect-video"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Bringing Pets Closer to the World
            </h2>
            <p className="text-lg text-muted-foreground">
              We believe every pet deserves to be known, loved, and cared for by a community. Our mission is to create a world where pet ownership is seamless, connected, and joyful through innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Petroll
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              Passionate pet lovers building the future of pet care
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mx-auto mb-3 text-4xl shadow-md border border-border">
                  {member.emoji}
                </div>
                <h4 className="font-display font-bold">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Zap, value: "2024", label: "Founded" },
                { icon: Users, value: "100K+", label: "Users" },
                { icon: Globe, value: "25+", label: "Countries" },
                { icon: Heart, value: "50K+", label: "Pets Registered" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
