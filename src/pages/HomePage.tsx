import { motion } from "framer-motion";
import { QrCode, Cloud, Users, Heart, ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-dog.jpg";
import featureCat from "@/assets/feature-cat.jpg";
import featureDog from "@/assets/feature-dog.jpg";
import { Link } from "react-router-dom";

const features = [
  {
    icon: QrCode,
    title: "Pet Identity",
    description: "We provide a non-invasive, radiation-free unique identity for your beloved pet, allowing the world to interact with them in exciting new ways.",
    color: "bg-coral",
    image: featureCat,
  },
  {
    icon: Users,
    title: "Pet Social",
    description: "We made it easy for all your pet's friends and caregivers to interact with you and your pet in their own digital space. Strengthen the bond through shared feeds, messages, photos, and more.",
    color: "bg-teal",
    image: featureDog,
  },
  {
    icon: Cloud,
    title: "Pet Cloud",
    description: "Pet Cloud (beta) allows you to easily track and store all your pet's important documents, such as certifications, prescriptions, and reports, in one secure location.",
    color: "bg-sunshine",
    badge: "Beta",
  },
  {
    icon: Heart,
    title: "Pet Managers",
    description: "Coordinate with family members, friends, pet sitters, and veterinarians. Everyone who cares for your pet can stay connected and informed.",
    color: "bg-lavender",
  },
];

const stats = [
  { value: "50K+", label: "Happy Pets" },
  { value: "100K+", label: "Pet Parents" },
  { value: "25+", label: "Countries" },
  { value: "4.9", label: "App Rating" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-peach via-background to-mint/30 dark:from-background dark:via-background dark:to-teal/10" />

        {/* Decorative paw prints */}
        <div className="absolute top-20 left-10 opacity-10 dark:opacity-5">
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-primary text-8xl"
          >
            🐾
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 dark:opacity-5">
          <motion.div
            animate={{ rotate: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="text-secondary text-6xl"
          >
            🐾
          </motion.div>
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                The Future of Pet Care is Here
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Bringing Your{" "}
                <span className="text-gradient">Pets Closer!</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Petroll, the all new way to identify, track and manage your pet across family, friends, pet-care givers and more!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/login">
                  <Button variant="hero" size="xl">
                    Join Us Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-coral via-sunshine to-teal rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <img
                  src={heroImage}
                  alt="Happy golden retriever dog"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -left-4 bg-card shadow-lg rounded-2xl p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Secure & Safe</div>
                    <div className="text-xs text-muted-foreground">Your pet data protected</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything Your Pet Needs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Welcome to Petroll.co! Experience the ultimate in pet management with our comprehensive suite of features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card rounded-3xl p-6 md:p-8 shadow-card hover:shadow-lg transition-all duration-300 border border-border overflow-hidden"
              >
                {feature.image && (
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-50 group-hover:opacity-70 transition-opacity">
                    <img
                      src={feature.image}
                      alt=""
                      className="w-full h-full object-cover rounded-bl-3xl"
                    />
                  </div>
                )}


                <div className="relative">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-display font-bold">{feature.title}</h3>
                    {feature.badge && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground">{feature.description}</p>

                  <Button variant="link" className="mt-4 p-0">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coral/10 via-teal/10 to-sunshine/10" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-lg border border-border"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Join Our Community Now!
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Avail best of the benefits with joining bonus! Connect with thousands of pet parents and give your furry friend the digital life they deserve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Join Us Now!
                  <ArrowRight className="w-5 h-5" />
                </Button></Link>
              <Button variant="teal" size="xl">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
