import { Activity, Brain, List, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: List,
    title: "Priority List",
    description: "Organize tasks effectively with smart priority management",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Focus on maintaining mental health while achieving goals",
  },
  {
    icon: Target,
    title: "Personalized Motivation",
    description: "Get tailored motivation based on your personal goals",
  },
  {
    icon: Activity,
    title: "Data Driven Strategies",
    description: "Make informed decisions with data-backed insights",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-feature-bg flex flex-col">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 flex-grow">  {/* Reduced pt-32 to pt-24 */}
        {/* Welcome Hero Section */}
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center mb-20 animate-fade-up">  {/* Reduced min-h-[80vh] to min-h-[70vh] */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            Achieve More, <br /> Feel Better
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your journey to success shouldn't come at the cost of your well-being. 
            Let's make progress together, one mindful step at a time.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Original GoAhead Section */}
        <div className="text-center mb-20 animate-fade-up">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-8">
            GoAhead
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empower your journey with smart tools for better productivity and mental wellness
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-feature-bg p-3 rounded-lg w-fit mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;